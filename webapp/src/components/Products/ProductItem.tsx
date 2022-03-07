import React from "react";
import {Product} from '../../shared/shareddtypes';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


interface Props {
    product: Product
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ProductItem({product}:Props){

    return (
        <Grid item xs={3}>
            <Item>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
            </Item>
        </Grid>
    )

}


export default ProductItem