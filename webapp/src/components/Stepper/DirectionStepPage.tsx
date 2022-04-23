import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getShippingPrice } from '../../api/api';
import { Address } from '../../shared/shareddtypes';


const columns: GridColDef[] = [
  { field: 'street', headerName: 'Street', width: 400 },
  { field: 'city', headerName: 'City', width: 150 },
  {
    field: 'country',
    headerName: 'Country',
    width: 150
  },
  {
    field: 'zipcode',
    headerName: 'Zipcode',
    width: 150
  }
];

type Props = {
  getSelectedShippingPrice: (price:number) => void;
  addresses: Address[];
}

export default function DirectionStepPage(props: Props) {
  const [rows, setRows] = useState<Address[]>(props.addresses);
  const [shippingPrice, setShippingPrice] = useState<number>(0)
  let defaultAddress:Address[] = new Array<Address>();
  if(!rows[0]){
    defaultAddress.push(rows[0]);
  }
  const [selectedRows, setSelectedRows] = useState<Address[]>(defaultAddress);
  const firstRender = useRef(true);

  const refreshShippingPrice = async () => {
    let price:number = await getShippingPrice(selectedRows[0]).then(value => value.shippingPrice);

    setShippingPrice(price)
    props.getSelectedShippingPrice(price);
  }
  
  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
    }else{
      refreshShippingPrice();
    }
  });
  
  return (
    <Container>
    <Box sx={{ mt: '1.25em', mb: '1.25em' }}>
      <Typography align="center" variant="h5" component="h5">
        Addresses
      </Typography>
    </Box>

    <div style={{ height: 400, width: '100%' }}>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          setSelectedRows(rows.filter((row) => selectedIDs.has(row.id)));
        }}
      />
    </div>

    <Box>
    <Typography align="center" variant="h6" component="h6">
        Shipping price: {firstRender.current ? 'Select an address before': shippingPrice.toFixed(2) + ' €'} 
      </Typography>
    </Box>
    </Container>

  );
}