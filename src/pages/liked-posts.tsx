import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { List } from '~/components/posts/List'
import { prefetchListedPostsQuery, useListedPosts } from '~/components/posts/api/get-listed-posts'
import { prefetchLoggedUser } from '~/components/user/api/get-logged-user'
import { Like, PostWithStatusInfo } from '~/db/schema'
import { loggedUserId } from '~/config'
import { useRemoveLikedPost } from '~/components/posts/api/mutations/remove-liked-post'
import PostsLayout from '~/components/PostsLayout'
import { Card } from '~/components/posts/Card'
import { EmptyCard } from '~/components/posts/EmptyCard'

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
  const removeLikedPostMutation = useRemoveLikedPost()

  const handleLike = (post: PostWithStatusInfo) => {
    const like: Like = {
      userId: loggedUserId,
      postId: post.id
    }
    removeLikedPostMutation.mutate(like)
  }

  const markSeen = () => {
    console.log('hi')
    return null
  }

  if (likedPostsError) {
    throw new Error('An error occurred while fetching liked posts')
  }

  if (!likedPosts) {
    return null
  }

  return (
    <List>
      {likedPosts.length === 0 ? (
        <EmptyCard message={'You do not have any liked posts =('} />
      ) : (
        likedPosts.map((post) => <Card key={post.id} post={post} handleLike={handleLike} markSeen={markSeen} />)
      )}
    </List>
  )
}

LikedPosts.getLayout = function getLayout(page: ReactElement) {
  return (
    <PostsLayout title='Liked posts' metadata='A list of the logged in users liked posts'>
      {page}
    </PostsLayout>
  )
}

export default LikedPosts
