import { Component } from 'react'

class Toggler extends Component {
  state = {
    isOn: Boolean(this.props.initialState),
  }
  toggle = () => {
    this.setState((state) => ({ ...state, isOn: !state.isOn }))
  }
  render() {
    return this.props.children({
      toggle: this.toggle,
      isOn: this.state.isOn
    })
  }
}

export default Toggler
