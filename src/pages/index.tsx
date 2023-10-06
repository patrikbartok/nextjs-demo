import { PostsLayout } from '~/components/posts/PostsLayout'
import { dehydrate, QueryClient } from '@tanstack/react-query'

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

const Posts = () => {
  return (
    <div>
      <PostsLayout />
    </div>
  )
}

export default Posts
