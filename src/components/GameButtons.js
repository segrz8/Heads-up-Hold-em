import React from 'react'
import './GameButtons.css'

function GameButtons(props) {
    const { player2money, player1bet, player2bet, disabled, bet, fold, call, raise, betRaiseAllIn, player1money } = props
    return (
        <div className="gameButtons">
            <button
                disabled={disabled}
                onClick={fold}
            >
                {player1bet === player2bet ? <p>Check</p> : <p>Fold</p>}
            </button>

            <button
                disabled={player1bet === player2bet ? true : disabled}
                onClick={call}
            >
                Call
                {/* {disabled ? null : (player2bet === 0 ? null : player2bet)} */}
            </button>

            {player1bet === 0 && player2bet === 0 ?
                <button disabled={disabled} onClick={bet}>{betRaiseAllIn}</button> :
                <button disabled={player2money || (player2bet < player1money + player1bet) ? disabled : true} onClick={raise}
                >
                    {betRaiseAllIn}
                </button>}
        </div>
    )
}

export default GameButtons
