import React from 'react'
import './DealerButton.css'

function DealerButton(props) {
    return (
        // <div className={props.dealerButtonPosition ? 'dealerButtonP1' : 'dealerButtonP2'}></div>
        <div className={props.dealerButtonPosition ? `dealerButton p1dealer` : `dealerButton p2dealer`}><p>D</p></div>
    )
}

export default DealerButton
