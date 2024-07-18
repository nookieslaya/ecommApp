import {useGetProducts} from "../../hooks/useGetProducts.ts";
import {IProduct} from "../../models-interface/interfaces.ts";
import {useContext} from "react";
import {ShopContext, IShopContext} from "../../context/shop-context.tsx";
import {CartItem} from "./CartItem.tsx";
import {useNavigate} from "react-router-dom";

export const CheckoutPage = () => {
    const {getCartItemCount, getTotalCartAmount, checkout} = useContext<IShopContext>(ShopContext)
const navigate = useNavigate()
    const totalAmount = getTotalCartAmount()

    const {products} = useGetProducts()

    console.log(totalAmount)
    return (
        <div className="container mx-auto">
            <h1>Your items</h1>
            <div className="cart flex gap-5 flex-wrap justify-center">
                {products.map((product: IProduct) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return <CartItem product={product} key={product._id}/>
                    }
                })}
            </div>

                    <div>
                        <div className="checkout mt-5">
                            {/*<p>Subtotal: ${totalAmount.toFixed(2)}</p>*/}
                        </div>
                        <div className="flex items-center gap-5 my-5">

                            <button onClick={() => {navigate('/')
                            }}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue
                                Shopping
                            </button>

                            <button onClick={checkout}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">checkout
                            </button>
                        </div>
                    </div>

        </div>
    )
}