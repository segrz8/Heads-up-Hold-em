import React from 'react'
import './BetSlider.css'

function BetSlider(props) {
    const { player1money, player1bet, disabled, smallBlindAmount, betAmountChange, bet } = props
    return (
        <input
            className="slider"
            type="range"
            id="myRange"
            min="0"
            max={player1money + player1bet}
            step={smallBlindAmount}
            onChange={betAmountChange}
            value={bet}
            disabled={disabled}
        />
    )
}

export default BetSlider
