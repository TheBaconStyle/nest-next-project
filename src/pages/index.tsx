import dayjs from 'dayjs'

export default function HomePage() {
  return (
    <>
      <h1 className="bg-green-500">
        {dayjs().startOf('hour').toDate().toISOString()}
      </h1>
      <h1 className="bg-green-500">{`${dayjs().add(30, 'days').toDate()}`}</h1>
    </>
  )
}
