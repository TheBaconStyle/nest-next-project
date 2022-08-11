import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { useBoolean, useIsClient, useMediaQuery } from 'usehooks-ts'
import { AnchorLink } from '../AnchorLink/AnchorLink'
import { Progress } from '../Progress/Progress'
import styles from './Header.module.scss'

export function Header() {
  const { toggle, setFalse, value: isMenuVisible } = useBoolean(true)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isClient = useIsClient()
  useEffect(() => {
    if (!isDesktop) {
      setFalse()
    }
  }, [isDesktop, setFalse])
  const handleMenuButtonClick = () => {
    toggle()
  }
  return (
    <header className={styles.navbar}>
      <Progress />
      <nav className={styles.nav}>
        <AnchorLink className={styles.navbar_brand} href="/">
          Brand
        </AnchorLink>
        {isClient && !isDesktop && (
          <button
            className={styles.navbar_collapse_toggler}
            onClick={handleMenuButtonClick}
          >
            <AiOutlineMenu className={styles.navbar_collapse_toggler_icon} />
          </button>
        )}
        <motion.div
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
