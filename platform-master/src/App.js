import React, { lazy, Suspense } from "react"
import {
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

import MainApp from "./pages/main"
import ThemeProvider from "./theme"

import DashboardLayout from "./layouts/dashboard"

export const IndexPage = lazy(() => import("./pages/app"))
export const BlogPage = lazy(() => import("./pages/blog"))
export const UserPage = lazy(() => import("./pages/user"))
export const WorkFlowPage = lazy(() => import("./pages/workflow"))
export const ServiceFlowPage = lazy(() => import("./pages/serviceflow"))
export const LoginPage = lazy(() => import("./pages/login"))
export const ProductsPage = lazy(() => import("./pages/products"))
export const Page404 = lazy(() => import("./pages/page-not-found"))
export const ServiceFlow = lazy(()=> import("./pages/main/serviceflow"))

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route
              element={
                <DashboardLayout>
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </DashboardLayout>
              }
            >
              <Route element={<IndexPage />} index={true} />
              <Route path="user" element={<UserPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="workflows">
                <Route index element={<WorkFlowPage />} />
                <Route path=":id" element={<MainApp />} />
              </Route>
              <Route path="serviceflows">
                <Route index element={<ServiceFlowPage />} />
                <Route path=":id" element={<ServiceFlow />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
