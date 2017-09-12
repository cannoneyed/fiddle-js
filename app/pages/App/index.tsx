import * as React from 'react'

export default class MainPage extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return <div className="pt-dark">{this.props.children}</div>
  }
}
