import { useEffect, useState } from 'react'
import { Product } from '../../app/models/product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

const Catalog = (props:any) => {

    const [products, setProducts] = useState<Product[]>([]);
    const[loading,setLoading]=useState(true);

    useEffect(() => {
        agent.Catalog.list().then(products=>setProducts(products))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false));
    }, [])

    if(loading)return<LoadingComponent message='Loading products...'/>

  return (
    <>
    <ProductList products={products} />
    {/* <Button>Add Product</Button> */}
    </>
  )
}

export default Catalog