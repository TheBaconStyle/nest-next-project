import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import {
  FiMenu,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiUserX,
} from 'react-icons/fi'
import { BasePageProps } from 'src/shared/types/page.type'
import { useBoolean, useIsClient, useMediaQuery } from 'usehooks-ts'
import { AnchorLink } from '../AnchorLink'
import { Progress } from '../Progress'
import styles from './Header.module.scss'

export interface HeaderProps extends BasePageProps {}

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
            <FiMenu className={styles.navbar_collapse_toggler_icon} />
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
                <AnchorLink
                  className={styles.navbar_collapse_item}
                  activeClass={styles.active}
                  href="/auth/signin"
                >
                  <FiUserCheck className={styles.navbar_collapse_item_icon} />{' '}
                  signin
                </AnchorLink>
                <AnchorLink
                  className={styles.navbar_collapse_item}
                  activeClass={styles.active}
                  href="/auth/signup"
                >
                  <FiUserPlus className={styles.navbar_collapse_item_icon} />
                  signup
                </AnchorLink>
              </>
            )}
            {user && (
              <>
                <AnchorLink
                  className={styles.navbar_collapse_item}
                  activeClass={styles.active}
                  href="/user/profile"
                >
                  <FiUser className={styles.navbar_collapse_item_icon} />
                  {user}
                </AnchorLink>
                <AnchorLink
                  className={styles.navbar_collapse_item}
                  activeClass={styles.active}
                  href="/auth/api/signout"
                >
                  <FiUserX className={styles.navbar_collapse_item_icon} />
                  signout
                </AnchorLink>
              </>
            )}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}
