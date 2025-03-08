import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Background from './componenets/Background.jsx'
import Herosection from './componenets/Herosection.jsx'
import Navbar from './componenets/Navbar.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    

    <Navbar/>
    <Background/>
    <Herosection/>
   
  </StrictMode>,
)
