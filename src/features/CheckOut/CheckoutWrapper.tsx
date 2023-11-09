import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutPage from './CheckoutPage'
import { loadStripe } from '@stripe/stripe-js'
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { setBasket } from '../Basket/basketSlice';
import { Basket } from './../../app/models/basket';
import LoadingComponent from '../../app/layout/LoadingComponent';

var stripePromise = loadStripe("pk_test_51O9uhgKQFA0OouZQ2NyrE076pfmFlhpil2RncoXq6KVJYcTYGuOgKpqrR3IJOEpElpYmkJCFnUpduIqgABT637Sx009KsPqr0i");

const CheckoutWrapper = () => {
 const dispatch = useAppDispatch();
 const [loading,setLoading]=useState(true);

 useEffect(()=>{
    agent.Payments.createPaymentIntent()
        .then((basket:Basket)=>dispatch(setBasket(basket)))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
 },[dispatch]);


 if(loading) return <LoadingComponent message='Loading checkout...'/>


  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage/>
    </Elements>
  )
}

export default CheckoutWrapper