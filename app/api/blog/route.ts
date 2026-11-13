import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { cleanHtml, readPosts, savePosts, sortPosts, type BlogPost } from '@/lib/blog'

export const dynamic = 'force-dynamic'
export async function GET() {
  try { return NextResponse.json(sortPosts(await readPosts()).map(post => ({...post, html: cleanHtml(post.html)})), { headers: { 'Cache-Control':'no-store' } }) }
  catch { return NextResponse.json({error:'文章读取失败，请稍后重试'}, {status:503}) }
}
export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return NextResponse.json({error:'请先登录'}, {status:401})
  try {
    const input = await request.json()
    if (typeof input.title !== 'string' || !input.title.trim() || input.title.length > 160 || typeof input.html !== 'string' || input.html.length > 500000 || typeof input.publishedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?$/.test(input.publishedAt)) return NextResponse.json({error:'请检查标题、正文和发布时间'}, {status:400})
    const posts = await readPosts()
    const id = typeof input.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(input.id) ? input.id : crypto.randomUUID()
    const old = posts.find(p => p.id === id)
    const post: BlogPost = {id, title: input.title.trim(), publishedAt: input.publishedAt, html: cleanHtml(input.html), ...(old?.sourceUrl ? {sourceUrl:old.sourceUrl} : {})}
    if (!sanitizeText(post.html)) return NextResponse.json({error:'正文不能为空'}, {status:400})
    await savePosts([post, ...posts.filter(p => p.id !== id)])
    return NextResponse.json({ok:true, id})
  } catch (error) { console.error('Blog save failed',error); return NextResponse.json({error:'保存失败，请稍后重试'}, {status:500}) }
}
function sanitizeText(s:string) { return s.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim() || (/<img\b/i.test(s) ? 'image' : '') }
export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return NextResponse.json({error:'请先登录'}, {status:401})
  try {
    const id = new URL(request.url).searchParams.get('id')
    if (!id || !/^[a-zA-Z0-9-]{1,80}$/.test(id)) return NextResponse.json({error:'文章不存在'}, {status:400})
    const posts = await readPosts(); if (!posts.some(p=>p.id===id)) return NextResponse.json({error:'文章不存在'}, {status:404})
    await savePosts(posts.filter(p=>p.id!==id)); return NextResponse.json({ok:true})
  } catch { return NextResponse.json({error:'删除失败，请稍后重试'}, {status:500}) }
}
