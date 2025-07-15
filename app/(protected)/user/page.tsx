import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken'
import Logout from '@/src/components/Logout';

type User = {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: string;
}
export default async function Dashboard() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }
  const user: User = await jwt.verify(token, process.env.JWT_SECRET)
  if (user.role ==='Moderator'){
    throw new Error (' Page Invalide !')
  }

  return (
    <div>
      <h1>Dashboard &apos;{user.role}&apos; </h1>
      <p>Bienvenu {user.nom} {user.prenom} </p>
      <Logout />
    </div>
  );
}