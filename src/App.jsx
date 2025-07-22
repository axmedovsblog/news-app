import { Route, Routes } from 'react-router-dom'
import './App.css'
import News from './components/News'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/news' element={<News/>}/>
      </Routes>
    </>
  )
}

export default App
