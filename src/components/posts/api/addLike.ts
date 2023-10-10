import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Like } from '~/db/schema'
import { likedPostQueryKey } from '~/config'

export const addLike = (like: Like): Promise<Response> => {
  return fetch('/api/addLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: like.userId,
      postId: like.postId
    })
  })
}

export const useAddLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onMutate: async (newLike) => {
      await queryClient.cancelQueries(likedPostQueryKey)

      const previousLikes = queryClient.getQueryData<Like[]>(likedPostQueryKey)

      queryClient.setQueryData(likedPostQueryKey, [...(previousLikes || []), newLike])

      return { previousLikes }
    },
    onError: (_, __, context: any) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(likedPostQueryKey, context.previousLikes)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(likedPostQueryKey)
    },
    mutationFn: addLike
  })
}
