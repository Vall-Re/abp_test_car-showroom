import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import VehiclePage from './pages/VehiclePage'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/vehicles/:vehicleId' element={<VehiclePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
