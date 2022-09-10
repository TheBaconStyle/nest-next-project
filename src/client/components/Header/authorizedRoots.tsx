import { FiList } from 'react-icons/fi'
import { HeaderRoots } from 'src/shared/types/root.type'

export const authorizedRoots: HeaderRoots[] = [
  {
    label: (
      <>
        <FiList /> Типы оборудования
      </>
    ),
    href: '/categories',
  },
]
