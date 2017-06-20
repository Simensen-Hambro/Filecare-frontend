import React from 'react'
import Card from '../Card/Card'
import './Style.css'

export default class Logout extends React.Component {
  render() {
    return (
        <LoginForm history={this.props.history}/>
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
