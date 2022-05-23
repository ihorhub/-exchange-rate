import './App.css'
import { Rate } from './component/rate'
import { Header } from './component/header'
import exa from './component/exchangeStyle.module.scss'

function App() {
  return (
    <>
      <header className={exa.main_container}>
        <Header />
        <Rate />
      </header>
    </>
  )
}

export default App
