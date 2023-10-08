import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { Header } from '~/components/posts/Header'

type PostsLayoutProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const PostsLayout: FC<PostsLayoutProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      {children}
    </div>
  )
}
