import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
export default function Footer(): JSX.Element{
    return(
        <Grid container spacing={0}>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}><Typography align="center">© 2022 ArquiSocks</Typography></Grid>
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
    );
}