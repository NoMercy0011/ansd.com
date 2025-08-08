
import EdtHeader from "@/src/features/moderator/emploi-du-temps/EdtHeader";
import EdtList from "@/src/features/moderator/emploi-du-temps/EdtList";

export default function EmploiDuTempsPage() {
  
  return (
    <>
    <div className="space-y-5">
      <EdtHeader />
      <EdtList />
    </div>
    </>
  )
}