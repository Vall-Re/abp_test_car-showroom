import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="app-wrapper">
      <Header />
      <h2 className="home-title">Virtual Car Showroom</h2>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}