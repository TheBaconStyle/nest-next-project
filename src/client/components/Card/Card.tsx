import Image from 'next/image'
import { ReactNode } from 'react'
import styles from './Card.module.scss'

export interface CardProps {
  img?: string
  title?: ReactNode
  description?: ReactNode
  body?: ReactNode
}

export function Card({ img, title, description, body }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <Image
          src={img ?? '/public/assets/beholder.jpg'}
          layout="fill"
          unoptimized
          draggable={false}
          priority
        />
      </div>
      <div className={styles.body}>
        {!body && (
          <>
            {title && <div className={styles.title}>{title}</div>}
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </>
        )}
        {body && body}
      </div>
    </div>
  )
}
