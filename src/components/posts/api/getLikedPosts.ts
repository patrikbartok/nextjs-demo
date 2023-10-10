import { useQuery } from '@tanstack/react-query'
import { likedPostQueryKey, likedPostsApi } from '~/config'
import { PostWithAuthor } from '~/db/schema'

export const useLikedPosts = () => {
  return useQuery<PostWithAuthor[]>({
    queryKey: likedPostQueryKey,
    queryFn: () => fetch(likedPostsApi).then((r) => r.json())
  })
}
