
import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../hooks/useStoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
   const {setBasket} = useStoreContext();
   const [loading,setLoading]=useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket=>setBasket(basket))
      .catch(err=>console.log(err))
      .finally(()=>setLoading(false))
    }
    else{
      setLoading(false)
    }
  },[setBasket])



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


