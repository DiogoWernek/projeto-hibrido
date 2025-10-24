import { Route, Routes } from "react-router-dom"

import { CartDetails } from "../pages/CartDetails"
import { Layout } from "../components/Layout"
import { Home } from "../pages/Home"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart/:id" element={<CartDetails />} />
      </Route>
    </Routes>
  )
}