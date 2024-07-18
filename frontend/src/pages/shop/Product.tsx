import {IProduct} from "../../models-interface/interfaces.ts";
import {useContext} from "react";
import {IShopContext, ShopContext} from "../../context/shop-context.tsx";

interface Props {
    product: IProduct
}

export const Product = (props: Props) => {

    const {_id, productName, price, description, imageURL, stockQuantity} = props.product
    const {addToCart, getCartItemCount} = useContext<IShopContext>(ShopContext)
    const count = getCartItemCount(_id)
    console.log(count)

    return (


        <div key={_id}
             className="w-full text-gray-500 max-w-sm bg-white rounded-lg shadow ">

            <img className="p-8 rounded-t-lg" src={imageURL}
                 alt="product image"/>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">{productName}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    </div>
                    <span
                        className="text-xs font-semibold  py-0.5 rounded ">{description}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">${price}</span>
                    <button onClick={() => addToCart(_id)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        to cart {count > 0 && <span>({count})</span>}</button>
                </div>
                <span
                    className=" text-white text-xs font-semibold  py-0.5 rounded ">Stock: {stockQuantity > 0 ? stockQuantity : stockQuantity === 0 &&
                    <div>Out of Stock</div>}</span>
            </div>
        </div>

    )
}