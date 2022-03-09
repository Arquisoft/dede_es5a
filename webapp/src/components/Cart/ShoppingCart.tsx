import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';


export default function ShoppingCart() {
    const [state, setState] = React.useState(false);
    
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setState(open)
    };

    const list = () => (
        <Box>
            <List>
                <h2>Your Shopping Cart</h2>
                <ListItem>
                    <Card>
                        Works 111111111111111111111111
                    </Card>
                </ListItem>
                <ListItem>
                    <Card>
                        Works 111111111111111111111111
                    </Card>
                </ListItem>
                <ListItem>
                    <Card>
                        Works 111111111111111111111111
                    </Card>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open cart">
            <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                <ShoppingCartIcon fontSize="large" ></ShoppingCartIcon>
            </IconButton>
            </Tooltip>
            <Drawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
            >
                
                {list()}
            </Drawer>
        </Box>
    )
}