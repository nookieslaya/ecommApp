import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useGetToken} from "./useGetToken.ts";
import {IProduct} from "../models-interface/interfaces.ts";
import {IShopContext, ShopContext} from "../context/shop-context.tsx";

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const {headers} = useGetToken()
    const {isAuthenticated} = useContext<IShopContext>(ShopContext)
    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get('http://localhost:3000/products', {headers})
            setProducts(fetchedProducts.data.products)
        } catch (err) {
            alert("somethin went wrong")
        }
    }
    useEffect(() => {
        if(isAuthenticated) {
            fetchProducts()
        }
    }, [isAuthenticated])


    return {products}
}

