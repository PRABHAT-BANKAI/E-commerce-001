import React from 'react'
import Navbar from './components/Navbar'
import AllRoute from './routes/AllRoute'
import ProductPage from './pages/ProductPage'
import Footer from './components/Footer'


const App = () => {
  return (
    <div>
      <Navbar/>
      <AllRoute/>
      <Footer/>
    </div>
  )
}

// git add .
// git commit -m "db.json"
// git push origin krish

export default App