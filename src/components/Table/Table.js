import React from 'react'
import FolderIcon from '../../icons/Folder.svg'
import FileIcon from '../../icons/File.svg'
import LoadIcon from '../../icons/Loading.svg'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import './Style.css'

class BreadCrumb extends React.Component {

  linkClicked = () => {
    this.props.handleClick(this.props.url)
  } 

  render() {
    const links = this.props.levels.map((level) => {
      if (level.url === this.props.location) {
        return (
          <span key={level.filename} className="Link CurrentLink">{level.filename}</span>
        )
      } else {
        return (
          <Crumb key={level.filename} url={level.url} text={level.filename} handleClick={this.props.handleClick}/>
        )
      }
  })
    return (
      <div className="BreadCrumb">
        {links}
      </div>
    )
  }
}

class Crumb extends React.Component {
  crumbClicked = () => {
    this.props.handleClick(this.props.url)
  }

  render() {
    return (
      <Link 
        className="Link" 
        to={`${this.props.url}`}
        onClick={this.crumbClicked}
      >
        {this.props.text}
      </Link>
    )
  }
}

class TableHeader extends React.Component {
  render() {
    const cols = this.props.columns.map((column) => (<th key={column}>{column}</th>))
    return (
      <thead>
        <tr>
          {cols}
        </tr>
      </thead>
    )
  }
}

class TableRow extends React.Component {

  linkClicked = () => {
    this.props.handleClick(this.props.data.url)
  }

  render() {
    const icon = this.props.data.directory ? FolderIcon : FileIcon
    const filename = this.props.data.directory ? 
      <Link className="Link" to={`${this.props.data.url}`}
            onClick={this.linkClicked}
          >{this.props.data.filename}</Link> : 
      <span>{this.props.data.filename}</span>
    console.log(this.props)
    return (
      <tr>
        <td key={1}><img src={icon} className="Icon" alt="icon"/></td>
        <td key={2}>{filename}</td>
        <td key={3}>{this.props.data.size}</td>
        <td key={4}>{this.props.data.downloadable}</td>
        <td key={5}><Button title={"Share"} id={this.props.data.id}/></td>
      </tr>
    )
  }
}

class TableBody extends React.Component {

  handleClickBody = (url) => {
    this.props.handleClick(url)
  }

  render() {
    const rows = this.props.rows.map((row) => (<TableRow key={row.filename} data={row} handleClick={this.handleClickBody}/>))
    return (
      <tbody>{rows}</tbody>
    )
  }
}


const COLUMNS = ["Type", "Name", "Size", "Download", "Share"]

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableRows: [],
      levels: [],
      loadingFailed: false,
      isLoading: true,
    }

    const unlisten = this.props.history.listen((location, action) => {
      if (action === "POP") {
        this.fetchData(forceTrailingSlash(location.pathname))
      }
    })
  }

  componentDidMount() {
    this.fetchData(this.props.match.url)
  }

  handleClick = (url) => {
    this.fetchData(url)
  }


  fetchData(path) {
    this.setState({
      isLoading: true
    })

    path = "http://localhost:8000" + path
    const token = 'Token '+ localStorage.getItem('token')
    fetch(path,{
      headers: {
        'Authorization': token
      }})
      .then((response) => {
        console.log(response)
        if(response.ok) {
          return response.json()
        } else {
          throw new Error(response.status + ": " + response.statusText)
        }
      })  
      .then((responseData) => {
        this.setState({
          tableRows: responseData.children,
          levels: responseData.levels,
          isLoading: false
        })
      }).catch((error) => {
        console.log(error)
        this.setState({
          isLoading: false,
          loadingFailed: true
        })
      })  
  }

  render() {
    if (!this.state.loadingFailed && !this.state.isLoading) {
    return (
      <div>
        <BreadCrumb levels={this.state.levels} location={forceTrailingSlash(this.props.location.pathname)} handleClick={this.handleClick}/>
        <table>
          <TableHeader columns={COLUMNS} />
          <TableBody rows={this.state.tableRows} handleClick={this.handleClick}/>
        </table>
      </div>
    )
    } else if (this.state.loadingFailed) {
      return (
        <ErrorComponent />
      )
    } else {
      return (
        <div className="LoadIcon-icon-container">
          <img src={LoadIcon} className="Loading-icon" alt="Loading icon"/>
        </div>
      )
    }
  }
}

function forceTrailingSlash(path) {
  if (path.slice(-1) !== '/') {
    return (path + '/')
  } else {
    return path
  }
}

