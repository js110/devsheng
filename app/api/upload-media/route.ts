import { NextRequest, NextResponse } from 'next/server'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { basename, join, resolve } from 'path'
import { isAdminAuthenticated } from '@/lib/auth'
import { put, del } from '@vercel/blob'

const MAX_FILE_SIZE = 4 * 1024 * 1024 // 20MB
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'])

function unauthorized() {
  return NextResponse.json({ success: false, error: '未授权' }, { status: 401 })
}

function sanitizeProjectId(projectId: string): string | null {
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(projectId)) return null
  return projectId
}

function extensionFromMime(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/gif':
      return 'gif'
    case 'image/webp':
      return 'webp'
    default:
      return 'bin'
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorized()

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const rawProjectId = formData.get('projectId') as string | null

    if (!file) {
      return NextResponse.json({ error: '没有找到文件' }, { status: 400 })
    }

    if (!rawProjectId) {
      return NextResponse.json({ error: '项目 ID 是必需的' }, { status: 400 })
    }

    const projectId = sanitizeProjectId(rawProjectId)
    if (!projectId) {
      return NextResponse.json({ error: '非法的项目 ID' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `文件大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)}MB` }, { status: 400 })
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json({ error: '只允许上传图片文件' }, { status: 400 })
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const id = `${Date.now()}-${crypto.randomUUID()}`
      const blob = await put(`uploads/${projectId}/${id}.${extensionFromMime(file.type)}`, file, { access: 'public', contentType: file.type })
      return NextResponse.json({ success: true, file: { id, type: 'image', url: blob.url, filename: basename(file.name), size: file.size, createdAt: new Date().toISOString(), order: 0 } })
    }
    const uploadDir = join(process.cwd(), 'public', 'uploads', projectId)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const timestamp = Date.now()
    const randomId = Math.random().toString(36).slice(2, 10)
    const fileExtension = extensionFromMime(file.type)
    const fileName = `${timestamp}-${randomId}.${fileExtension}`
    const filePath = join(uploadDir, fileName)

    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    const fileUrl = `/uploads/${projectId}/${fileName}`

    return NextResponse.json({
      success: true,
      file: {
        id: `${timestamp}-${randomId}`,
        type: 'image',
        url: fileUrl,
        filename: basename(file.name),
        size: file.size,
        createdAt: new Date().toISOString(),
        order: 0,
      },
    })
  } catch (error) {
    console.error('文件上传失败:', error)
    return NextResponse.json({ error: '文件上传失败' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorized()

  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')

    if (!filePath) {
      return NextResponse.json({ error: '文件路径是必需的' }, { status: 400 })
    }

    if (process.env.BLOB_READ_WRITE_TOKEN && filePath.startsWith('https://')) {
      const parsed = new URL(filePath)
      const storeId = process.env.BLOB_READ_WRITE_TOKEN.split('_')[3]?.toLowerCase()
      if (!storeId || parsed.hostname.toLowerCase() !== `${storeId}.public.blob.vercel-storage.com` || !parsed.pathname.startsWith('/uploads/')) {
        return NextResponse.json({ error: '无效的文件路径' }, { status: 400 })
      }
      await del(filePath)
      return NextResponse.json({ success: true })
    }
    if (process.env.BLOB_READ_WRITE_TOKEN && filePath.startsWith('/uploads/')) return NextResponse.json({ success: true })
    const normalizedPath = filePath.replace(/\\/g, '/')
    if (normalizedPath.includes('..') || !normalizedPath.startsWith('/uploads/')) {
      return NextResponse.json({ error: '无效的文件路径' }, { status: 400 })
    }

    const uploadsRoot = resolve(process.cwd(), 'public', 'uploads')
    const fullPath = resolve(process.cwd(), 'public', `.${normalizedPath}`)

    if (!fullPath.startsWith(uploadsRoot)) {
      return NextResponse.json({ error: '无效的文件路径' }, { status: 400 })
    }

    await unlink(fullPath)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('文件删除失败:', error)
    return NextResponse.json({ error: '文件删除失败' }, { status: 500 })
  }
}

