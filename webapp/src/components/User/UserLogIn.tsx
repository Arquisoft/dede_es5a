import React,{ useState} from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, TextField, Container, Box, Avatar, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LoginForm = () => {
  const [idp, setIdp] = useState("https://broker.pod.inrupt.com");

  console.log(idp)
  return (
      <React.Fragment>
          <Container component="main" maxWidth="xs">
              <Box
                  sx={{
                      marginTop: 10,
                      alignItems: 'center',
                      flexDirection: 'column',
                      display: 'inline-flex',
                  }}
              >
                <Avatar src="/images/sign-in.png" />
                <h2>WELCOME</h2>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Identity Provider</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{width: '270px'}}
                        value={idp}
                        label="Age"
                        onChange={(e) => setIdp(e.target.value)}
                    >
                        <MenuItem onChange={(e) => setIdp("https://broker.pod.inrupt.com")} value={"https://broker.pod.inrupt.com"}>
                            https://broker.pod.inrupt.com
                        </MenuItem>
                        <MenuItem onChange={(e) => setIdp("https://inrupt.net")} value={"https://inrupt.net"}>
                            https://inrupt.net
                        </MenuItem>                  
                    </Select>
                </FormControl>
 
                <LoginButton oidcIssuer={idp} redirectUrl="http://localhost:3000">
                    <Button variant="contained" type="submit" sx={{ mt: 4 }}>
                        Sign In
                    </Button>
                </LoginButton>

              </Box>
          </Container>
      </React.Fragment>
  );
}

export default LoginForm;