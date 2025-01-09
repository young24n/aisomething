import { useState } from 'react'
import model from './model'
import './App.css'

function App() {
  const prompt = async () => {
    const prompt = ""
    const result = await model.generateContent([prompt]);

    console.log(result.response.text());
  }

  return (
    <>
      <div>
        <button onClick={prompt}>test</button>
      </div>
    </>
  )
}

export default App
