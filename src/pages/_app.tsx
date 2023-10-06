import '~/reset.css'
import { DefaultOptions, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { ErrorBoundaryFallback } from '~/dashboard/ErrorBoundaryFallback'
import { Loading } from '~/dashboard/Loading'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  const queryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }

  const [queryClient] = useState(() => new QueryClient({ defaultOptions: queryConfig }))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={inter.className}>
          <ErrorBoundary errorComponent={ErrorBoundaryFallback}>
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
