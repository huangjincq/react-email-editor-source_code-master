import React, { ReactNode, useState } from 'react'

interface CardItemElementProps {
  title: string
  children?: ReactNode
}
const CardItemElement = ({ title, children }: CardItemElementProps) => {
  return (
    <div className="card-item">
      <div className="card-item-title">{title}</div>
      <div>{children}</div>
    </div>
  )
}

export default CardItemElement
