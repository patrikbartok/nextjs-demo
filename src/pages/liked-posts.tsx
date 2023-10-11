import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { Header } from '~/components/user/Header'
import { List } from '~/components/posts/List'
import { prefetchListedPostsQuery, useListedPosts } from '~/components/posts/api/get-listed-posts'
import { prefetchLoggedUser } from '~/components/user/api/get-logged-user'

export async function getServerSideProps() {
  let queryClient = new QueryClient()

  await prefetchLoggedUser(queryClient)
  await prefetchListedPostsQuery(queryClient, 'Liked')

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const LikedPosts: NextPageWithLayout = () => {
  const { error: likedPostsError, data: likedPosts } = useListedPosts('Liked')

  if (likedPostsError) {
    throw new Error('An error occurred while fetching liked posts')
  }

  if (!likedPosts) {
    return null
  }

  return <List posts={likedPosts} />
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
