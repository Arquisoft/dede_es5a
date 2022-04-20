import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

test('Signin button available', async () => {
  render(<App />)
  const signIn = await screen.getByText('Signin')
  await waitFor(() => expect(signIn).toBeInTheDocument())
})

test('Logo', async () => {
  render(<App />)
  const logo = await screen.getAllByAltText('logo')
  await waitFor(() => expect(logo[0]).toBeInTheDocument())
})
