import { Grid } from '@mui/material'
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props{
    products:Product[];
}

const ProductList = (props:Props) => {
  return (
    <Grid container spacing={4}>
        
        {props.products.map((product:any)=>{
  return <Grid item xs={4}>
          <ProductCard product={product} key={product.id} ></ProductCard>
          </Grid>
        })}
        
    </Grid>
  )
}

export default ProductList