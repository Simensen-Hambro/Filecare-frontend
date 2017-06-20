import React from 'react'
import Card from '../Card/Card'
import './Style.css'

export default class Login extends React.Component {
  render() {
    return (
      <Card title="Login">
        <LoginForm history={this.props.history}/>
      </Card>
    )
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: false
    }
  }

  handleButtonClick = (e) => {
    e.preventDefault()
    this.loginRequest()
  }

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  loginRequest() {
    const url = "http://localhost:8000/obtain-auth-token/"
    const payload = {
      username: this.state.username,
      password: this.state.password
    }
    console.log("Trying to log in")
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Error")
      }
    })
    .then((res) => {
      localStorage.setItem('token', res.token)
      this.setState({
        error: false
      })
      this.redirectAfterLogin()
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        error: true
      })
    })
  }

  redirectAfterLogin() {
    //console.log(this.props)
    this.props.history.push('/browse/')
  }

  render() {
    const formError = this.state.error ? (<p className="FormError">Unable to login</p>) : undefined
    return(
      <form className="LoginForm">
        <div className="InputGroup">
          <label>Username</label>
          <input type="text" onChange={this.onUsernameChange}/>
        </div>
        <div className="InputGroup">
          <label>Password</label>
          <input type="password" onChange={this.onPasswordChange}/>
        </div>
        {formError}
        <button className="Button" onClick={this.handleButtonClick}>Login</button>
      </form>
    )
  }
}
