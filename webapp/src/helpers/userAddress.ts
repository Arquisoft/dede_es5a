import {getSolidDataset, getStringNoLocale, getThing, Thing, getUrlAll} from "@inrupt/solid-client";

import {VCARD} from "@inrupt/lit-generated-vocab-common";

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
      direccion[i][0] =getStringNoLocale(addressOfTheUser as Thing, VCARD.street_address) as string
      direccion[i][1]=getStringNoLocale(addressOfTheUser as Thing, VCARD.locality)as string
      direccion[i][2]=getStringNoLocale(addressOfTheUser as Thing, VCARD.postal_code)as string
      direccion[i][3]=getStringNoLocale(addressOfTheUser as Thing, VCARD.region)as string
      direccion[i][4]=getStringNoLocale(addressOfTheUser as Thing, VCARD.country_name)as string
    }

    return direccion
  }

  export default userAddress