import { render, screen, waitFor } from '@testing-library/react'
import Footer from './Footer'

test('Documentation available', async () => {
  render(<Footer />)
  const doc = await screen.getByText('Documentation')
  await waitFor(() => expect(doc).toBeInTheDocument())
})

test('Source code', async () => {
  render(<Footer />)
  const source = await screen.getByText('Source code')
  await waitFor(() => expect(source).toBeInTheDocument())
})
