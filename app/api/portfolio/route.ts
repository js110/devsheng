import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { list, put } from '@vercel/blob'
import { PortfolioData, defaultPortfolioData } from '@/types/portfolio'
import { isAdminAuthenticated } from '@/lib/auth'

const DATA_FILE_PATH = process.env.PORTFOLIO_DATA_PATH || path.join(process.cwd(), 'data', 'portfolio.json')

async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readDataFile(): Promise<PortfolioData> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: 'portfolio/data.json', limit: 1 })
      if (blobs[0]?.pathname === 'portfolio/data.json') {
        const response = await fetch(`${blobs[0].url}?v=${blobs[0].uploadedAt.getTime()}`, { cache: 'no-store' })
        if (!response.ok) throw new Error('Blob read failed')
        return await response.json()
      }
    }
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return defaultPortfolioData
  }
}

async function writeDataFile(data: PortfolioData): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put('portfolio/data.json', JSON.stringify(data), { access: 'public', allowOverwrite: true, addRandomSuffix: false, contentType: 'application/json', cacheControlMaxAge: 60 })
    return
  }
  await ensureDataDirectory()
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

function unauthorized() {
  return NextResponse.json({ success: false, error: '未授权' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fields = searchParams
      .get('fields')
      ?.split(',')
      .map((f) => f.trim())
      .filter(Boolean)

    const rawProjectLimit = searchParams.get('projectLimit')
    const parsedLimit = rawProjectLimit ? Number.parseInt(rawProjectLimit, 10) : NaN
    const projectLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : null

    const data = await readDataFile()
    let result: Record<string, unknown> = {}

    if (fields && fields.length > 0) {
      for (const field of fields) {
        if (field === 'projects' && projectLimit) {
          result.projects = data.projects.slice(0, projectLimit)
        } else {
          result[field] = data[field as keyof PortfolioData]
        }
      }
    } else {
      result = { ...data }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json(defaultPortfolioData)
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorized()

  try {
    const data: PortfolioData = await request.json()
    await writeDataFile(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('保存数据失败:', error)
    return NextResponse.json({ success: false, error: '保存失败' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorized()

  try {
    await writeDataFile(defaultPortfolioData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('清除数据失败:', error)
    return NextResponse.json({ success: false, error: '清除失败' }, { status: 500 })
  }
}

