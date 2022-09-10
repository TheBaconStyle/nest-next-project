import { Card } from '../Card'
import styles from './CategoriesFilter.module.scss'
import Link from 'next/link'
import { Category } from 'src/server/entities'

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
              <Link
                href={`/categories/${category.id}`}
                key={category.id}
                passHref
              >
                <a>
                  <Card
                    img={`/public/categories/${category.img}`}
                    title={category.name}
                  />
                </a>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
