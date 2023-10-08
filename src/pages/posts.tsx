import { dehydrate, QueryClient } from '@tanstack/react-query'
import { List } from '~/components/posts/List'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { PostsLayout } from '~/components/posts/PostsLayout'

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['users', 1], () => fetch('http://localhost:3000/api/users/1').then((r) => r.json()))
  await queryClient.prefetchQuery(['posts'], () => fetch('http://localhost:3000/api/posts').then((r) => r.json()))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const Posts: NextPageWithLayout = () => {
  return <List />
}

Posts.getLayout = function getLayout(page: ReactElement) {
  return <PostsLayout>{page}</PostsLayout>
}

export default Posts
