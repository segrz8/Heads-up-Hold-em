import React from 'react'
import './BetSlider.css'

function BetSlider(props) {
    const { player1money, player1bet, disabled, smallBlindAmount, betAmountChange } = props
    return (
        <input
            className="slider"
            type="range"
            id="myRange"
            min="0"
            max={player1money + player1bet}
            step={smallBlindAmount}
            onChange={betAmountChange}
            disabled={disabled}
        />
    )
}

export default BetSlider
