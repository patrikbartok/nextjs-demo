import { QueryClient, useQuery } from '@tanstack/react-query'
import { loggedUserId } from '~/config'
import { User } from '~/db/schema'

export const userQueryKey = ['users', loggedUserId]
export const userApi: string = `http://localhost:3000/api/users/${loggedUserId}`

export const useLoggedUser = () => {
  return useQuery<User>({
    queryKey: userQueryKey,
    queryFn: () => fetch(userApi).then((r) => r.json())
  })
}

export const prefetchLoggedUser = async (queryClient: QueryClient): Promise<QueryClient> => {
  await queryClient.prefetchQuery(userQueryKey, () => fetch(userApi).then((r) => r.json()))
  return queryClient
}
