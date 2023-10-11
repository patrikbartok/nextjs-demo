import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Like, PostWithAuthorAndLikedStatus } from '~/db/schema'
import { listedPostsQueryKey } from '../get-listed-posts'
import { useRouter } from 'next/router'

export const removeLike = (like: Like): Promise<Response> => {
  return fetch('/api/remove-like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: like.userId,
      postId: like.postId
    })
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to remove like')
    }
    return response
  })
}

export const useRemoveLike = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    onMutate: async (newLike: Like) => {
      await queryClient.cancelQueries(listedPostsQueryKey)

      const previousListedPosts = queryClient.getQueryData<PostWithAuthorAndLikedStatus[]>(listedPostsQueryKey)

      const updatedListedPosts = previousListedPosts?.map((post) => {
        if (post.id === newLike.postId) {
          return {
            ...post,
            liked: false
          }
        }
        return post
      })

      queryClient.setQueryData(listedPostsQueryKey, updatedListedPosts)

      return { previousListedPosts }
    },
    onError: (_, __, context: any) => {
      if (context?.previousListedPosts) {
        queryClient.setQueryData(listedPostsQueryKey, context.previousListedPosts)
      }
    },
    onSuccess: () => {
      if (router.pathname === '/liked-posts') {
        queryClient.invalidateQueries(listedPostsQueryKey) //so it disappears when removing like on favourites page
      }
    },
    mutationFn: removeLike
  })
}
