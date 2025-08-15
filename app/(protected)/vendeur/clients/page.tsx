import React from 'react'
import ClientsPage from './(features)/clientsPage'
import { cookies } from 'next/headers';

export default async function page() {
  const userRole =  (await cookies()).get('role')?.value;
  
  return (
    <div>
      <ClientsPage userRole={userRole} />
    </div>
  )
}
