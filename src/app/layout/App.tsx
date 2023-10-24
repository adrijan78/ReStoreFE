
import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/Basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  //  const {setBasket} = useStoreContext();
   const [loading,setLoading]=useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(err=>console.log(err))
      .finally(()=>setLoading(false))
    }
    else{
      setLoading(false)
    }
  },[dispatch])



  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initializing app..."/>

  return (
       <ThemeProvider theme={theme}>
       <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
       <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
       <Container>
       <Outlet/>
    </Container>
    </ThemeProvider>


   
    
  );
}

export default App;


