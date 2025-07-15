'use client'
import { loginAction } from "@/src/actions/auth/login.action";
import { registerAction } from "@/src/actions/auth/register.action";
import { userLoginType, userRegisterType } from "@/src/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm(){
    const router = useRouter();
    const [userRegister, setUserRegister] = useState<userRegisterType> ({
      etablissement : '',
      contact: '',
      schoolEmail: '',
      email : '',
      nom : '',
      prenom: '',
      sexe: 'M',
      password : '',
      passwordConfirm : '',
      cisco: '',
      dren: '',
    })
    const [error, setError] = useState <string | null>('');
    const [success, setSuccess] = useState <string | null>('');

    const handleChange = (e) => {
      setUserRegister({
        ...userRegister, 
        [e.target.name] : e.target.value})
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const response = await registerAction(userRegister);
        if(!response.success){
          setError(response.error!);
          setSuccess('');
        } else {
          setError('');
          setSuccess(response.message!);
        }
        const loginpayload : userLoginType = {
          email : userRegister.email, 
          password: userRegister.password}
        loginAction(loginpayload)
        router.push('/moderator');
      }catch (error) {
          setError("Erreur, Veuillez réessayer s'il vous plait")
          console.log(error)
      }

    } 
    return (
        <div className="m-1">
        <form onSubmit={handleSubmit} className='text-start w-full m-auto px-12 py-5'>
            <div className='text-blue-500 font-bold text-xl'> Créer votre compte Lova</div>
              {error && <p className="text-red-600 text-sm text-center"> &apos;&apos; {error} &apos;&apos;</p> }
              {success && <p className="text-green-700 text-sm text-center"> &apos;&apos; {success} &apos;&apos;</p> }
              <div className="inline-grid lg:grid-cols-2">
              <div className='inline-block m-2 p-4 text-blue-500 text-md py-5  border-gray-900 shadow rounded'>
              Votre Etablissement        
              <div className="relative mb-3 mt-3">
                  <input
                    type="text"
                    required
                    name='etablissement'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="nom d' etablissement" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Nom d&apos; établissement </label>
              </div>
              <div className="relative mb-3 mt-3">
                  <input
                    type="text"
                    required
                    name='contact'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="contact" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Telephone de l&apos; établissement </label>
              </div>
              <div className="relative mb-3 mt-3">
                  <input
                    type="text"
                    required
                    name='schoolEmail'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="etablissement" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Email de l&apos; établissement </label>
              </div>
              <div className="relative mb-3 mt-3">
                  <input
                    type="text"
                    name='cisco'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="CISCO" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    > CISCO </label>
              </div>
              <div className="relative mb-3 mt-3">
                  <input
                    type="text"
                    name='dren'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="DREN" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    > DREN </label>
              </div>
            </div>
            <div className='inline-block m-2 p-4 text-blue-500 text-md py-5  border-gray-900 shadow rounded'> 
                Vos informations
              <div className="relative mb-3 mt-3">
                  <input
                    type="text"
                    required
                    name='nom'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="Nom" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Nom  </label>
                </div>
                <div className="relative mb-3">
                  <input
                    type="text"
                    required
                    name='prenom'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="Prenom" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Prénom</label>
                </div>
                <div className="px-3 relative mb-3 border border-gray-400 rounded">
                  <label htmlFor="sexe" className='text-sm text-gray-500'> * Sexe : 
                    <select name="sexe" aria-required onChange={handleChange} className='text-gray-500 outline-0 focus:shadow border-blue-900 w-[80%] p-2'>
                      <option value="M" > Masculin</option>
                      <option value="F"> Féminin</option>
                    </select>
                  </label>
                </div>

                <div className="relative mb-3">
                  <input
                    type="email"
                    required
                    name='email'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
              onChange = {handleChange}
                    placeholder="email" />
                  <label
                    htmlFor="floatingEmail"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Votre telephone / adresse email </label>
                </div>

                <div className="relative mb-3">
                  <input
                    type="password"
                    required
                    name='password'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-500 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
                    onChange = {handleChange}
                    placeholder="Password" />
                  <label
                    htmlFor="floatingPassword"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Votre mot de passe</label>
                </div>
                <div className="relative mb-3">
                  <input
                    type="password"
                    required
                    name='passwordConfirm'
                    className="peer m-0 block h-[8vh] lg:w-sm md:w-sm sm:w-sm rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-gray-700 dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] focus:shadow focus:border-blue-600"
                    onChange = {handleChange}
                    placeholder="passwordConfirm" />
                  <label
                    htmlFor="floatingPassword"
                    className="pointer-events-none absolute text-sm left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >* Confirmer votre mot de passe</label>
                </div>
            
                </div>
                <div className='my-5 mx-8 text-gray-500 text-sm'> tous les champs avec * sont obligatoire  </div>
              </div>
            <div className='inline-flex justify-end w-full mx-1'>
                <Link href={"/login"} className="mx-5 px-5 bg-gray-200 p-3 rounded-xl border border-black text-sm font-light hover:bg-gray-500 hover:text-gray-50">
                <button type='reset' className="cursor-pointer"> ANNULER </button>
                </Link>
                <button type='submit' className="bg-red-800 p-3 rounded-xl px-5 mx-0 text-gray-200 text-sm font-light hover:bg-red-700 cursor-pointer">CREER UN COMPTE</button>
            </div>
            
        </form>
        </div>
    )
}