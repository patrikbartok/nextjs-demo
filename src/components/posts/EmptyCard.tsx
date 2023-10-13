import { gray } from '~/designSystem'
import { ComponentPropsWithoutRef, FC } from 'react'

type EmptyCardProps = {
  message: string
} & ComponentPropsWithoutRef<'div'>
export const EmptyCard: FC<EmptyCardProps> = ({ message, style = {}, ...props }) => {
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
        display: 'flex',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      {...props}
    >
      <div style={{ display: 'flex' }}>
        <p style={{ fontSize: 18, color: gray[950], fontWeight: 500 }}>{message}</p>
      </div>
    </div>
  )
}
