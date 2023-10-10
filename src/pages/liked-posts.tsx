import { dehydrate } from '@tanstack/react-query'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { Header } from '~/components/posts/Header'
import { prefetchPostsQuery } from '~/components/posts/api/prefetchPostsQuery'
import { LikedList } from '~/components/posts/LikedList'

export async function getServerSideProps() {
  return {
    props: {
      dehydratedState: dehydrate(await prefetchPostsQuery())
    }
  }
}

const LikedPosts: NextPageWithLayout = () => {
  return <LikedList />
}

LikedPosts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  )
}

export default LikedPosts
