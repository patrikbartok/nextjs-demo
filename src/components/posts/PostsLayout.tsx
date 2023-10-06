import { Header } from '~/components/posts/Header'
import { List } from '~/components/posts/List'
import { ComponentPropsWithoutRef, FC } from 'react'

type LayoutProps = ComponentPropsWithoutRef<'div'>
export const PostsLayout: FC<LayoutProps> = ({ style = {}, ...props }) => {
  return (
    <div {...props}>
      <Header style={{ height: 300 }} />
      <List style={{ marginTop: -200 }} />
    </div>
  )
}
