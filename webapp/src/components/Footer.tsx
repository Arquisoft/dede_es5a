import { Grid, Typography, Box, Link } from '@mui/material'

export default function Footer(): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      style={{ background: '#365073', marginTop: '25px' }}
      sx={{ border: 2 }}
    >
      <Grid item sm={4}></Grid>
      <Grid item sm={4}>
        <Typography align="center">© 2022 ArquiSocks</Typography>
      </Grid>
      <Grid item sm={4}>
        <Box borderBottom={1}>About the project:</Box>
        <Box>
          <Link href="https://arquisoft.github.io/dede_es5a/" underline="none">
            Documentation
          </Link>
        </Box>
        <Box>
          <Link href="https://github.com/Arquisoft/dede_es5a" underline="none">
            Source code
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}
