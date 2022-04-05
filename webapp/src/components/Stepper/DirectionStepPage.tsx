import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getShippingPrice } from '../../api/api';
import { Address } from '../../shared/shareddtypes';


const columns: GridColDef[] = [
  { field: 'number', headerName: 'Number', width: 70 },
  { field: 'street', headerName: 'Street', width: 500 },
  { field: 'city', headerName: 'City', width: 130 },
  {
    field: 'country',
    headerName: 'Country',
    type: 'number',
    width: 90
  },
  {
    field: 'zipcode',
    headerName: 'Zipcode',
    width: 90
  }
];



const rows:Address[] = [
  {  id: 1, number: 1, street: 'Calle Valdés Salas', city: 'Oviedo', country: 'España', zipcode:'33007'},
  { id: 2, number: 2, street: 'Calle Uría', city: 'Oviedo', country: 'España', zipcode:'33003'},
  { id: 3, number: 60, street: 'Calle Rosal', city: 'Oviedo', country: 'España', zipcode:'33009'},
];





export default function DirectionStepPage() {
  const [shippingPrice, setShippingPrice] = useState<number>(999.99)
  const refreshShippingPrice = async () => {
    let value = await getShippingPrice(selectedRows[0]);

    setShippingPrice(value.shippingPrice)
  }
  const [selectedRows, setSelectedRows] = useState<Address[]>([]);

  const firstRender = useRef(true);

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
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row.id)
            
          );

          setSelectedRows(selectedRows);
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