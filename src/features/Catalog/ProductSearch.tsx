import { TextField, debounce } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import {setProductParams } from './catalogSlice';

const ProductSearch = () => {
    const {productParams} = useAppSelector(state=>state.catalog);
    const dispatch = useAppDispatch();
    const [searchT,setSearchT]=useState(productParams.searchTerm)


    const onChangeHandler=(event:any)=>{
      const inputValue=event.target.value;
        setSearchT(inputValue);
        //dispatch(setProductParams({searchTerm:searchT}))
    }

    const debouncedSearch= debounce((event:any)=>{
      dispatch(setProductParams({searchTerm:event.target.value}))
    },1000)


  return (
    <TextField
            label="Search products"
            variant='outlined'
            fullWidth
            value={searchT || ""}
            onChange={(event:any)=>{
              onChangeHandler(event);
              debouncedSearch(event);
            }}
          /> 
  )
}

export default ProductSearch