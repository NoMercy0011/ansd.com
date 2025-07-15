
import LovaFooter from "@/src/components/LovaFooter"
import LovaLogo from "@/src/components/LovaLogo"
import RegisterForm from "@/src/features/register/RegisterForm"

export default async function Register(){
   

    return (
        <div className="m-auto max-w-[80%] w-full border border-gray-200 rounded shadow">
    
            <LovaLogo position={"m-0"} background="bg-gray-300" />
    
            <RegisterForm />
            
            <LovaFooter />
        </div>)
}