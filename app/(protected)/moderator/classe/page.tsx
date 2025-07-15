import AddClasseButton from "@/src/components/moderator/classe/AddClasseButton";
import ClasseList from "@/src/features/moderator/classe/ClasseList";

export default async function Classe() {
  
  return (
    <div className="min-h-screen p-4 md:p-8">
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Liste des Classes</h2>
        <AddClasseButton />
      </div>
      <ClasseList  />
    </div>
    </div>
  );
}