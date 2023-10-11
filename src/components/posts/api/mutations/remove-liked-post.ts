import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Like, PostWithStatusInfo } from '~/db/schema'
import { listedPostsQueryKey } from '../get-listed-posts'

export const removeLike = async (like: Like): Promise<Response> => {
  const response = await fetch('/api/remove-like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: like.userId,
      postId: like.postId
    })
  })
  if (!response.ok) {
    throw new Error('Failed to remove like')
  }
  return response
}

export const useRemoveLikedPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onMutate: async (like: Like) => {
      await queryClient.cancelQueries(listedPostsQueryKey)

      const previousListedPosts = queryClient.getQueryData<PostWithStatusInfo[]>(listedPostsQueryKey)

      const updatedListedPosts = previousListedPosts?.filter((post) => post.id !== like.postId)

      queryClient.setQueryData(listedPostsQueryKey, updatedListedPosts)

      return { previousListedPosts }
    },
    onError: (_, __, context: any) => {
      if (context?.previousListedPosts) {
        queryClient.setQueryData(listedPostsQueryKey, context.previousListedPosts)
      }
    },
    mutationFn: removeLike
  })
}
