import { ComponentPropsWithoutRef, FC } from 'react'
import { gray } from '~/designSystem'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLoggedUser } from '~/components/user/api/get-logged-user'

type HeaderProps = ComponentPropsWithoutRef<'div'>
export const Header: FC<HeaderProps> = ({ ...props }) => {
  const { error, data: user } = useLoggedUser()

  const router = useRouter()

  if (error) {
    throw new Error('User not found')
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ height: 300, padding: 30, background: gray[800], color: 'white' }} {...props}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 30,
          width: '100%', // Set width to 100% to take up all available width
          maxWidth: 1200, // Max width as needed
          margin: '0 auto'
        }}
      >
        <h1 style={{ color: gray[200], fontSize: 24, textAlign: 'left', margin: 0 }}>NextJS Demo</h1>
        <div style={{ display: 'flex', gap: '10px', flexGrow: 1, justifyContent: 'left' }}>
          <Link href='/unseen-posts' style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '10px 20px',
                background: gray[600],
                color: router.pathname == '/unseen-posts' ? 'yellow' : 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                transition: 'background 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = gray[500])}
              onMouseOut={(e) => (e.currentTarget.style.background = gray[600])}
            >
              Home
            </div>
          </Link>
          <Link href='/liked-posts' style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '10px 20px',
                background: gray[600],
                color: router.pathname == '/liked-posts' ? 'yellow' : 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                transition: 'background 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = gray[500])}
              onMouseOut={(e) => (e.currentTarget.style.background = gray[600])}
            >
              Favourites
            </div>
          </Link>
        </div>
        <p style={{ textAlign: 'right', margin: 0 }}>{user.name}</p>
        <Link href='/' style={{ textDecoration: 'none' }}>
          <div
            style={{
              padding: '10px 20px',
              background: gray[600],
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              transition: 'background 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = gray[500])}
            onMouseOut={(e) => (e.currentTarget.style.background = gray[600])}
          >
            Log out
          </div>
        </Link>
      </div>
    </div>
  )
}
