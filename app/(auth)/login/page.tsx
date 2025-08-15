"use client"

import { Moon, Sun, Eye, EyeOff, LogInIcon } from 'lucide-react';
import { Button } from '@/sources/components/ui';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { LoginRequest } from '@/sources/actions/auth/auth.action';
import { userLoginType } from '@/sources/types/type';
import { useRouter } from 'next/navigation';



export default function LoginScreen() {
  const router = useRouter();
  const [login, setLogin] = useState<userLoginType>({
    password: '',
    pseudo: '',
    header: 'client_1',
  });

  const [errorLog, setErrorLog] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsLoading(true);
    try{

        const res = await LoginRequest(login);
        if(res.status === 401) {
            setErrorLog(res.message);
            setSuccess('');
            console.log(res.message);
        } else if (res.status === 201) {
            setSuccess( res.message);
            setErrorLog('');
            console.log(res.message);
        }
        console.log(res.message);
    }catch (err) {
        setErrorLog("Erreur Interne, Réésayez ou contactez le support");
        console.log(err);
    }finally{
      setIsLoading(false);
      router.push('/vendeur');
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
    setLogin({ ... login,
        [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background  text-foreground transition-colors duration-300 p-4 font-sans">
      <div className="absolute top-5 right-5">
        <Button 
          onClick={toggleTheme}
          variant="ghost"
        >
          {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Logo et Titre */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center shadow-lg border">
            <span className="text-red-600 text-3xl font-bold">ans</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ORION</h1>
            <p className="text-sm text-muted-foreground">Portail Employé</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-card p-8 rounded-2xl shadow-lg border w-full">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Connexion</h2>
          
          {errorLog && (
            <p className="bg-destructive/15 text-destructive p-3 rounded-lg text-center text-red-500 text-sm mb-4">
              {errorLog}
            </p>
          )}
          {success && (
            <p className="bg-destructive/15 text-destructive p-3 rounded-lg text-center text-green-500 text-sm mb-4">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input 
                type="text"
                name='pseudo'
                value={login.pseudo} 
                onChange={handleChange} 
                className="w-full p-3 bg-muted border rounded-lg focus:ring-2 focus:ring-primary" 
                placeholder="Matricule" 
                required 
              />
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name='password'
                value={login.password} 
                onChange={handleChange} 
                className="w-full p-3 bg-muted border rounded-lg focus:ring-2 focus:ring-primary pr-10" 
                placeholder="Mot de passe" 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-0 px-3 text-muted-foreground"
                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <Button 
                isLoading={isLoading}
                type="submit" className="w-full py-3" icon={<LogInIcon />}>
              { !isLoading && 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}