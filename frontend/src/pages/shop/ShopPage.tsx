import {useGetProducts} from "../../hooks/useGetProducts.ts";
import {Product} from "./Product.tsx";
import {useContext} from "react";
import {IShopContext, ShopContext} from "../../context/shop-context.tsx";
import {Navigate} from "react-router-dom";

export const ShopPage = () => {

    const {products} = useGetProducts()
    const {isAuthenticated} = useContext<IShopContext>(ShopContext)
    if(!isAuthenticated){
        return <Navigate to="/auth"/>
    }
    return (
        <div>
            <div className="container w-full flex flex-wrap justify-center items-center flex-row gap-3">
                {products.map(product => (
                    <Product product={product} key={product._id}/>
                ))}
            </div>
        </div>
    )
}