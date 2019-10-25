import React from 'react'
import './MoneyInTheMiddle.css'

function MoneyInTheMiddle(props) {
    const { player1bet, player2bet, pot } = props
    return (
        <div className="money">
            <div className="pot">{pot ? `Pot: $${pot}` : null}</div>
            <div className="potChips"><i className="fas fa-coins"></i></div>
            <div className="player1bet">{player1bet ? `$${player1bet}` : null}</div>
            <div className="player2bet">{player2bet ? `$${player2bet}` : null}</div>
            <div className="player1chips"><i className="fas fa-coins"></i></div>
            <div className="player2chips"><i className="fas fa-coins"></i></div>
        </div>
    )
}

export default MoneyInTheMiddle
