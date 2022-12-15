import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/index.css'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello React"
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)
