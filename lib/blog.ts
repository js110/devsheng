import 'server-only'
import { list, put } from '@vercel/blob'
import sanitizeHtml from 'sanitize-html'
import imported from '@/content/blog-import.json'

export type BlogPost = { id: string; title: string; publishedAt: string; html: string; sourceUrl?: string }
const blobPath = process.env.BLOG_BLOB_PATH || 'blog/posts-v1.json'
const initialPosts = imported as BlogPost[]

export function cleanHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ['p','br','strong','b','em','i','u','s','h1','h2','h3','h4','blockquote','ul','ol','li','pre','code','a','img','hr','span'],
    allowedAttributes: { a: ['href','title'], img: ['src','alt','title','width','height','loading'], code: ['class'], span: ['class'] },
    allowedSchemes: ['http','https','mailto'],
    allowedSchemesByTag: { img: ['http','https'] },
    allowProtocolRelative: false,
    transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) },
  })
}

export function summary(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, ' ').trim().slice(0, 140)
}

export async function readPosts(): Promise<BlogPost[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return initialPosts
  let cursor: string | undefined
  let latest: { pathname: string; url: string } | undefined
  do {
    const page = await list({ prefix: `${blobPath}/revisions/`, limit: 1000, ...(cursor ? { cursor } : {}) })
    for (const blob of page.blobs) if (!latest || blob.pathname > latest.pathname) latest = blob
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  if (!latest) {
    const { blobs } = await list({ prefix: blobPath, limit: 1 })
    latest = blobs.find(blob => blob.pathname === blobPath)
  }
  if (!latest) return initialPosts
  const response = await fetch(latest.url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Unable to read blog data')
  const data: unknown = await response.json()
  if (!Array.isArray(data)) throw new Error('Invalid blog data')
  return data as BlogPost[]
}
export async function savePosts(posts: BlogPost[]) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Blog storage is not configured')
  const revision = `${String(Date.now()).padStart(13, '0')}-${crypto.randomUUID()}`
  await put(`${blobPath}/revisions/${revision}.json`, JSON.stringify(posts), { access:'public', addRandomSuffix:false, contentType:'application/json', cacheControlMaxAge:60 })
}
export function sortPosts(posts: BlogPost[]) { return [...posts].sort((a,b) => b.publishedAt.localeCompare(a.publishedAt)) }
