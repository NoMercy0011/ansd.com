
type studentData = {
  nom: string;
  prenom: string;
  id:number | string;
  classe: string;
  moyenne:number;
  dateNaissance:string;
  telephone:string;
  email:string;
  tuteur:string;
}

export default function StudentCard({ student }: { student: studentData }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-400">
              {student.prenom.charAt(0)}{student.nom.charAt(0)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            <div>
              <h2 className="text-xl font-bold">{student.prenom} {student.nom}</h2>
              <p className="text-gray-500">Matricule: {student.id}</p>
              
              <div className="mt-4 space-y-2">
                <p><span className="font-medium">Classe:</span> {student.classe}</p>
                <p><span className="font-medium">Moyenne:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    student.moyenne >= 16 ? 'bg-green-100 text-green-800' :
                    student.moyenne >= 12 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.moyenne}/20
                  </span>
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p><span className="font-medium">Date de naissance:</span> {student.dateNaissance}</p>
              <p><span className="font-medium">Contact:</span> {student.telephone}</p>
              <p><span className="font-medium">Email:</span> {student.email}</p>
              <p><span className="font-medium">Tuteur:</span> {student.tuteur}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}