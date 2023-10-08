import { dehydrate, QueryClient } from '@tanstack/react-query'
import { List } from '~/components/posts/List'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { Header } from '~/components/posts/Header'

const userId: number = 1

const userQueryKey = ['users', userId]
const userApi: string = `http://localhost:3000/api/users/${userId}`

const likedPostQueryKey = ['users', userId, 'likedPosts']
const likedPostsApi: string = `http://localhost:3000/api/users/${userId}/likedPosts`

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(userQueryKey, () => fetch(userApi).then((r) => r.json()))
  await queryClient.prefetchQuery(likedPostQueryKey, () => fetch(likedPostsApi).then((r) => r.json()))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const FavouritePosts: NextPageWithLayout = () => {
  return <List queryKey={likedPostQueryKey} api={likedPostsApi} />
}

FavouritePosts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header queryKey={userQueryKey} api={userApi} />
      {page}
    </>
  )
}

export default FavouritePosts
