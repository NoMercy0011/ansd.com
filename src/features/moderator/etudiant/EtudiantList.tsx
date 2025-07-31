import { Button } from "@/src/components/ui";
import Link from "next/link";

export default function StudentList({ students }: { students: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matricule</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom Complet</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classe</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Moyenne</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {student.prenom} {student.nom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.classe}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  student.moyenne >= 16 ? 'bg-green-100 text-green-800' :
                  student.moyenne >= 12 ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {student.moyenne}/20
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Link href={`/moderator/etudiant/${student.id}`}>
                      Voir
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" >
                    <Link href={`/moderator/etudiant/editer/${student.id}`}>
                      Éditer
                    </Link>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}