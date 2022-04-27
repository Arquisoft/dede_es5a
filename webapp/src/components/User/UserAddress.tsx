
import Grid from "@mui/material/Grid";

import React, {useEffect} from "react";
import userAddress from "../../helpers/userAddress";

type Props = {
  webID: string;
}
function GetUserAddress({webID}: Props): JSX.Element  {

  const [address, setAddress] = React.useState<string[][]>([]);
  const getAddress = async () => setAddress(await userAddress(webID))

      useEffect(() => {
        getAddress();
      })
      return (
        <>            
          <h3 style={{textAlign: 'left', margin: 1}}>Address:</h3>
          {address.length === 0 ?(
            <div>      
              <span style={{margin: 1}}>The user has no address</span>         
            </div>
          ):(
            address.map((dir,index) => 
              <>
              <Grid container>
                <h4 style={{margin:1}}>Address {index+1}:</h4>
              </Grid>
              <Grid container>
                <p style={{margin: 1 }}>{dir[0]}, {dir[2]}</p>
              </Grid><Grid container>
                <p style={{ margin: 0 }}>{dir[1]}, ({dir[3]})</p>
              </Grid><Grid container>
                <p style={{ textAlign: 'center', margin: 0 }}>{dir[4]}</p>
              </Grid></>  
            )
          )}     
        </>
      );
  }

export default GetUserAddress;