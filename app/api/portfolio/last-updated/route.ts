export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { list } from '@vercel/blob'

const DATA_FILE_PATH = process.env.PORTFOLIO_DATA_PATH || path.join(process.cwd(), 'data', 'portfolio.json')

// GET - 获取最后更新时间
export async function GET() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: 'portfolio/data.json', limit: 1 })
      return NextResponse.json({ lastUpdated: blobs[0]?.uploadedAt ?? null })
    }
    const stats = await fs.stat(DATA_FILE_PATH)
    return NextResponse.json({ 
      lastUpdated: stats.mtime.toISOString() 
    })
  } catch (error) {
    // 如果文件不存在，返回null
    return NextResponse.json({ lastUpdated: null })
  }
} 
