import React from 'react'
import { Link } from 'react-router-dom' 
import './Style.css'

export default class Navbar extends React.Component {

  logout = () => {
    localStorage.removeItem('token')
  }

  getLoginLogoutLink() {
    if (localStorage.getItem('token')) {
      return (
        <span className="LoginLogoutLink">
          <Link to="/login" onClick={this.logout}>Logout</Link>
        </span>  
      )
    } else {
      return (
        <span className="LoginLogoutLink">
          <Link to="/login">Login</Link>
        </span>  
      )
    }
  }
  
  render() {
    const loginLogoutLink = this.getLoginLogoutLink()
    return (
      <nav className="Navbar">
        <div>
          <span className="NavLogo">{this.props.title}</span>
          {loginLogoutLink}
        </div>
      </nav>
    )
  }
}