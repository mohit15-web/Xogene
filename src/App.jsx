import { BrowserRouter, Route, Routes } from "react-router-dom"
import Drugs from "./components/Drugs"
import Search from "./components/Search"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/drugs/:id" element={<Drugs/>} />
        <Route path="/" element={<Search/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App