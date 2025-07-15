
import DeleteEnseignantButton from '@/src/components/moderator/enseignant/DeleteEnseignant';
import EditEnseignantButton from '@/src/components/moderator/enseignant/EditEnseignantButon';
import { EnseignantListProps } from '@/src/types/type';



export default async function EnseignantList( { data , success, message } : EnseignantListProps) {
    return(
      <div className='my-5 w-full'>
        <div>
        { !success && <div className='text-center text-sm my-5 p-2 bg-amber-400 text-gray-700 rounded shadow'>{ message } ! </div> }
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexe</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Naiss.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu Naiss.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-start">
          {data && data.map((enseignant) => (
            <tr key={enseignant.user_enseignant_enseignantTouser.id_user} className="hover:bg-gray-50 ">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-start">{enseignant.user_enseignant_enseignantTouser.nom} {enseignant.user_enseignant_enseignantTouser.prenom}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enseignant.user_enseignant_enseignantTouser.sexe === 'M' ? 'Masculin' : 'Féminin'}
                </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-start">
                { enseignant?.user_enseignant_enseignantTouser?.date_naissance?.toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enseignant.user_enseignant_enseignantTouser.lieu_naissance}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enseignant.user_enseignant_enseignantTouser.telephone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 justify-center text-center inline-grid grid-cols-2 ">

              <EditEnseignantButton enseignant={enseignant.user_enseignant_enseignantTouser} />
              <DeleteEnseignantButton id_enseignant={enseignant.user_enseignant_enseignantTouser.id_user} enseignant = {enseignant.user_enseignant_enseignantTouser} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data?.length && <div className='text-center text-gray-700 text-sm p-4'> { message } ! </div> }
        </div> 
      </div>
    )

  
}
