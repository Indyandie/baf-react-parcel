import React, { Component } from 'react'
import Box from './Box'
import './App.less'

export default class App extends Component {
  handleClick () {
    console.log('Hello')
  }

  render() {
    return (
      <main id="app">
        <h1 className="emoji">
          <div onClick={this.handleClick}>⚛️</div>
          <Box />
        </h1>
        <h2>
          Basic <strong>AF</strong> React Parcel
        </h2>
      </main>
    )
  }
}
