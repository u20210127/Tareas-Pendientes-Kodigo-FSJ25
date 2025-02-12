import { MyProvider } from './assets/Context/UserDataContext'
import './assets/CSS/App.css'
import { Home } from './pages/home'
import { Sesion } from './pages/sesion/sesion'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
    <MyProvider>
    {/*Activamos ReactRouterDom en la app */}
      <BrowserRouter>
       {/*Activamos la funcionalidad de poder crear rutas */}
      <Routes>
        <Route path='/sesion' element={<Sesion/>} />
        <Route index path='/' element={<Home/>} />
      </Routes>
      </BrowserRouter>     
      </MyProvider>
    </>
  )
}

export default App
