import { useSession, CombinedDataProvider, Image,Text } from "@inrupt/solid-ui-react";
import {Box, Container, Grid, Typography } from "@mui/material";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import UserAddress from "./UserAddress";

const ProfileViewer = () => {
  const {session} = useSession();
  const { webId } = session.info as any;


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
                      errorComponent={() => <img src="/images/no-image-profile.png" alt="Imagen de perfil" style={{width: '100%'}}/>}
                      style={{width: '100%'}}
                    /> 
                </Grid>
                <Grid id="grid3"item xs={8}>
                  <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'left'}}>
                    <Text property={FOAF.name.iri.value} />
                  </Typography>
                </Grid>
                </Grid>
                <div>
                    <Typography gutterBottom component="p">
                      <UserAddress webID={session.info.webId || ''}></UserAddress> 
                    </Typography>
                </div>
            </Box>
            
        </Container>  
      </CombinedDataProvider>
    
  
  );
}

export default ProfileViewer