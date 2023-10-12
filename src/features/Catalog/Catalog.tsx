import { useEffect, useState } from 'react'
import { Product } from '../../app/models/product';
import { Button } from '@mui/material';
import ProductList from './ProductList';

const Catalog = (props:any) => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

  return (
    <>
    <ProductList products={products} />
    <Button>Add Product</Button>
    </>
  )
}

export default Catalog