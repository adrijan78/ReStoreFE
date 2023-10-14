import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home/HomePage";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import AboutPage from "../../features/About/AboutPage";
import ContactPage from "../../features/Contact/ContactPage";

export const router = createBrowserRouter([
    {path:'/',element:<App/>,children:[
        {index:true,element:<HomePage/>},
        {path:'catalog',element:<Catalog/>},
        {path:'catalog/:id',element:<ProductDetails/>},
        {path:'about',element:<AboutPage/>},
        {path:'contact',element:<ContactPage/>},
    ]}
])