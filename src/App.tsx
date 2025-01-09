import { useState } from 'react'
import model from './model'
import './App.css'

const chat = model.startChat();

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const output = async () => {
    const chatResult = await chat.sendMessage(prompt);
    setResult(chatResult.response.text());
  }

  return (
    <>
      <div>
        <p>내용 입력</p>
        <input onChange={(e) => {
          setPrompt(e.target.value);
        }}></input>
        <button onClick={output}>send</button>
        <p>결과: </p>
        <p>{result}</p>
      </div>
    </>
  )
}

export default App
