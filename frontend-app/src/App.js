import { BrowserRouter, Routes, Route } from "react-router-dom"

/* inject import */
import HomePage from "./pages/home"
import LoginPage from "./pages/login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<h1>Welcome to Frontend Page</h1>} />
        <Route path="/app1">
          {/* inject route */}
          <Route path="home" element={<HomePage />} />
          <Route path="" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
