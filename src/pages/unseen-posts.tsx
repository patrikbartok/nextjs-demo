import { dehydrate, QueryClient } from '@tanstack/react-query'
import { List } from '~/components/posts/List'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { prefetchListedPostsQuery, useListedPosts } from '~/components/posts/api/get-listed-posts'
import { prefetchLoggedUser } from '~/components/user/api/get-logged-user'
import { Like, PostWithStatusInfo } from '~/db/schema'
import { loggedUserId } from '~/config'
import { useAddLike } from '~/components/posts/api/mutations/add-like'
import { useRemoveLike } from '~/components/posts/api/mutations/remove-like'
import { useAddSeen } from '~/components/posts/api/mutations/add-seen'
import PostsLayout from '~/components/PostsLayout'
import { Card } from '~/components/posts/Card'

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
  const addLikeMutation = useAddLike()
  const removeLikeMutation = useRemoveLike()
  const markSeenMutation = useAddSeen()

  const handleLike = (post: PostWithStatusInfo) => {
    const like: Like = {
      userId: loggedUserId,
      postId: post.id
    }
    if (post.liked) {
      removeLikeMutation.mutate(like)
    } else {
      addLikeMutation.mutate(like)
    }
  }

  const markSeen = (post: PostWithStatusInfo) => {
    const seen: Like = {
      userId: loggedUserId,
      postId: post.id
    }
    markSeenMutation.mutate(seen)
  }

  if (unseenPostsError) {
    throw new Error('An error occurred while fetching unseen posts')
  }

  if (!unseenPosts) {
    return null
  }

  return (
    <List>
      {unseenPosts.map((post) => (
        <Card key={post.id} post={post} handleLike={handleLike} markSeen={markSeen} />
      ))}
    </List>
  )
}

UnseenPosts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <PostsLayout title='Unseen posts' metadata='A list of posts that the logged in user hasnt seen yet'>
        {page}
      </PostsLayout>
    </>
  )
}

export default UnseenPosts
