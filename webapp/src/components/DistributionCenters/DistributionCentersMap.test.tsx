import { render, screen } from '@testing-library/react';
import DistributionCentersMap from './DistributionCentersMap';

test('check empty shopping cart drawer renders propertly', async () => {
  // Arrange

  // Act
  render(<DistributionCentersMap />)

  // Assert
  expect(screen.getByText(/Tenemos una amplia variedad de centros de distribución repartidos por toda la península, tenemos un centro de distribución en Madrid, otro en Barcelona y uno en Oviedo, lugar de origen de nuestros calcetines. Puede contactar con nostros entrando y apoyando nuestro proyecto./i)).toBeInTheDocument()
  expect(screen.getByAltText(/Mapa de centros de distribución/i)).toBeInTheDocument()
})