import styles from './Preloader.module.scss'

import {motion} from 'framer-motion'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export function Preloader() {
  return (
    <motion.div
      className={styles.preloader}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <AiOutlineLoading3Quarters className={styles.preloader_icon}/>
    </motion.div>
  )
}
