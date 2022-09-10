import { gssp } from 'dist/shared/utils/gssp.util'
import { Card } from 'src/client/components/Card'
import { Layout } from 'src/client/components/Layout'
import { Facility } from 'src/server/entities'
import { BasePageProps } from 'src/shared/types/page.type'

export const getServerSideProps = gssp

export interface FacilitiesPageProps extends BasePageProps {
  facilities: string
}

export default function FacilitiesPage({
  user,
  facilities,
}: FacilitiesPageProps) {
  const unpackaged = JSON.parse(facilities) as Facility[]
  return (
    <Layout user={user}>
      {unpackaged.map((facility) => (
        <Card
          title={facility.name}
          img={`/public/facilities/${facility.img}`}
          key={facility.id}
          description={facility.description}
        />
      ))}
    </Layout>
  )
}
