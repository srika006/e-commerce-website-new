
import { Routes,Route,Navigate} from 'react-router'
import './App.css'
import Home from './components/Home.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import Cart from './components/Cart.jsx'



function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
      <Route path="/home" element={<Navigate to="/"/>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>

     </Routes>
    </>
  )
}

export default App
