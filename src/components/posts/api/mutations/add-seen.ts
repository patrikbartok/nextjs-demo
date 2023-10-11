import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostWithStatusInfo, SeenPost } from '~/db/schema'
import { listedPostsQueryKey } from '../get-listed-posts'

export const addSeen = async (seen: SeenPost): Promise<Response> => {
  const response = await fetch('/api/add-seen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: seen.userId,
      postId: seen.postId
    })
  })
  if (!response.ok) {
    throw new Error('Failed to add seen')
  }
  return response
}

export const useAddSeen = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onMutate: async (seen: SeenPost) => {
      await queryClient.cancelQueries(listedPostsQueryKey)

      const previousListedPosts = queryClient.getQueryData<PostWithStatusInfo[]>(listedPostsQueryKey)

      const updatedListedPosts = previousListedPosts?.map((post) => {
        if (post.id === seen.postId) {
          return {
            ...post,
            seen: true
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
    mutationFn: addSeen
  })
}
