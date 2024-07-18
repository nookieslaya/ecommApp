import {useState,SyntheticEvent, useContext} from "react";
import axios from "axios";
import {UserErrors} from "../../models-interface/errors.ts";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {IShopContext, ShopContext} from "../../context/shop-context.tsx";


export const AuthPage = () => {
    return (
        <div className="flex container mx-auto">
            <Register/>
            <Login/>
        </div>
    )
}


const Register = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const notify = () => {
        toast({
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            // transition: Bounce,
        });
    };


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            await axios.post('https://ecommapp-ugqj.onrender.com/user/register', {username, password})
            toast.success('Register succesfully',);
        } catch (e) {
            if (e.response.data.type === UserErrors.USERNAME_ALREADY_EXIST) {

                toast.error('Username already exists',);

            } else {
                toast.error('An error occurred',);
            }
        }
    }


    return (

        <section className="h-screen w-full mx-auto">
            <ToastContainer/>

            <div className="h-full container mx-auto">

                <div
                    className="flex h-full flex-wrap items-center justify-center lg:justify-between">


                    <div className="mb-12 md:mb-0 mx-auto">
                        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                        <form className="border border-gray-200 p-10 rounded-2xl" onSubmit={handleSubmit}>


                            <div className="relative mb-6">
                                <label
                                    htmlFor="username"
                                    className="mb-4 text-xs font-bold uppercase text-gray-500"
                                >User Name
                                </label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    type="text"
                                    className="peer text-black block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear border border-gray-200"
                                    id="username"
                                    placeholder="User Name"/>
                            </div>
                            <div className="relative mb-6">
                                <label
                                    htmlFor="password"
                                    className="mb-4 text-xs font-bold uppercase text-gray-500"
                                >Password
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    className="peer text-blackblock min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear  focus:placeholder:opacity-100 peer-focus:text-black data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:autofill:shadow-autofill dark:peer-focus:text-black border border-gray-200"
                                    id="password"
                                    placeholder="Password"/>
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    onClick={notify}
                                    type="submit"
                                    className="inline-block bg-red-300 w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"

                                    data-twe-ripple-color="light">
                                    Register
                                </button>


                                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                    Have an account?
                                    <a
                                        href="#!"
                                        className="ml-2 text-danger text-black transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                    >Login</a
                                    >
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


const Login = () => {


    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [, setCookies] = useCookies(["access_token"])
    const {setIsAuthenticated} = useContext<IShopContext>(ShopContext)

    const notify = () => {
        toast({
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            // transition: Bounce,
        });
    };


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const result = await axios.post('https://ecommapp-ugqj.onrender.com/user/login', {username, password})
            toast.success('Login succesfully',);
            setCookies('access_token', result.data.token)

            window.localStorage.setItem("userID", result.data.userID);
            console.log(result.data.userID)
            setIsAuthenticated(true)
            navigate("/")
        } catch (e) {

            let errorMEssage: string = ''

            switch (e.response.data.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMEssage = 'User doesnt exist';
                    break
                case UserErrors.WRONG_CREDENTIALS:
                    errorMEssage = 'Wrong username or password';
                    break
                default:
                    errorMEssage = "something went wrong"
            }
            toast.error(errorMEssage);
        }
    }


    const navigate = useNavigate()
    return (

        <section className="h-screen w-full mx-auto">
            <ToastContainer/>

            <div className="h-full container mx-auto">
                <div
                    className="flex h-full flex-wrap items-center justify-center lg:justify-between">


                    <div className="mb-12 md:mb-0 mx-auto">
                        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                        <form className="border border-gray-200 p-10 rounded-2xl" onSubmit={handleSubmit}>


                            <div className="relative mb-6">
                                <label
                                    htmlFor="username"
                                    className="mb-4 text-xs font-bold uppercase text-gray-500"
                                >User Name
                                </label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    type="text"
                                    className="peer text-black block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear border border-gray-200"
                                    id="username"
                                    placeholder="User Name"/>
                            </div>
                            <div className="relative mb-6">
                                <label
                                    htmlFor="password"
                                    className="mb-4 text-xs font-bold uppercase text-gray-500"
                                >Password
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    className="peer text-blackblock min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear  focus:placeholder:opacity-100 peer-focus:text-black data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:autofill:shadow-autofill dark:peer-focus:text-black border border-gray-200"
                                    id="password"
                                    placeholder="Password"/>
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    onClick={notify}
                                    type="submit"
                                    className="inline-block bg-red-300 w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"

                                    data-twe-ripple-color="light">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}