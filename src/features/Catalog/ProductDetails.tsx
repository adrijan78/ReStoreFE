import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/product';

const ProductDetails = () => {

  const [product,setProduct]=useState<Product|null>(null)
  const [loader,setLoader]=useState(true)
  
  const {id}=useParams<{id:string}>();

  useEffect(()=>{
    const fetchData = async ()=>{

      try {
        await axios.get("http://localhost:5000/api/products/"+id).then(res=>{
        setProduct(res.data);
        console.log("Product founded");
      })
      } catch (err) {
       console.log(err)
      }
    }

    fetchData();
    setLoader(false)

    },[id])
   

  if(loader){
    return (
      <h3>Loading....</h3>
    )
  }

  if(!product){
    console.log("If statement for products");
    return (
      <h3>Product not found</h3>
    )
  }



  return (
    <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
  )
}

export default ProductDetails