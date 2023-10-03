import { useQuery } from '@tanstack/react-query'
import { ComponentPropsWithoutRef, FC } from 'react'
import { User } from '~/db/schema'
import { gray } from '~/designSystem'

type HeaderProps = ComponentPropsWithoutRef<'div'>
export const Header: FC<HeaderProps> = ({ style = {}, ...props }) => {
  const {
    isLoading,
    error,
    data: user
  } = useQuery<User>({
    queryKey: ['users', 1],
    queryFn: () => fetch('/api/users/1').then((r) => r.json())
  })

  if (isLoading || !user) {
    return null
  }

  if (error) {
    throw new Error('User not found')
  }

  return (
    <div style={{ padding: 30, background: gray[800], color: 'white', ...style }} {...props}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 30,
          width: 1200,
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
        <h1 style={{ color: gray[200], fontSize: 24 }}>ICF Social</h1>
        <span style={{ flex: 1 }}></span>
        <p>{user.name}</p>
        <a href='/' style={{ color: gray[300] }}>
          Log out
        </a>
      </div>
    </div>
  )
}
