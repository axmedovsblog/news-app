import { Route, Routes } from 'react-router-dom'
import './App.css'
import News from './components/News'
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/news' element={<News />} />
      </Routes>
    </>
  )
}

export default App
