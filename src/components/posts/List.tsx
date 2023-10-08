import { ComponentPropsWithoutRef, FC } from 'react'
import { gray } from '~/designSystem'
import { Card } from '~/components/posts/Card'
import { useQuery } from '@tanstack/react-query'
import { PostWithAuthor } from '~/db/schema'

type ListProps = {
  queryKey: Array<any>
  api: string
} & ComponentPropsWithoutRef<'div'>
export const List: FC<ListProps> = ({ ...props }) => {
  const { error, data } = useQuery<PostWithAuthor[]>({
    queryKey: [props.queryKey],
    queryFn: () => fetch(props.api).then((r) => r.json())
  })

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
        marginTop: -200,
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        border: `1px solid ${gray[100]}`
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
