import React from "react";

export default class Main extends React.Component {

	state = {counter:0};

	increment() {
		const {counter} = this.state
		this.setState({counter: counter + 1 })
	}

	render() {
		return (
			<div>
				Main component, {this.state.counter} <button onClick={() => this.increment()}>+1</button>
			</div>
		)
	}

}
