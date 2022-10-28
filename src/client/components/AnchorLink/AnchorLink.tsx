import classNames from 'classnames'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {MouseEvent} from 'react'
import {BaseComponentProps} from 'src/shared/types/component.type'

export interface AnchorLinkProps extends BaseComponentProps {
  className?: string
  activeClass?: string
  href: string
}

export function AnchorLink(props: AnchorLinkProps) {
  const router = useRouter()
  const isActive = router.asPath === props.href
  const activeClassName = props.activeClass ?? 'active'
  return (
    <Link href={props.href} passHref>
      <motion.a
        onClick={(e: MouseEvent) => isActive && e.preventDefault()}
        draggable={false}
        className={classNames(props.className, {
          [activeClassName]: isActive,
        })}
      >
        {props.children}
      </motion.a>
    </Link>
  )
}
