import { useEffect } from 'react'
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productsSelectors } from './catalogSlice';

const Catalog = (props:any) => {

    const products =useAppSelector(productsSelectors.selectAll)
    const dispatch = useAppDispatch();
    const {productsLoaded,status} = useAppSelector(state=>state.catalog);

    useEffect(() => {
        if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded,dispatch])

    if(status.includes("pending"))return<LoadingComponent message='Loading products...'/>

  return (
    <>
    <ProductList products={products} />
    {/* <Button>Add Product</Button> */}
    </>
  )
}

export default Catalog