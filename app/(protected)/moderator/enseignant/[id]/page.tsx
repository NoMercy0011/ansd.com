
import EnseignantFiche from '@/src/features/moderator/enseignant/EnseignantFiche';

type PropsEnseingantID = {
    params : Promise<{
        id: string;
    }>;
}
export default async function page(props : PropsEnseingantID) {

    const params = await props.params;

  return (
    <>
        <EnseignantFiche params= {params.id} />
    </>
  )
}
