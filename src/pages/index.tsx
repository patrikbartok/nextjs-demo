import { gray } from '~/designSystem'
import Link from 'next/link'

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh' // This makes the container take the full viewport height
      }}
    >
      <Link href='/posts' style={{ textDecoration: 'none' }}>
        <div
          style={{
            padding: '10px 20px',
            background: gray[600],
            color: 'white',
            borderRadius: '5px',
            transition: 'background 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = gray[500])}
          onMouseOut={(e) => (e.currentTarget.style.background = gray[600])}
        >
          Log in as User 1
        </div>
      </Link>
    </div>
  )
}

export default Home
