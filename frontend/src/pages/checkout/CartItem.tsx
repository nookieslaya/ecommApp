import {IProduct} from "../../models-interface/interfaces.ts";
import {useContext} from "react";
import { ShopContext} from "../../context/shop-context.tsx";

interface Props {
    product: IProduct
}
export const CartItem   = (props: Props) => {
    const { _id, productName,  price, imageURL } = props.product;
    const { getCartItemCount, addToCart, removeFromCart, updateCartItemCount } =
        useContext(ShopContext);

    const cartItemCount = getCartItemCount(_id);

    return(
    <div key={_id}
         className="w-full flex text-gray-500 max-w-sm bg-white rounded-lg shadow ">
        <a href="#">
            <img className="p-8 rounded-t-lg" src={imageURL}
                 alt="product image"/>
        </a>
        <div className="p-5 items-center">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">{productName}</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">


                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">${price}</span>

            </div>
        </div>
           <div className="flex flex-col justify-center items-centercount-handler w-[50px]">
               <button onClick={()=> removeFromCart(_id)}>-</button>
               <input type="number" value={cartItemCount} onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}/>
               <button onClick={()=> addToCart(_id)}>+</button>
           </div>
    </div>
)
}