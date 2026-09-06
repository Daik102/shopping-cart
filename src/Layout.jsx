import { useState } from 'react'
import { Outlet } from 'react-router';
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
