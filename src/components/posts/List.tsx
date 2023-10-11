import { ComponentPropsWithoutRef, FC } from 'react'
import { gray } from '~/designSystem'
import { Card } from '~/components/posts/Card'
import { PostWithAuthorAndLikedStatus } from '~/db/schema'

type ListProps = {
  posts: PostWithAuthorAndLikedStatus[]
  handleLike: (post: PostWithAuthorAndLikedStatus) => void
  markSeen: (post: PostWithAuthorAndLikedStatus) => Promise<boolean>
} & ComponentPropsWithoutRef<'div'>
export const List: FC<ListProps> = ({ posts, handleLike, markSeen, ...props }) => {
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
      {posts.map((post) => (
        <Card key={post.id} post={post} handleLike={handleLike} markSeen={markSeen} />
      ))}
    </div>
  )
}
