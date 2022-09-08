import { AiOutlineSearch } from 'react-icons/ai'
import styles from './SearchForm.module.scss'

export function SearchForm() {
  return (
    <>
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
    </>
  )
}
