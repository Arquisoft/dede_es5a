import {getSolidDataset, getStringNoLocale, getThing, Thing, getUrl, getUrlAll, getThingAll} from "@inrupt/solid-client";

import Grid from "@mui/material/Grid";

import {VCARD} from "@inrupt/lit-generated-vocab-common";
import React, {useEffect} from "react";

type Props = {
  webID: string;
}

 async function userAddress(webID: string): Promise<string[][]> {
    let profileDocumentURI = webID.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, webID)
    let hasAddress = getUrlAll(profile as Thing, VCARD.hasAddress) as string[]
    
    var direccion = new Array(hasAddress.length);
    for(let i=0;i<hasAddress.length;i++){
      direccion[i]=new Array(5);
    }
    for(let i=0;i<hasAddress.length;i++){
      let addressOfTheUser = getThing(myDataSet, hasAddress[i])
      direccion[i][0] =getStringNoLocale(addressOfTheUser as Thing, VCARD.street_address) as string || undefined
      direccion[i][1]=getStringNoLocale(addressOfTheUser as Thing, VCARD.locality)as string || undefined
      direccion[i][2]=getStringNoLocale(addressOfTheUser as Thing, VCARD.postal_code)as string || undefined
      direccion[i][3]=getStringNoLocale(addressOfTheUser as Thing, VCARD.region)as string || undefined
      direccion[i][4]=getStringNoLocale(addressOfTheUser as Thing, VCARD.country_name)as string || undefined
    }

    return direccion
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
                <h4 style={{margin:1}}>Addres {index+1}:</h4>
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