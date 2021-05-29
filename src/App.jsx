import React from 'react'
import Box from './Box'
import './App.less'

export default function App () {
  const handleClick = () => {
    console.log('Hello')
  }

  return (
    <main id="app">
      <h1 className="emoji">
        <div onClick={handleClick}>⚛️</div>
        <Box />
      </h1>
      <h2>
        Basic <strong>AF</strong> React Parcel
      </h2>
    </main>
  )
}
