import {BaseComponentProps} from 'src/shared/types/component.type'
import styles from './Button.module.scss'

export interface ButtonProps extends BaseComponentProps {
}

export function Button({}: ButtonProps) {
  return <div className={styles.button}>Button component</div>
}
