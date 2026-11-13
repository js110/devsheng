import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogHeader from '@/components/BlogHeader'
import { cleanHtml, readPosts } from '@/lib/blog'
export const dynamic = 'force-dynamic'
export default async function BlogPostPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params; let posts
  try { posts=await readPosts() } catch { return <><BlogHeader/><main className="blog-article"><p>暂时无法加载文章，请稍后刷新。</p></main></> }
  const post=posts.find(p=>p.id===id); if (!post) notFound()
  return <><BlogHeader/><main className="blog-article"><Link className="back-link" href="/blog">← 所有文章</Link><header className="article-header"><div className="blog-eyebrow">笔记 / NOTE</div><h1>{post.title}</h1><div className="article-meta"><span>蒋月生</span><span>·</span><time dateTime={post.publishedAt.replace(' ','T')}>{post.publishedAt}</time></div></header><article className="article-body" dangerouslySetInnerHTML={{__html:cleanHtml(post.html)}}/><div className="article-end"><span>— 完 —</span>{post.sourceUrl && <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">查看博客园原文 ↗</a>}</div><Link className="back-link" href="/blog">← 返回文章归档</Link></main><footer className="blog-footer">© 蒋月生 · <Link href="/">返回主页</Link></footer></>
}
