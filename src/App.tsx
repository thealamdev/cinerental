import Footer from "./components/cine/Footer"
import MovieList from "./components/cine/MovieList"
import Header from "./Header"
import CardProvider from "./providers/CardProvider"
import Sidebar from "./Sidebar"

function App() {

  return (
    <div className="dark:bg-body bg-white font-[Sora] dark:text-white text-dark">
      <CardProvider>
        <Header />
        <main>
          <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
            <Sidebar />
            <MovieList />
          </div>
        </main>
        <Footer />
      </CardProvider>
    </div>
  )
}

export default App
