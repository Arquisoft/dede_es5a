import { render, screen, waitFor } from '@testing-library/react'
import App from '../../App'

test('check categories renders properly', async () => {
  // Arrange
  const pages = ['Women', 'Men', 'Kids']

  render(<App />)
  // Act
  const pagesElements = new Array()

  await waitFor(() =>
    pages.forEach((p) => {
      pagesElements.push(screen.getAllByText(p).at(0))
    }),
  )

  // Assert
  pagesElements.forEach((e) => {
    expect(e).toBeInTheDocument()
  })
})

test('check options for not logged user', async () => {
  // Arrange
  render(<App />)

  // Act
  let signIn
  let orders, profile, logout
  await waitFor(() => (signIn = screen.getAllByText('Signin').at(0)))

  await waitFor(() => (orders = screen.queryByText('Orders')))

  await waitFor(() => (profile = screen.queryByText('Profile')))

  await waitFor(() => (logout = screen.queryByText('Logout')))

  // Assert
  expect(signIn).toBeInTheDocument()
  expect(orders).toBeNull()
  expect(profile).toBeNull()
  expect(logout).toBeNull()
})
