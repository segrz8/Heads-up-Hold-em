import React from 'react'
import './Timer.scss';

class Timer extends React.Component {
    state = {
        counter: 60,
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
        const { counter } = this.state
        return (
            <p className="timer">Time to Act: {counter >= 10 ? counter : `0${counter}`}</p>
        );
    }
}

export default Timer;
