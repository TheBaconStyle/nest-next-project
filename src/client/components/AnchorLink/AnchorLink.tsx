import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'
import { motion } from 'framer-motion'
import Link from 'next/link'

export interface AnchorLinkProps {
  className?: string
  activeClass?: string
  href: string
  children?: ReactNode
}

export function AnchorLink(props: AnchorLinkProps) {
  const router = useRouter()
  const isSameRoot = props.href === router.asPath
  const isActive =
    props.href === router.asPath || `${props.href}#` === router.asPath
  const isClient = useIsClient()
  return (
    <Link href={!isSameRoot ? props.href : '#'} passHref soft replace>
      <motion.a
        className={classNames(props.className, {
          [props.activeClass ?? 'active']: isActive && isClient,
        })}
        draggable={false}
      >
        {props.children}
      </motion.a>
    </Link>
  )
}
