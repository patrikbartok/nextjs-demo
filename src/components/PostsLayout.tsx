import Head from 'next/head'
import { Header } from '~/components/user/Header'
import { ReactNode } from 'react'

type LayoutProps = {
  title: string
  metadata: string
  children: ReactNode
}
export default function PostsLayout({ title, metadata, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={metadata} />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
