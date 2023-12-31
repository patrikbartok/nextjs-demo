import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { gray } from '~/designSystem'

type ListProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const List: FC<ListProps> = ({ children, ...props }) => {
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
      {children}
    </div>
  )
}
