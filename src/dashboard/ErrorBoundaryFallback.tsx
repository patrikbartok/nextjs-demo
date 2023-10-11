'use client' // ErrorBoundaryFallback components must be Client Components

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const ErrorBoundaryFallback = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      <h2>{error.message}</h2>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px', // Add some spacing
            cursor: 'pointer'
          }}
          onClick={() => {
            router.push('/')
          }}
        >
          Home
        </button>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
