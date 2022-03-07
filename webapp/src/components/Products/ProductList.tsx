import React, { useState, useEffect } from "react";
import axios from'axios';
import {Product} from '../../shared/shareddtypes';
import  {getProducts} from '../../api/api';
import Card from '@mui/material/Card';
import ProductItem from "./ProductItem";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ProductList(){

    const [products, setProducts] = useState<Product[]>([])

    const refreshProductList = async () => {
        setProducts(await getProducts());
    }
    
    useEffect(() =>{
        refreshProductList();
    },[]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {products.map(product => {
                    return <ProductItem product={product}/>
                })}
            </Grid>
        </Box>

    )

}

export default ProductList