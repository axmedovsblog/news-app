import { Route, Routes } from 'react-router-dom'
import './App.css'
import News from './components/News'
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Users from './components/Users'
import ClientNews from './components/ClientNews'
function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/news' element={<News />} />
        <Route path='/news' element={<News />} />
        <Route path='/users' element={<Users />} />
        <Route path='/user/:id' element={<ClientNews />} />
      </Routes>
    </>
  )
}

export default App
