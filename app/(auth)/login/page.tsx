"use client"

import Legendes from "@/src/components/Legendes";
import { useEffect, useState } from "react";
import { loginAction } from "@/src/actions/auth/login.action";
import { useRouter } from "next/navigation";
import getCookiesAction from "@/src/actions/auth/get.cookies.action";
import { responseType, userLoginType } from "@/src/types/type";
import LovaLogo from "@/src/components/LovaLogo";
import LovaFooter from "@/src/components/LovaFooter";
import Link from "next/link";


export default function Login() {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState<userLoginType> ({
    email: '',
    password: '',
  })
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getToken = async () => {

    const response = await getCookiesAction() as responseType;
    if (response.success) {
      router.push(String(response.redirectTo));
    }
  } 
  
  useEffect(() => {
    getToken();
  }, []);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({...userLogin, 
      [e.target.name] : e.target.value
    })
  }
  const handleLogin = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        const response = await loginAction({...userLogin}) as responseType;

        if (! response.success) {
          setSuccess('')
          setError(response.error!);
        }else {
          
          setSuccess(response.message!);
          setError('');
          console.log('redirection :' , response.redirectTo)
          router.push(String(response.redirectTo));
        }

      }catch{
        setError('Erreur inatendu');
        }
      }
  return (
    <>
    <div className="m-0 p-0 h-full max-w-120 border border-gray-200 rounded shadow text-center text-md">
        
        <LovaLogo position="m-auto" background="bg-white" />

        <div className="mb-3">
        <Legendes />
        </div>
        { error && <div className="text-red-700 pb-2">{ error } </div> }
        { success && <div className="text-green-700 pb-2">{ success } </div> }
        <div className="">
        <form onSubmit ={ handleLogin} className="">
          <div className="relative mb-3 h-[10vh]">
            <input
              type="email"
              required
              onChange={handleChange}
              name="email"
              className="peer m-auto block max-h-[8vh] min-h-[5vh]  md:w-md sm:w-sm rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-2 py-3 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-700 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-[4vh] text-sm top-0 origin-[0_0] border border-solid border-transparent px-2 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
            >
              Email
            </label>
          </div>

          <div className="relative mb-3 h-[10vh]">
            <input
              type="password"
              required
              onChange={handleChange}
              name="password"
              className="peer m-auto block max-h-[8vh] min-h-[5vh]  md:w-md sm:w-sm rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-2 py-3 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-700 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              id="password"
              placeholder="********"
            />
            <label
              htmlFor="floatingPassword"
              className=" text-md pointer-events-none absolute left-[4vh] text-sm top-0 origin-[0_0] border border-solid border-transparent px-2 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
            >
              Mot de passe
            </label>
          </div>
          <div> 
          <button
            type="submit"
            className="my-2 h-11 w-md bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 hover:cursor-pointer"
          >
            Se Connecter
          </button>
          </div>
        </form>
        </div>
        <div className="bg-gray-200 font-sans ">
        <div className="my-3 py-3 border-t-2 ">
            <div className=" contain-content space-x-2 ">
              <label htmlFor="checkbox" className="p-5 m-2 ">
                <input
                  type="checkbox"
                  name="se_souvenir_de_moi"
                  id="checkbox"
                />
                <span className="mx-1">Mémoriser mes informations</span>
              </label>
              <a href="#forgetPassword" className="p-5 text-blue-700 ">
                Mot de passe oublié ?
              </a>
            </div>
          </div>
        <div className="p-1">
          <div className=" inline-grid grid-cols-2 py-2">
            <div className="text-sm"> Pas client ?
            </div>
            <div>
            <Link
              href={"/register"}
              className="px-2 py-2 m-auto w-3xs border text-sm border-gray-700 bg-gray-100 text-gray-600 font-bold  rounded hover:bg-gray-300 hover:cursor-pointer"
            >
              S` inscrire gratuitement
            </Link>
            </div>
          </div>
          <LovaFooter />
        </div>
        </div>
    </div>
    </>
    
  );
}
