import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Like, PostWithAuthorAndLikedStatus } from '~/db/schema'
import { listedPostsQueryKey } from '../get-listed-posts'

export const addLike = (like: Like): Promise<Response> => {
  return fetch('/api/add-like', {
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
      throw new Error('Failed to add like')
    }
    return response
  })
}

export const useAddLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onMutate: async (newLike: Like) => {
      await queryClient.cancelQueries(listedPostsQueryKey)

      const previousListedPosts = queryClient.getQueryData<PostWithAuthorAndLikedStatus[]>(listedPostsQueryKey)

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
      console.log('error')
      if (context?.previousListedPosts) {
        queryClient.setQueryData(listedPostsQueryKey, context.previousListedPosts)
      }
    },
    mutationFn: addLike
  })
}
