import React from 'react'
import './Timer.css';

class Timer extends React.Component {
    state = {
        counter: 5,
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.countdown(),
            1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    countdown = () => {
        this.setState({ counter: this.state.counter - 1 });
    }

    render() {
        return (
            <p className="timer">Time to Act: {this.state.counter}</p>
        );
    }
}

export default Timer;