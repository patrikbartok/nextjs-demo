import '~/reset.css'
import { DefaultOptions, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { ErrorBoundaryFallback } from '~/dashboard/ErrorBoundaryFallback'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  const queryConfig: DefaultOptions = {
    queries: {
      //useErrorBoundary: true,
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
            <Component {...pageProps} />
          </ErrorBoundary>
        </main>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
