import { useEffect } from 'react'
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, fetchProductsAsync, productsSelectors, setProductParams } from './catalogSlice';
import { Grid, Paper } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../app/components/UI/RadioButtonGroup';
import CheckBoxButtons from '../../app/components/UI/CheckBoxButtons';
import AppPagination from '../../app/components/UI/AppPagination';



const sortOptions=[
  {value:'name', label:'Alphabetical'},
  {value:'priceDesc', label:'Price - High to Low'},
  {value:'price', label:'Price - Low to High'},
];




const Catalog = () => {

    const products =useAppSelector(productsSelectors.selectAll)
    const dispatch = useAppDispatch();
    const {productsLoaded,filtersLoaded,brands,types,productParams} = useAppSelector(state=>state.catalog);

    useEffect(() => {
        if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded,dispatch])

    useEffect(()=>{
      if(!filtersLoaded) dispatch(fetchFilters())
    },[dispatch,filtersLoaded])

    if(!filtersLoaded)return<LoadingComponent message='Loading products...'/>

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb:2}}>
           <ProductSearch/>
        </Paper>
        <Paper sx={{mb:2, p:2}}>
          <RadioButtonGroup 
          options={sortOptions}
           onChange={e=>dispatch(setProductParams({orderBy:e.target.value}))} 
           selectedValue={productParams.orderBy}/>
        </Paper>
        <Paper sx={{mb:2, p:2}}>
          <CheckBoxButtons 
            items={brands}
            checked={productParams.filterByBrand}
            onChange={(items:string[])=>dispatch(setProductParams({filterByBrand:items}))}
          />
        </Paper>

        <Paper sx={{mb:2, p:2}}>
        <CheckBoxButtons 
            items={types}
            checked={productParams.filterByType}
            onChange={(items:string[])=>dispatch(setProductParams({filterByType:items}))}
          />
        </Paper>

      </Grid>
      <Grid item xs={9}>
      <ProductList products={products} />
      </Grid>

      <Grid item xs={3}>

      </Grid>
      <Grid item xs={9} sx={{mb:3}}>
        <AppPagination productParams={productParams} 
        onPageChange={(page:number)=>dispatch(setProductParams({pageNumber:page}))}/>
      </Grid>
    
    
    </Grid>
  )
}

export default Catalog