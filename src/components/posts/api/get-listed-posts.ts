import { QueryClient, useQuery } from '@tanstack/react-query'
import { PostWithAuthorAndLikedStatus } from '~/db/schema'
import { loggedUserId } from '~/config'

export const listedPostsQueryKey = ['users', loggedUserId, 'unseen-posts']

export const ListedPostsApi = {
  Unseen: `http://localhost:3000/api/users/${loggedUserId}/unseen-posts`,
  Liked: `http://localhost:3000/api/users/${loggedUserId}/liked-posts`
}

export const useListedPosts = (postsApi: keyof typeof ListedPostsApi) => {
  return useQuery<PostWithAuthorAndLikedStatus[]>({
    queryKey: listedPostsQueryKey,
    queryFn: () => fetch(ListedPostsApi[postsApi]).then((r) => r.json())
  })
}

export const prefetchListedPostsQuery = async (
  queryClient: QueryClient,
  postsApi: keyof typeof ListedPostsApi
): Promise<void> => {
  await queryClient.prefetchQuery(listedPostsQueryKey, () => fetch(ListedPostsApi[postsApi]).then((r) => r.json()))
}
