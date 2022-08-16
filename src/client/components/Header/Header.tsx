import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { useBoolean, useIsClient, useMediaQuery } from 'usehooks-ts'
import { AnchorLink } from '../AnchorLink/AnchorLink'
import { Progress } from '../Progress/Progress'
import styles from './Header.module.scss'

export function Header() {
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
            <AiOutlineMenu className={styles.navbar_collapse_toggler_icon} />
          </motion.button>
        )}
        <motion.div
          initial={{ height: isDesktop || isMenuVisible ? '100%' : '0' }}
          className={styles.navbar_collapse}
          animate={{ height: isDesktop || isMenuVisible ? '100%' : '0' }}
        >
          <div className={styles.navbar_collapse_item_wrapper}>
            <AnchorLink
              className={styles.navbar_collapse_item}
              activeClass={styles.active}
              href="/profile"
            >
              profile
            </AnchorLink>
            <AnchorLink
              className={styles.navbar_collapse_item}
              activeClass={styles.active}
              href="/auth/signin"
            >
              signin
            </AnchorLink>
            <AnchorLink
              className={styles.navbar_collapse_item}
              activeClass={styles.active}
              href="/auth/signup"
            >
              signup
            </AnchorLink>
            <AnchorLink
              href="/new"
              className={styles.navbar_collapse_item}
              activeClass={styles.active}
            >
              new route
            </AnchorLink>
          </div>
        </motion.div>
        {isClient && isDesktop && (
          <form action="" className={styles.search_form}>
            <input type="text" className={styles.search_form_entry} />
            <button
              className={styles.search_form_button}
              type="submit"
              title="Поиск"
            >
              <AiOutlineSearch />
            </button>
          </form>
        )}
      </nav>
    </header>
  )
}
