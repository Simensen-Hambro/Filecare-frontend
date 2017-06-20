import React from 'react'
import './Style.css'

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  shareButtonClicked = () => {
    const path = "http://localhost:8000/share/"
    const payload = {
      node: this.props.id
    }

    console.log("Payload: " + payload.node)

    const token = 'Token '+ localStorage.getItem('token')
    fetch(path,{
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        console.log(response)
        if(response.ok) {
          return response.json()
        } else {
          throw new Error()
        }
      })  
      .then((responseData) => {
      }).catch((error) => {
      })
  }

  render() {
    return(
      <button 
        className="Button ShareButton"
        onClick={this.shareButtonClicked}
      >
        {this.props.title}
      </button>
    )
  }
}

export default Button