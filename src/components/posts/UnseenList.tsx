import { ComponentPropsWithoutRef, FC } from 'react'
import { gray } from '~/designSystem'
import { Card } from '~/components/posts/Card'
import { useUnseenPosts } from '~/components/posts/api/getUnseenPosts'
import { useLikedPosts } from '~/components/posts/api/getLikedPosts'

type ListProps = ComponentPropsWithoutRef<'div'>
export const UnseenList: FC<ListProps> = ({ ...props }) => {
  const { error: unseenPostsError, data: unseenPosts } = useUnseenPosts()
  const { error: likedPostsError, data: likedPosts } = useLikedPosts()

  if (unseenPostsError) {
    throw new Error('An error occurred while fetching unseen posts')
  }

  if (likedPostsError) {
    throw new Error('An error occurred while fetching liked posts')
  }

  if (!unseenPosts || !likedPosts) {
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
      {unseenPosts.map((post) => {
        return (
          <Card key={post.id} title={post.author.name ?? ''}>
            {post.content}
          </Card>
        )
      })}
    </div>
  )
}
