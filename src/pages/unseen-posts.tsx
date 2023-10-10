import { dehydrate } from '@tanstack/react-query'
import { UnseenList } from '~/components/posts/UnseenList'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { Header } from '~/components/posts/Header'
import { prefetchPostsQuery } from '~/components/posts/api/prefetchPostsQuery'

export async function getServerSideProps() {
  return {
    props: {
      dehydratedState: dehydrate(await prefetchPostsQuery())
    }
  }
}

const UnseenPosts: NextPageWithLayout = () => {
  return <UnseenList />
}

UnseenPosts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  )
}

export default UnseenPosts
