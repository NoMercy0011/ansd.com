
import EnseignantStat from "@/src/features/moderator/enseignant/EnseignantStat";
import EnseignantList from "@/src/features/moderator/enseignant/EnseignantList";

export default function EnseignantPage() {

  return (
    <div className="space-y-6">
      <EnseignantStat />
      <EnseignantList />
    </div>
  );
}