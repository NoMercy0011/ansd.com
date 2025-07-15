
import { ReadClasse } from '@/src/actions/moderator/crud.classe.action'
import DeleteClasseButton from '@/src/components/moderator/classe/DeleteClasseButton';
import EditClasseButton from '@/src/components/moderator/classe/EditClasseButton';
import { EditIcon, TrashIcon } from '@/src/components/ui/icon'

export default async function ClasseList() {

  const classes = await ReadClasse();
    
  return (
    <div className='my-5 w-full'>
    <div>
        { !classes.success && <div className='text-center text-sm my-5 p-2 bg-amber-400 text-gray-700 rounded shadow'>{ classes.message } ! </div> }
    </div>
    <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professeur Responsable</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
       { classes.data && classes.data?.map((classe) => (
          <tr key={classe.id_classe} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">{classe.classe}</td>
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{classe.niveau}</td>
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{classe.responsable}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 justify-between inline-grid grid-cols-2">
              <EditClasseButton  classe={classe}/>
              <DeleteClasseButton id_classe={classe.id_classe} classe={classe}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {!classes.data?.length && <div className='text-center text-gray-700 text-sm p-4'> { classes.message } ! </div> }

    </div>
  </div>
  )
}
