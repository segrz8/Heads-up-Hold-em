import React from 'react'
import './OperatingButtons.css';

function OperatingButtons(props) {

    const { dealCards, disabledDeal, disabledShowdown, newHand } = props

    return (
        <div className='operatingButtons'>
            {disabledDeal ?
                <button onClick={newHand} disabled={disabledShowdown}>New hand</button> :
                <button className="newGame" onClick={dealCards} disabled={disabledDeal}>New Game</button>
            }
        </div>
    )
}

export default OperatingButtons
