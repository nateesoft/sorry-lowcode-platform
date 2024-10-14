import React, { lazy, Suspense } from "react"
import {
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

import ThemeProvider from "./theme"

import DashboardLayout from "./layouts/dashboard"
import DemoPage from "./pages/main/workflow/demo"
import Protected from "./routes/ProtectedRoute"

export const AppPage = lazy(() => import("./pages/app"))
export const BlogPage = lazy(() => import("./pages/blog"))
export const UserPage = lazy(() => import("./pages/user"))
export const WorkFlowPage = lazy(() => import("./pages/workflow"))
export const WorkFlowApp = lazy(() => import("./pages/main"))
export const ServiceFlowPage = lazy(() => import("./pages/serviceflow"))
export const ServiceFlowApp = lazy(() => import("./pages/main/serviceflow"))
export const DatasourcePage = lazy(() => import("./pages/datasource"))
export const DatasourceApp = lazy(() => import("./pages/datasource-detail"))
export const ArchitectureApp = lazy(() => import("./pages/main/architecture"))
export const ProductsPage = lazy(() => import("./pages/products"))

export const LoginPage = lazy(() => import("./pages/login"))
export const Page404 = lazy(() => import("./pages/page-not-found"))

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
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
              <Route element={<Protected />}>
                <Route element={<AppPage />} index={true} />
                <Route path="user" element={<UserPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="architecture" element={<ArchitectureApp />} />
                <Route path="workflows">
                  <Route index element={<WorkFlowPage />} />
                  <Route path=":id" element={<WorkFlowApp />} />
                </Route>
                <Route path="serviceflows">
                  <Route index element={<ServiceFlowPage />} />
                  <Route path=":id" element={<ServiceFlowApp />} />
                </Route>
                <Route path="datasource">
                  <Route index element={<DatasourcePage />} />
                  <Route path=":id" element={<DatasourceApp />} />
                </Route>
              </Route>
            </Route>
            <Route path="demo">
              <Route index element={<DemoPage />} />
              <Route path=":formId" element={<DemoPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
