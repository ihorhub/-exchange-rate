import './App.css'
import React, { useState } from 'react'
import { Header } from './component/header'
import exs from './component/exchangeStyle.module.scss'
function App() {
  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading)
  const LoadingIndicator = () => <div className={exs.loading}>Loading...</div>
  return (
    <>
      <header>
        {isLoading || isLoading === null ? (
          LoadingIndicator()
        ) : (
          <Header setIsLoading={setIsLoading} />
        )}
      </header>
    </>
  )
}

export default App
