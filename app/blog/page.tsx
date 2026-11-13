import Link from 'next/link'
import BlogHeader from '@/components/BlogHeader'
import { readPosts, sortPosts, summary } from '@/lib/blog'
export const dynamic = 'force-dynamic'
export default async function BlogPage() {
  let posts; try { posts = sortPosts(await readPosts()) } catch { posts = null }
  return <><BlogHeader/><main className="blog-wrap"><div className="blog-topline">PERSONAL NOTES <span>/</span> 蒋月生</div><header className="blog-intro"><div><div className="blog-eyebrow">文字 · 思考 · 生活</div><h1>博客<span>.</span></h1><p>记录学到的技术，也记录生活中的片刻。</p></div><div className="blog-count"><strong>{posts?.length ?? '—'}</strong><span>篇文章</span></div></header><div className="blog-section-title"><span>文章归档</span><span>按发布时间排列</span></div>{posts === null ? <p className="blog-empty">暂时无法加载文章，请稍后刷新。</p> : posts.length === 0 ? <p className="blog-empty">还没有文章，欢迎稍后再来。</p> : <div className="post-list">{posts.map(post=><article className="post-row" key={post.id}><time dateTime={post.publishedAt.replace(' ','T')}>{post.publishedAt.slice(0,10)}</time><div><Link href={`/blog/${post.id}`} className="post-link"><h2>{post.title}</h2><span aria-hidden="true">↗</span></Link><p>{summary(post.html)}</p></div><span className="post-row-time">{post.publishedAt.slice(11)}</span></article>)}</div>}</main><footer className="blog-footer">© 蒋月生 · <Link href="/">返回主页</Link></footer></>
}
