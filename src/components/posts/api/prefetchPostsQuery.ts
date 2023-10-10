import { QueryClient } from '@tanstack/react-query'
import { likedPostQueryKey, likedPostsApi, unseenPostQueryKey, unseenPostsApi, userApi, userQueryKey } from '~/config'

export const prefetchPostsQuery = async (): Promise<QueryClient> => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([userQueryKey], () => fetch(userApi).then((r) => r.json()))
  await queryClient.prefetchQuery([unseenPostQueryKey], () => fetch(unseenPostsApi).then((r) => r.json()))
  await queryClient.prefetchQuery([likedPostQueryKey], () => fetch(likedPostsApi).then((r) => r.json()))

  return queryClient
}
