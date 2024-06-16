import { BrowserRouter, Routes, Route } from "react-router-dom"
import Template from "./pages/template"

import HomePage from "./pages/home"
import LoginPage from "./pages/login"

const routeRegister = [
  { id: 1, path: "", page: <HomePage /> },
  { id: 2, path: "login", page: <LoginPage /> }
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/template" element={<Template />} />
        <Route path="/app1">
          {routeRegister.map((r) => (
            <Route key={r.id} path={r.path} element={r.page} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
