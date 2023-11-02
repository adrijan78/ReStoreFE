
import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchbasketsAsync } from "../../features/Basket/basketSlice";
import { fetchCurrentUser } from "../../features/Account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  //  const {setBasket} = useStoreContext();
   const [loading,setLoading]=useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';



  const initApp = useCallback(async()=>{
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchbasketsAsync());
    }catch(error){
      console.log(error)
    }
  },[dispatch])


  useEffect(()=>{
    initApp().then(_=>{setLoading(false)})
  },[initApp])



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
        <CssBaseline/>
       <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
       <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
       <Container>
       <Outlet/>
    </Container>
    </ThemeProvider>


   
    
  );
}

export default App;


