import  { PropsWithChildren, useState } from 'react'
import { Basket } from '../models/basket'
import { StoreContext } from './store-context'

export const StoreContextProvider = ({children}: PropsWithChildren<any>) => {
    const [basket,setBasket]= useState<Basket | null>(null);


    const removeItem=(productId:number,quantity:number)=>{
        if(!basket)return;
        const items=[...basket.items];
        const itemIndex = items.findIndex(i=>i.productId ===productId);

        if(itemIndex >=0){
            items[itemIndex].quantity-=quantity;
            if(items[itemIndex].quantity ===0){
                items.splice(itemIndex,1);
                setBasket((prevState)=>{
                    return {...prevState!,items}
                })
            }
        }
    }

  return (
    <StoreContext.Provider value={{basket,setBasket,removeItem}}>{children}</StoreContext.Provider>
  )
}

