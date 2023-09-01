import {Component} from 'react'
import PhotoBooth from '../PhotoBooth'

import './index.css'

class Home extends Component {
  state = {
    startPage: true,
  }

  toggleState = () => {
    this.setState({startPage: false})
  }

  render() {
    const {startPage} = this.state
    return (
      <div className="bg-container">
        {startPage ? (
          <div className="start-page-container">
            <h1 className="start-page-heading">Virtual Photo Booth</h1>
            <button
              type="button"
              className="enter-button"
              onClick={this.toggleState}
            >
              Enter
            </button>
          </div>
        ) : (
          <PhotoBooth />
        )}
      </div>
    )
  }
}

export default Home
