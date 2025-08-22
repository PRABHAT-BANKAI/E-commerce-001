import React from 'react'
import Navbar from './components/Navbar'
import AllRoute from './routes/AllRoute'
import ProductPage from './pages/ProductPage'


const App = () => {
  return (
    <div>
      <Navbar/>
      <AllRoute/>
    </div>
  )
}

// git add .
// git commit -m "db.json"
// git push origin krish

export default App