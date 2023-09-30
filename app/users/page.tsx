import { Suspense } from 'react'
import UserTable from './user-table'

interface Props {
  searchParams: { sortOrder: string }
}

export default async function UsersPage({ searchParams: { sortOrder } }: Props) {
  // console.log(sortOrder)
  return (
    <div>
      <h1>Users</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </div>
  )
}
