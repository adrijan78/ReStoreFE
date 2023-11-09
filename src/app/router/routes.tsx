import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home/HomePage";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import AboutPage from "../../features/About/AboutPage";
import ContactPage from "../../features/Contact/ContactPage";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/Basket/BasketPage";
import Register from "../../features/Account/Register";
import Login from "../../features/Account/Login";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/Orders/Orders";
import CheckoutWrapper from "../../features/CheckOut/CheckoutWrapper";

export const router = createBrowserRouter([
    
    
        {path:'/',element:<App/>,children:[

        {index:true,element:<HomePage/>},
        {element:<RequireAuth/> ,children:[
                {path:'checkout',element:<CheckoutWrapper/>},
                {path:'orders',element:<Orders/>},
        ]},
        {path:'catalog',element:<Catalog/>},
        {path:'catalog/:id',element:<ProductDetails/>},
        {path:'about',element:<AboutPage/>},
        {path:'contact',element:<ContactPage/>},
        {path:'not-found',element:<NotFound/>},
        {path:'basket',element:<BasketPage/>},  
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'*',element:<Navigate to="/not-found"/>},
    ]}
])