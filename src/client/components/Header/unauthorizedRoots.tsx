import { FiUserCheck, FiUserPlus } from 'react-icons/fi'
import { HeaderRoots } from 'src/shared/types/root.type'
import styles from './Header.module.scss'

export const unauthorizedRoots: HeaderRoots[] = [
  {
    label: (
      <>
        <FiUserCheck className={styles.navbar_collapse_item_icon} />
        signin
      </>
    ),
    href: '/auth/signin',
  },
  {
    label: (
      <>
        <FiUserPlus className={styles.navbar_collapse_item_icon} />
        signup
      </>
    ),
    href: '/auth/signup',
  },
]
