import { ComponentPropsWithoutRef, FC } from 'react'
import { gray } from '~/designSystem'
import { Card } from '~/components/Card'
import { useQuery } from '@tanstack/react-query'
import { PostWithAuthor } from '~/db/schema'
import { Loading } from '~/dashboard/Loading'

type ListProps = ComponentPropsWithoutRef<'div'>
export const List: FC<ListProps> = ({ style = {}, ...props }) => {
  const { isLoading, error, data } = useQuery<PostWithAuthor[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((r) => r.json())
  })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    throw new Error('An error occurred while fetching posts')
  }

  if (!data) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 50,
        background: gray[50],
        padding: 50,
        width: 700,
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        border: `1px solid ${gray[100]}`,
        ...style
      }}
      {...props}
    >
      {data.map((post) => {
        return (
          <Card key={post.id} title={post.author.name ?? ''}>
            {post.content}
          </Card>
        )
      })}
    </div>
  )
}
