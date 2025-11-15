
import React from 'react'
import PointDeVentePage from '../(features)/PointDeVentePage';
import { cookies } from 'next/headers';

type PropsClientID = {
    params : Promise<{
        id: string;
    }>;
}

export default async function page({ params }: PropsClientID) {
  const userRole =  (await cookies()).get('role')?.value;
  const id = (await params).id;

  return (
    <div>
      <PointDeVentePage param={id} userRole={userRole} />
    </div>
  )
}
