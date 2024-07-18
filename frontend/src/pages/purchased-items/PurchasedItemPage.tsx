import {IShopContext, ShopContext} from "../../context/shop-context.tsx";
import {useContext} from "react";

export const PurchasedItemsPage = () => {

    const {purchasedItems, addToCart, getCartItemCount} = useContext<IShopContext>(ShopContext)
    return (
        <div className="container flex flex-col">
            <h1 className="text-2xl my-10">Purchased items</h1>
            <div className="flex flex-wrap gap-5">
                {purchasedItems.map((item) => {

                    const count = getCartItemCount(item._id)
                    return (

                        <div key={item._id} >
                            <div className="flex flex-col justify-center pb-3 sm:max-w-[270px] h-full max-w-full text-gray-500  bg-white rounded-lg shadow">
                                <div
                                    className=" flex">
                                    <a href="#">
                                        <img className="p-2 rounded-t-lg" src={item.imageURL}
                                             alt="product image"/>
                                    </a>
                                    <div className="p-5 items-center w-full">
                                        <a href="#">
                                            <h5 className="text-lg font-semibold tracking-tight text-gray-900 text-nowrap">{item.productName}</h5>
                                        </a>
                                        <div className="flex items-center mt-2.5 mb-5">
                                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                 ${item.price}

                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">


                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto border-t border-gray-200 pt-5">
                                    <button className="btn w-full border text-center relative inline-flex md:px-5 px-2 md:py-1 items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group" onClick={() => addToCart(item._id)}><span
                                        className="w-56 h-48 rounded bg-[#60A5FA]/90  absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span><span
                                        className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Purchase
                                        Again {count > 0 && <> ({count}) </>}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}