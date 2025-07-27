
import Logout from '@/src/components/Logout';

type User = {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: string;
}
export default async function Dashboard() {

  return (
    <div>
      <Logout />
    </div>
  );
}