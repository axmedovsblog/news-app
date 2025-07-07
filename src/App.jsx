import { Route, Routes } from 'react-router-dom'
import './App.css'
import News from './components/News'
function App() {

  return (
    <>
      <Routes>
        <Route path='/news' element={<News/>}/>
      </Routes>
    </>
  )
}

export default App
