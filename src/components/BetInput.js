import React from 'react'
import './BetInput.css'

function BetInput(props) {
    const { player1bet, player2bet, disabled, smallBlindAmount, bet, bigBlindAmount, betAmountChange } = props
    return (
        <input
            className="amount"
            type="number"
            value={bet}
            min={player1bet === player2bet ? bigBlindAmount : player1bet}
            onChange={betAmountChange}
            step={smallBlindAmount}
            disabled={disabled}
        />
    )
}

export default BetInput
