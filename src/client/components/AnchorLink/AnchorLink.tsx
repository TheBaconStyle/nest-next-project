import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'

interface AnchorLinkProps {
  className?: string
  activeClass?: string
  href: string
  children?: ReactNode
}

export function AnchorLink(props: AnchorLinkProps) {
  const router = useRouter()
  const isSameRoot = router.asPath === props.href
  const isActive = router.asPath.includes(props.href)
  const isClient = useIsClient()
  return (
    <a
      href={!isSameRoot && isClient ? props.href : '#'}
      className={classNames(props.className, {
        [props.activeClass ?? 'active']: isActive && isClient,
      })}
      draggable={false}
    >
      {props.children}
    </a>
  )
}
