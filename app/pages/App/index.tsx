import * as React from 'react'

export default class MainPage extends React.Component {
  render() {
    return <div className="pt-dark">{this.props.children}</div>
  }
}
