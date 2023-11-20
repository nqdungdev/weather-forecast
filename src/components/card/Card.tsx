import { ReactNode, MouseEventHandler } from 'react'

type Props = {
  children?: ReactNode
  className?: string
  onClick?: MouseEventHandler
}

const Card = ({ children, className, onClick }: Props) => {
  return (
    <div
      className={`h-max flex justify-between items-center border-none m-2 p-6 bg-primary rounded-3xl overflow-hidden ${
        className && className
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
