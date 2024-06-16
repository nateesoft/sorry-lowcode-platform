import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainApp from './main'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workflow/:id">
          <Route index element={<MainApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
