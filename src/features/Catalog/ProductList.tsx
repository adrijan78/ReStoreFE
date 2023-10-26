import { Grid } from '@mui/material'
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductCardSceleton';

interface Props{
    products:Product[];
}

const ProductList = (props:Props) => {
  const {productsLoaded}=useAppSelector(state=>state.catalog)
  return (
    <Grid container spacing={4}>
        
        {props.products.map((product:any)=>{
  return <Grid item  key={product.id} xs={4}>
        {!productsLoaded?(<ProductCardSkeleton/>):(<ProductCard product={product} ></ProductCard>)}
          
          </Grid>
        })}
        
    </Grid>
  )
}

export default ProductList