import React from 'react'
import './OperatingButtons.css';

function OperatingButtons(props) {
    const { dealCards, disabledDeal, showCards, disabledShowdown } = props
    return (
        <div className='operatingButtons'>
            {/* <button onClick={dealCards} disabled={disabledDeal}>New Game</button> */}
            {/* <button onClick={player2turn} disabled={player1money === 0 || player2money === 0 ? true : disabledPlayer2}>CPU turn</button> */}
            {/* <button onClick={showCards} disabled={disabledShowdown}>New hand</button> */}
            {disabledDeal ?
                <button onClick={showCards} disabled={disabledShowdown}>New hand</button> :
                <button onClick={dealCards} disabled={disabledDeal}>New Game</button>
            }
        </div>
    )
}

export default OperatingButtons
