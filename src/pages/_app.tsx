import '~/reset.css'
import { DefaultOptions, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ReactElement, ReactNode, Suspense, useState } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { ErrorBoundaryFallback } from '~/dashboard/ErrorBoundaryFallback'
import { Loading } from '~/dashboard/Loading'
import { NextPage } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const userId: number = 1

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const queryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }

  const [queryClient] = useState(() => new QueryClient({ defaultOptions: queryConfig }))

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={inter.className}>
          <ErrorBoundary errorComponent={ErrorBoundaryFallback}>
            <Suspense fallback={<Loading />}>
              <>{getLayout(<Component {...pageProps} />)}</>
            </Suspense>
          </ErrorBoundary>
        </main>
      </Hydrate>
    </QueryClientProvider>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default App
