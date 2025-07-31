
import ClasseList from "@/src/features/moderator/classe/ClasseList";
import ClasseStat from "@/src/features/moderator/classe/ClasseStat";

export default function ClassePage() {

  return (
  <>
    <div className="space-y-6">
      <ClasseStat />
      <ClasseList />
    </div>
  </>
  );
}