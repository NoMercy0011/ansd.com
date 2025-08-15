
import React from 'react'
import PointDeVentePage from '../(features)/PointDeVentePage';

type PropsClientID = {
    params : Promise<{
        id: string;
    }>;
}

export default async function page({ params }: PropsClientID) {

 const id = (await params).id;
  return (
    <div>
      <PointDeVentePage param={id} />
    </div>
  )
}
