import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import {Box, Button, Container, Grid, Typography } from "@mui/material";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";



const ProfileViewer = () => {
  const {session, logout} = useSession();
  const { webId } = session.info as any;

  return (
    <Container fixed>
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId} >
        <h2>User profile</h2>
          <Container component="main" maxWidth="xs">
            <Box
                      sx={{
                          marginTop: 10,
                          alignItems: 'center',
                          flexDirection: 'column',
                          display: 'inline-flex',
                      }}
                  >  
                    <Grid id="grid1" container spacing={5}>    
                      <Grid id="grid2" item xs={6} md={4}>
                          <Image property={VCARD.hasPhoto.iri.value} width={75} /> 
                      </Grid>
                      <Grid id="grid3 "item xs={6} md={8}>
                        <Typography gutterBottom variant="h5" component="h2">
                          <Text property={FOAF.name.iri.value} />
                        </Typography>
                      </Grid>
                    </Grid>
            </Box>
        </Container>  
      </CombinedDataProvider>
    </Container>
  
  );
}

export default ProfileViewer