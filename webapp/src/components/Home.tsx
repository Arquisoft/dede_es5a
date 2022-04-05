import { Container } from '@mui/material'
import ProductList from './Products/ProductList'

const Home = () => {
  return (
    <Container maxWidth="lg">
      <ProductList products={[]}/>
    </Container>
  )
}

export default Home
