import { useQuery } from '@tanstack/react-query'
import { unseenPostQueryKey, unseenPostsApi } from '~/config'
import { PostWithAuthor } from '~/db/schema'

export const useUnseenPosts = () => {
  return useQuery<PostWithAuthor[]>({
    queryKey: unseenPostQueryKey,
    queryFn: () => fetch(unseenPostsApi).then((r) => r.json())
  })
}
