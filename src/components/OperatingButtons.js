import React from 'react'
import './OperatingButtons.scss';

function OperatingButtons(props) {
    const { dealCards, disabledDeal, disabledShowdown, newHand } = props

    return (
        <div className='operatingButtons'>
            {disabledDeal ?
                <button className="operatingButtons__btnStandard" onClick={newHand} disabled={disabledShowdown}>New hand</button> :
                <button className="operatingButtons__btnStandard" onClick={dealCards} disabled={disabledDeal}>New Game</button>
            }
        </div>
    )
}

export default OperatingButtons
