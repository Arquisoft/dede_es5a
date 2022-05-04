
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import NavBar from './Navbar'

test('check categories renders properly', async () => {
  // Arrange
  const pages = ['Distribution centers']

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

test('settings options renders correctly when user not in session', async () => {
  // Arrange

  // Act
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )
  let settingsButton = screen.getByRole('button', {
    name: /settings/i
  })

  fireEvent.click(settingsButton);
  // Assert
  waitFor(() => 
    expect(screen.getAllByText(/Signin/i)).toBeInTheDocument()
  )
})
