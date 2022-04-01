import * as React from 'react'

import { useForm } from 'react-hook-form'
import { login } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Avatar, TextField, Button } from '@mui/material'

/*
interface SignInPops {
  setPage: (page: string) => void
}
*/

export default function UserLogIn(): JSX.Element {
  const {
    register,
    //formState: { errors },
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()

  async function doLogin(data: any) {
    const logued = await login(data)
    if (logued) navigate('/products', { replace: true })
  }

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
          <Box>
            <Avatar src="/images/sign-in.png" />
            <h2>WELCOME</h2>
            <form onSubmit={handleSubmit(doLogin)}>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                type="text"
                margin="dense"
                size="small"
                required
                fullWidth
                {...register('email', { required: true })}
              />

              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                size="small"
                margin="dense"
                required
                fullWidth
                {...register('password', { required: true })}
              />
              <Button variant="contained" type="submit" sx={{ mt: 4 }}>
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  )
}
