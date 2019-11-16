import React from 'react'
import './BetInput.css'

function BetInput(props) {
    const { disabled, bigBlindAmount, bet, betAmountChange, player1money, player1bet, player2bet } = props
    return (
        <input
            className="amount"
            type="number"
            value={bet}
            min={player2bet * 2 - player1bet}
            max={player1money + player1bet}
            onChange={betAmountChange}
            step={bigBlindAmount}
            disabled={disabled}
        />
    )
}

export default BetInput
