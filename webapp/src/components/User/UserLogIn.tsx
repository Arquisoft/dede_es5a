import React, { useState } from 'react'
import { LoginButton } from '@inrupt/solid-ui-react'
import {
  Button,
  Container,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { env } from 'process'

const LoginForm = () => {
  const [idp, setIdp] = useState('https://broker.pod.inrupt.com')

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
            <InputLabel id="demo-simple-select-label">
              Identity Provider
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: '270px' }}
              value={idp}
              label="Age"
              onChange={(e) => setIdp(e.target.value)}
            >
              <MenuItem
                onChange={() => setIdp('https://broker.pod.inrupt.com')}
                value={'https://broker.pod.inrupt.com'}
              >
                https://broker.pod.inrupt.com
              </MenuItem>
              <MenuItem
                onChange={() => setIdp('https://inrupt.net')}
                value={'https://inrupt.net'}
              >
                https://inrupt.net
              </MenuItem>
              <MenuItem
                onChange={() => setIdp('https://solidcommunity.net/')}
                value={'https://solidcommunity.net/'}
              >
                https://solidcommunity.net/
              </MenuItem>
            </Select>
          </FormControl>

          <LoginButton
            oidcIssuer={idp}
            redirectUrl={
              process.env.REACT_APP_URI === undefined
                ? 'http://localhost:3000'
                : process.env.REACT_APP_URI
            }
          >
            <Button variant="contained" type="submit" sx={{ mt: 4 }}>
              Sign In
            </Button>
          </LoginButton>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default LoginForm
