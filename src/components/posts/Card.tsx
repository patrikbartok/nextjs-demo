import { ComponentPropsWithoutRef, FC } from 'react'
import { gray } from '~/designSystem'
import { Like, PostWithAuthorAndLikedStatus } from '~/db/schema'
import { useAddLike } from '~/components/posts/api/like/add-like'
import { loggedUserId } from '~/config'
import { useRemoveLike } from '~/components/posts/api/like/remove-like'

type CardProps = {
  post: PostWithAuthorAndLikedStatus
} & ComponentPropsWithoutRef<'div'>
export const Card: FC<CardProps> = ({ post, style = {}, ...props }) => {
  const addLikeMutation = useAddLike()
  const removeLikeMutation = useRemoveLike()

  const handleLikeClick = () => {
    const like: Like = {
      userId: loggedUserId,
      postId: post.id
    }
    if (post.liked) {
      removeLikeMutation.mutate(like)
    } else {
      addLikeMutation.mutate(like)
    }
  }

  return (
    <div
      style={{
        width: 600,
        maxWidth: '100%',
        margin: '0 auto',
        padding: 20,
        background: gray[100],
        borderRadius: 10,
        border: `1px solid ${gray[200]}`,
        ...style
      }}
      {...props}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 18, lineHeight: 1, color: gray[950], fontWeight: 500 }}>{post.author.name}</p>
        <div style={{ color: 'white', ...style }} {...props}>
          <button
            style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'red' }}
            onClick={handleLikeClick}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill={post.liked ? 'red' : 'none'}
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              style={{ width: 20, height: 20 }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
              />
            </svg>
          </button>
        </div>
      </div>
      <div style={{ marginTop: '1vw', fontSize: 15, color: gray[800] }}>{post.content}</div>
    </div>
  )
}
