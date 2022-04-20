import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import NavBar from './Navbar'

test('check categories renders properly', async () => {
  // Arrange
  const pages = ['Women', 'Men', 'Kids']

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )
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
