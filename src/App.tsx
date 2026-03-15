import MovieList from "./components/cine/MovieList"
import Header from "./Header"
import Sidebar from "./Sidebar"

function App() {

  return (
    <div className="dark:bg-body bg-white font-[Sora] dark:text-white text-dark">
      <Header />
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
          <MovieList />
        </div>
      </main>
    </div>
  )
}

export default App
