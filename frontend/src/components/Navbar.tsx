import {Link} from "react-router-dom";
import {FaOpencart} from "react-icons/fa";
import {useContext} from "react";
import {IShopContext, ShopContext} from "../context/shop-context.tsx";
import {useCookies} from "react-cookie";

export const Navbar = () => {

    const {availableMoney, isAuthenticated, setIsAuthenticated} = useContext<IShopContext>(ShopContext)

    const [, setCookies] = useCookies(['access_token']);

    const logout = () => {
        setCookies('access_token', null);
        setIsAuthenticated(false);
    }
    return (

        <nav className="bg-blue-400">
            <div className="navbar font-bold text-white container mx-auto flex sm:flex-row flex-col py-4 justify-between">
                <div className="font-bold text-xl text-center sm:mb-0 mb-5">Shop App</div>
                <div className="links flex sm:gap-5 gap-2 justify-center">
                    {isAuthenticated && <>
                        <Link to="/" className="btn relative inline-flex md:px-5 px-2 md:py-1 items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">

                                <span
                                    className="w-56 h-48 rounded bg-[#60A5FA]/90  absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span><span
                                className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Shop</span>

                        </Link>
                        <Link  to="/purchased-items" className="btn relative inline-flex md:px-5 px-2 md:py-1 items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"> <span
                            className="w-56 h-48 rounded bg-[#60A5FA]/90  absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span><span
                            className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Purchase</span></Link>
                        <Link to="/checkout" className="btn relative inline-flex md:px-5 px-2 md:py-1 items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"> <span
                            className="w-56 h-48 rounded bg-[#60A5FA]/90  absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span><span
                            className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white"><div className=" flex gap-2 justif-center items-center">Cart <FaOpencart/></div></span></Link>
                        <Link to='/auth' className="btn relative inline-flex md:px-5 px-2 md:py-1 items-center justify-start overflow-hidden font-medium transition-all bg-red-200 rounded hover:bg-red-600 group" onClick={logout}><span
                            className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Logout</span></Link>
                        <div className="sm:flex flex-col  hidden">
                            <span className="text-[11px]">Available Money</span><span className="text-xs text-center" >${availableMoney.toFixed(2)}</span></div>
                    </>}
                </div>

            </div>
        </nav>
    )
}