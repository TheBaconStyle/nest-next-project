import {AnimatePresence, motion} from 'framer-motion'
import {ReactNode, useEffect} from 'react'
import {IconType} from 'react-icons'
import {FiMenu, FiX} from 'react-icons/fi'
import {useBoolean, useIsClient, useMediaQuery} from 'usehooks-ts'
import {AnchorLink} from '../AnchorLink'
import {Progress} from '../Progress'
import styles from './Header.module.scss'

export interface MenuItem {
  href: string
  label: ReactNode
  icon: IconType
}

interface HeaderProps {
  items?: MenuItem[]
}

export function Header({items}: HeaderProps) {
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
  return (
    <header className={styles.navbar}>
      <Progress/>
      <nav className={styles.nav}>
        <AnchorLink className={styles.navbar_brand} href="/">
          Brand
        </AnchorLink>
        {items && items.length !== 0 && !isDesktop && isClient && (
          <motion.button
            className={styles.navbar_collapse_toggler}
            onClick={toggleMenu}
            whileTap={{scale: 0.95}}
          >
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.div
                initial={{
                  scale: 1.5,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{scale: 0.5, opacity: 0}}
                key={isMenuVisible ? 'OPEN' : 'CLOSE'}
              >
                {isMenuVisible ? (
                  <FiX className={styles.navbar_collapse_toggler_icon}/>
                ) : (
                  <FiMenu className={styles.navbar_collapse_toggler_icon}/>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
        {isClient && (
          <motion.div
            initial={{
              height: isDesktop || isMenuVisible ? '100%' : '0',
            }}
            className={styles.navbar_collapse}
            animate={{
              height: isDesktop || isMenuVisible ? '100%' : '0',
            }}
          >
            <div className={styles.navbar_collapse_item_wrapper}>
              {items?.map(({href, icon: Icon, label}) => (
                <AnchorLink
                  href={href}
                  className={styles.navbar_collapse_item}
                  key={href}
                  activeClass={styles.item_active}
                >
                  <Icon className={styles.navbar_collapse_item_icon}/>
                  {label}
                </AnchorLink>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}
