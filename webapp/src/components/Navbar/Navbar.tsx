import * as React from 'react'
import ShoppingCart from '../Cart/ShoppingCart'
import { useSession } from "@inrupt/solid-ui-react";


import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const pages = ['Women', 'Men', 'Kids']

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const {session, logout} = useSession();
  const [message, setMessage] = useState(null as string|null);

  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    setMessage('Sesión cerrada satisfactoriamente')
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message != null}
        onClose={() => setMessage(null)}
      >
        <Alert onClose={() => setMessage(null)} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    <AppBar position="static" style={{ background: '#365073' }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <IconButton
              size="large"
              onClick={() => navigate('/')}
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 4 }}
            >
              <img
                height="100px"
                src="/images/logo.jpg"
                alt="logo"
                className="logo"
              />
            </IconButton>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton
              size="large"
              onClick={() => navigate('/')}
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 4 }}
            >
              <img
                height="100px"
                src="/images/logo.jpg"
                alt="logo"
                className="logo"
              />
            </IconButton>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!session.info.isLoggedIn ? (
                <MenuItem onClick={() => navigate('/signIn')}>
                <Typography textAlign="center">Signin</Typography>
              </MenuItem>
              ):(
                <><MenuItem onClick={() => navigate('/profile')}>
                      <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/orders')}>
                    <Typography textAlign="center">Orders</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                  </MenuItem></>
              )}
            </Menu>
          </Box>

          <ShoppingCart />
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}
export default NavBar
