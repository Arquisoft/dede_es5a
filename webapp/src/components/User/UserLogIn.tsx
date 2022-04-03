import React,{ useState} from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, TextField, Container, Box, Avatar } from "@mui/material";

const LoginForm = () => {
  const [idp, setIdp] = useState("https://broker.pod.inrupt.com");

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
                <TextField
                    label="Identity Provider"
                    placeholder="Identity Provider"
                    style={{width: '250px'}}
                    type="url"
                    value={idp}
                    color="primary"
                    onChange={(e) => setIdp(e.target.value)}
                />
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