import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import './App.css'
import {ShopPage} from "./pages/shop/ShopPage.tsx";
import {AuthPage} from "./pages/auth/AuthPage.tsx";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.tsx";
import {PurchasedItemsPage} from "./pages/purchased-items/PurchasedItemPage.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ShopContextProvider} from "./context/shop-context.tsx";
function App() {
  
	return (
		<div className="App">
			<Router>
				<ShopContextProvider>
			<Navbar/>
					<div className="gap-5 mt-20 container mx-auto">
				<Routes>
					<Route path="/" element={<ShopPage/>} />
					<Route path="/auth" element={<AuthPage/>}/>
					<Route path="/checkout" element={<CheckoutPage/>}/>
					<Route path="/purchased-items" element={<PurchasedItemsPage/>}/>
				</Routes>
					</div>
				</ShopContextProvider>
			</Router>
		</div>
	)
}

export default App
