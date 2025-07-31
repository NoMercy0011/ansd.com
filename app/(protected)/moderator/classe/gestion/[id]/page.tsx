
import ClasseCard from '@/src/features/moderator/classe/ClasseCard';

type PropsEnseingantID = {
    params : Promise<{
        id: string;
    }>;
}
export default async function page(props : PropsEnseingantID) {

    const params = await props.params;

  return (
    <>
      <ClasseCard param= {params.id} />
    </>
  )
}
