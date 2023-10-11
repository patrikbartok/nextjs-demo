import { useMutation } from '@tanstack/react-query'
import { SeenPost } from '~/db/schema'

export const addLike = async (like: SeenPost): Promise<Response> => {
  const response = await fetch('/api/add-seen', {
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
    throw new Error('Failed to mark as Seen')
  }
  return response
}

export const useAddSeen = () => {
  return useMutation({
    onError: () => false,
    onSuccess: () => true,
    mutationFn: addLike
  })
}
