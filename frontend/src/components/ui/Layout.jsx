// Component
import Footer from "./Footer"
import Navbar from "./Navbar"

function Layout({ children }) {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-2 pt-14 bg-gradient-to-r from-blue-300/20 to-yellow-300/20">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout