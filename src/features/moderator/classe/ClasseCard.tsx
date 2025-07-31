'use client';

import ClasseCardHeader from './ClasseCardHeader';
import ClasseCardList from './ClasseCardList';

type ClasseCardProps = {
    param : string;
}

export default function ClassDetailPage(props : ClasseCardProps) {

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <ClasseCardHeader param={props.param} />   
        <ClasseCardList param={props.param} />
    </div>
  );
}


