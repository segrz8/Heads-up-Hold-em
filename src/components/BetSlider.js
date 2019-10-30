import React from 'react'
import './BetSlider.css'

function BetSlider(props) {
    const { player1money, player1bet, disabled, smallBlindAmount, betAmountChange, bet, player2bet } = props
    return (
        <input
            className="slider"
            type="range"
            id="myRange"
            min={player2bet * 2 - player1bet}
            max={player1money + player1bet}
            step={smallBlindAmount}
            onChange={betAmountChange}
            value={bet}
            disabled={disabled}
        />
    )
}

export default BetSlider
