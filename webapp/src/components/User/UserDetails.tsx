import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import {Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import GetAddress from "./GetAddress";
import { getStringNoLocale } from "@inrupt/solid-client";



const ProfileViewer = () => {
  const {session, logout} = useSession();
  const { webId } = session.info as any;

  console.log(VCARD);

  return (
    
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId} >
        <h2>User profile</h2>
          <Container component="main" maxWidth="xs">
            <Box
                  sx={{
                    marginTop: 6,
                    alignItems: 'center',
                    flexDirection: 'column',
                    display: 'inline-flex',
                  }}
              >
                <Grid id="grid1" container spacing={4}>
                <Grid id="grid2" item xs={3}>
                    <Image property={VCARD.hasPhoto.iri.value} 
                      errorComponent={({ error }) => <img src="/images/no-image-profile.png" style={{width: '100%'}}/>}
                      style={{width: '100%'}}
                    /> 
                </Grid>
                <Grid id="grid3 "item xs={8}>
                  <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'left'}}>
                    <Text property={FOAF.name.iri.value} />
                  </Typography>
                </Grid>
                </Grid>
                <div>
                    <Typography gutterBottom component="p">
                      <GetAddress webID={session.info.webId || ''}></GetAddress> 
                    </Typography>
                </div>
            </Box>
            
        </Container>  
      </CombinedDataProvider>
    
  
  );
}

export default ProfileViewer