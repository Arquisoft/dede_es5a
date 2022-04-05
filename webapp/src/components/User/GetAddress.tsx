import {
    getSolidDataset, getStringNoLocale, getThing, Thing, getUrl
} from "@inrupt/solid-client";

import Grid from "@mui/material/Grid";

import {VCARD} from "@inrupt/lit-generated-vocab-common";
import React, {useEffect} from "react";

type Props = {
  webID: string;
}

 async function userAddress(webID: string): Promise<string[]> {
    let profileDocumentURI = webID.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, webID)
    let hasAddress = getUrl(profile as Thing, VCARD.hasAddress) as string
    let userAddress = getThing(myDataSet, hasAddress)

    let street_address= getStringNoLocale(userAddress as Thing, VCARD.street_address) as string
    let locality= getStringNoLocale(userAddress as Thing, VCARD.locality) as string
    let postal_code= getStringNoLocale(userAddress as Thing, VCARD.postal_code) as string
    let region= getStringNoLocale(userAddress as Thing, VCARD.region) as string
    let country= getStringNoLocale(userAddress as Thing, VCARD.country_name) as string;
    let address=[street_address,locality,postal_code,region,country]
    return address
  }
function GetUserAddress({webID}: Props): JSX.Element  {

  const [address, setAddress] = React.useState<string[]>([]);
  const getAddress = async () => setAddress(await userAddress(webID))

      useEffect(() => {
        getAddress();
      })

      return (
        <>        
          
              <h3 style={{textAlign: 'left', margin: 1}}>Address:</h3>
              {address[0] === undefined ? (
                <div>      
                  <span style={{margin: 1}}>The user has no address</span>         
                </div>
              ):(
                <><Grid container>
                  <p style={{margin: 1 }}>{address[0]}, {address[2]}</p>
                </Grid><Grid container>
                    <p style={{ margin: 0 }}>{address[1]}, ({address[3]})</p>
                  </Grid><Grid container>
                    <p style={{ textAlign: 'center', margin: 0 }}>{address[4]}</p>
                  </Grid></>   
              )}
          
        </>
      );
  }


export default GetUserAddress;