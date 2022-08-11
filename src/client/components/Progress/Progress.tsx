import { motion, useScroll } from 'framer-motion'
import styles from './Progress.module.scss'
export function Progress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className={styles.progress}
      style={{ scaleX: scrollYProgress }}
    ></motion.div>
  )
}
