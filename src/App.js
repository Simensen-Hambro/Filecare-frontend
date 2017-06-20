import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Table from './components/Table/Table'
import Login from './components/Login/Login'
import Logout from './components/Login/Logout'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
        	<Navbar title="Filecare"/>
          <div className="Container">
            <Switch>
              <Route path="/share/:id" component={Table} />
              <Route path="/browse/:id" component={Table} />
              <Route path="/browse/" component={Table} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={ErrorComponent} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
