import React from 'react'
import './Style.css'

class Card extends React.Component {
	render() {
		return (
      <div className="Card">
        <h2 className="CardTitle">{this.props.title}</h2>
        {this.props.children}
      </div>
		)
	}
}

export default Card