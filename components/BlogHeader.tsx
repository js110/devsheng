import Link from 'next/link'
export default function BlogHeader() {
  return <header className="blog-header"><div className="blog-header-inner"><Link href="/" className="blog-brand"><span>{'{ '}</span>EL<span> : </span>dev<span>{' }'}</span></Link><nav aria-label="博客导航"><Link href="/">首页</Link><Link href="/blog">博客</Link><Link href="/blog/manage">写文章</Link></nav></div></header>
}
