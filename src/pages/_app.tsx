import '~/reset.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Suspense, useState } from 'react'
import { Error } from '~/dashboard/Error'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { Loading } from '~/dashboard/Loading'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={inter.className}>
          <ErrorBoundary errorComponent={Error}>
            <Suspense fallback={<Loading />}>
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </main>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
