import './styles/main.css'
import {Header} from './components/Header'
import { Infos } from './components/Infos'

function App() {
  return (
    <div className="bg-cyan-300/20 h-screen">
      <Header />
      <Infos />
    </div>
  )
}

export default App
