import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiMenu, FiUser, FiUserX, FiX } from 'react-icons/fi'
import { useBoolean, useIsClient, useMediaQuery } from 'usehooks-ts'
import { authorizedRoots } from './authorizedRoots'
import { unauthorizedRoots } from './unauthorizedRoots'
import { AnchorLink } from '../AnchorLink'
import { Progress } from '../Progress'
import styles from './Header.module.scss'

export interface HeaderProps {
  user: string
}

export function Header({ user }: HeaderProps) {
  const {
    toggle: toggleMenu,
    setFalse: hideMenu,
    value: isMenuVisible,
  } = useBoolean(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isClient = useIsClient()
  useEffect(() => {
    hideMenu()
  }, [isDesktop, hideMenu])
  const handleMenuButtonClick = () => {
    toggleMenu()
  }
  return (
    <header className={styles.navbar}>
      <Progress />
      <nav className={styles.nav}>
        <AnchorLink className={styles.navbar_brand} href="/">
          Brand
        </AnchorLink>
        {isClient && !isDesktop && (
          <motion.button
            className={styles.navbar_collapse_toggler}
            onClick={handleMenuButtonClick}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence exitBeforeEnter initial={false}>
              {isMenuVisible ? (
                <motion.div
                  initial={{
                    scale: 1.5,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  key={'close'}
                >
                  <FiX className={styles.navbar_collapse_toggler_icon} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{
                    scale: 1.5,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  key={'open'}
                >
                  <FiMenu className={styles.navbar_collapse_toggler_icon} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
        <motion.div
          initial={{ height: isDesktop || isMenuVisible ? '100%' : '0' }}
          className={styles.navbar_collapse}
          animate={{ height: isDesktop || isMenuVisible ? '100%' : '0' }}
        >
          <div className={styles.navbar_collapse_item_wrapper}>
            {!user && (
              <>
                {unauthorizedRoots.map((root) => (
                  <AnchorLink
                    className={styles.navbar_collapse_item}
                    activeClass={styles.active}
                    href={root.href}
                    key={root.href}
                  >
                    {root.label}
                  </AnchorLink>
                ))}
              </>
            )}
            {user && (
              <>
                {authorizedRoots.map((root) => (
                  <AnchorLink
                    className={styles.navbar_collapse_item}
                    activeClass={styles.active}
                    href={root.href}
                    key={root.href}
                  >
                    {root.label}
                  </AnchorLink>
                ))}
                <AnchorLink
                  className={styles.navbar_collapse_item}
                  activeClass={styles.active}
                  href="/user/profile"
                >
                  <FiUser className={styles.navbar_collapse_item_icon} />
                  Профиль: <strong>{user}</strong>
                </AnchorLink>
                <AnchorLink
                  className={styles.navbar_collapse_item}
                  activeClass={styles.active}
                  href="/auth/api/signout"
                >
                  <FiUserX className={styles.navbar_collapse_item_icon} />
                  Выйти
                </AnchorLink>
              </>
            )}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}
