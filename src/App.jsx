import './App.css'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import { Route, Routes } from 'react-router'
import AdminProducts from './pages/admin/products/AdminProducts'
import Products from './pages/products/Products'
import ProductDetail from './pages/product-detail/ProductDetail'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import AdminUsers from './pages/admin/users/AdminUsers'
import NotFound from './pages/not-found/NotFound'


function App() {

  return (
    <>

      <Header />

      <main className="main-container">

        <Routes>

          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas de administración — acceso por URL directa */}
          {/* En la tercera entrega se protegerán con autenticación JWT */}
          <Route path="/admin" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* Ruta comodín — 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

      <Footer />
    </>
  )
}

export default App
