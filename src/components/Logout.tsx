import logoutAction from "../actions/auth/logout.action";

export default async function Logout(){

    return (
        <>
            <button onClick={logoutAction} className="text-sm font-semibold text-red-500 dark:text-red-500 hover:underline">
                Deconnexion
            </button>
        </>
    )
}