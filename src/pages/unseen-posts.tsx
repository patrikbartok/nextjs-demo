import { dehydrate, QueryClient } from '@tanstack/react-query'
import { List } from '~/components/posts/List'
import { NextPageWithLayout } from '~/pages/_app'
import { ReactElement } from 'react'
import { Header } from '~/components/user/Header'
import { prefetchListedPostsQuery, useListedPosts } from '~/components/posts/api/get-listed-posts'
import { prefetchLoggedUser } from '~/components/user/api/get-logged-user'
import { Like, PostWithAuthorAndLikedStatus } from '~/db/schema'
import { loggedUserId } from '~/config'
import { useAddLike } from '~/components/posts/api/mutations/add-like'
import { useRemoveLike } from '~/components/posts/api/mutations/remove-like'
import { useAddSeen } from '~/components/posts/api/mutations/add-seen'

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

  const handleLike = (post: PostWithAuthorAndLikedStatus) => {
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

  const markSeen = async (post: PostWithAuthorAndLikedStatus): Promise<boolean> => {
    const seen: Like = {
      userId: loggedUserId,
      postId: post.id
    }
    const { ok } = await markSeenMutation.mutateAsync(seen)
    return ok
  }

  if (unseenPostsError) {
    throw new Error('An error occurred while fetching unseen posts')
  }

  if (!unseenPosts) {
    return null
  }

  return <List posts={unseenPosts} handleLike={handleLike} markSeen={markSeen} />
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
