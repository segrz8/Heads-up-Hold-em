import React from 'react'
import './OperatingButtons.css';

function OperatingButtons(props) {
    const { dealCards, disabledDeal, player2turn, disabledPlayer2, showCards, disabledShowdown, player1money, player2money } = props
    return (
        <div className='operatingButtons'>
            <button onClick={dealCards} disabled={disabledDeal}>Deal Cards</button>
            <button onClick={player2turn} disabled={player1money === 0 || player2money === 0 ? true : disabledPlayer2}>CPU turn</button>
            <button onClick={showCards} disabled={disabledShowdown}>Showdown</button>
        </div>
    )
}

export default OperatingButtons