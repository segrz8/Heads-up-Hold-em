import React from 'react'
import './MoneyInTheMiddle.scss'

function MoneyInTheMiddle(props) {
    const { player1bet, player2bet, pot } = props
    return (
        <div className="money">
            <div className="money__pot">{pot ? `Pot: $${pot}` : null}</div>
            <div className="money__potChips"><i className="fas fa-coins"></i></div>
            <div className="money__player1bet">{player1bet ? `$${player1bet}` : null}</div>
            <div className="money__player2bet">{player2bet ? `$${player2bet}` : null}</div>
            <div className="money__player1chips"><i className="fas fa-coins"></i></div>
            <div className="money__player2chips"><i className="fas fa-coins"></i></div>
        </div>
    )
}

export default MoneyInTheMiddle
