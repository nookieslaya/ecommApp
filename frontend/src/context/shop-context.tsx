import {createContext, useEffect, useState} from "react";
import {useGetProducts} from "../hooks/useGetProducts.ts";
import {IProduct} from "../models-interface/interfaces.ts";
import {useGetToken} from "../hooks/useGetToken.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export interface IShopContext {
    addToCart: (itemId: string) => void
    removeFromCart: (itemId: string) => void
    updateCartItemCount: (itemId: string, newAmount: number) => void
    getCartItemCount: (itemId: string) => number
    getTotalCartAmount: () => number
    checkout: () => void
availableMoney: number
    purchasedItems: IProduct[]
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

const defaultVal: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    updateCartItemCount: () => null,
    getCartItemCount: () => 0,
    getTotalCartAmount: () => 0,
    checkout: () => null,
  availableMoney: 0,
    purchasedItems: [],
    isAuthenticated: false,
    setIsAuthenticated: () => null,

}

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [cartItems, setCartItems] = useState<{ string: number } | {}>({}); // { itemID: amount }
    const [availableMoney, setAvailableMoney] = useState<number>(0);
    const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        cookies.access_token !== null
    );
    const navigate = useNavigate()
    const {products} = useGetProducts()
    const {headers} = useGetToken()

    const fetchAvailableMoney = async () => {
        const res = await axios.get(
            `https://ecommapp-ugqj.onrender.com/user/available-money/${localStorage.getItem(
                "userID"
            )}`,
            { headers }
        );
        setAvailableMoney(res.data.availableMoney);
    };
    const fetchPurchasedItems = async () => {
        const res = await axios.get(
            `https://ecommapp-ugqj.onrender.com/products/purchased-items/${localStorage.getItem(
                "userID"
            )}`,
            { headers }
        );

        setPurchasedItems(res.data.purchasedItems);
    };

    const getCartItemCount = (itemId: string): number => {
        if (itemId in cartItems) {
            return cartItems[itemId];
        }

        return 0;
    };

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}));
        } else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        }
    };
    const removeFromCart = (itemId: string) => {
        if (!cartItems[itemId]) return;
        if (cartItems[itemId] == 0) return;
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    }
    const updateCartItemCount = (itemId: string, newAmount: number) => {
        if (newAmount < 0) return;
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    }
    const getTotalCartAmount = () => {
        if (products.length === 0) return 0;

        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo: IProduct = products.find(
                    (product) => product._id === item
                );

                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    };

    const checkout = async () => {

        const body = {customerID: localStorage.getItem("userID"), cartItems}

        try {
            await axios.post("https://ecommapp-ugqj.onrender.com/products/checkout", body, {headers});
           setCartItems({})
            fetchPurchasedItems()
            fetchAvailableMoney()
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
useEffect(() => {
    if(isAuthenticated) {
        fetchAvailableMoney()
        fetchPurchasedItems()
    }
},[isAuthenticated])
    useEffect(() => {
        if(!isAuthenticated) {
            localStorage.clear
            setCookies('access_token', null);
        }
    }, []);

    const contextValue: IShopContext = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        getTotalCartAmount,
        checkout,
       availableMoney,
        purchasedItems,
        isAuthenticated,
        setIsAuthenticated,
    }


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
