import { useQuery } from '@tanstack/react-query'
import { userApi, userQueryKey } from '~/config'
import { User } from '~/db/schema'

export const useLoggedUser = () => {
  return useQuery<User>({
    queryKey: userQueryKey,
    queryFn: () => fetch(userApi).then((r) => r.json())
  })
}
