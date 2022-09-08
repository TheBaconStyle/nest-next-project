import { Category } from 'src/server/entities'
import { Card } from '../Card'
import styles from './CategoriesFilter.module.scss'

export interface CategoriesFilterProps {
  categories?: Category[]
}

export function CategoriesFilter({ categories }: CategoriesFilterProps) {
  return (
    <div className={styles.categories_filter}>
      <div>filter</div>
      <div className={styles.card_section}>
        {categories && (
          <>
            {categories.map((category) => (
              <Card
                img={category.img}
                key={category.id}
                title={category.name}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
