import { dehydrate, QueryClient } from '@tanstack/react-query'
import { List } from '~/components/posts/List'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { Header } from '~/components/user/Header'
import { prefetchListedPostsQuery, useListedPosts } from '~/components/posts/api/get-listed-posts'
import { prefetchLoggedUser } from '~/components/user/api/get-logged-user'

export async function getServerSideProps() {
  let queryClient = new QueryClient()

  await prefetchLoggedUser(queryClient)
  await prefetchListedPostsQuery(queryClient, 'Unseen')

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const UnseenPosts: NextPageWithLayout = () => {
  const { error: unseenPostsError, data: unseenPosts } = useListedPosts('Unseen')

  if (unseenPostsError) {
    throw new Error('An error occurred while fetching unseen posts')
  }

  if (!unseenPosts) {
    return null
  }

  return <List posts={unseenPosts} />
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
