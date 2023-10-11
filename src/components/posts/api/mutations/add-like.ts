import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Like, PostWithStatusInfo } from '~/db/schema'
import { listedPostsQueryKey } from '../get-listed-posts'

export const addLike = async (like: Like): Promise<Response> => {
  const response = await fetch('/api/add-like', {
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
    throw new Error('Failed to add like')
  }
  return response
}

export const useAddLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onMutate: async (newLike: Like) => {
      await queryClient.cancelQueries(listedPostsQueryKey)

      const previousListedPosts = queryClient.getQueryData<PostWithStatusInfo[]>(listedPostsQueryKey)

      const updatedListedPosts = previousListedPosts?.map((post) => {
        if (post.id === newLike.postId) {
          return {
            ...post,
            liked: true
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
    mutationFn: addLike
  })
}
