import { BaseComponentProps } from 'src/shared/types/component.type'
import styles from './TemplateName.module.scss'

export interface TemplateNameProps extends BaseComponentProps {}

export function TemplateName({}: TemplateNameProps) {
  return <div className={styles.templateName}>TemplateName component</div>
}
