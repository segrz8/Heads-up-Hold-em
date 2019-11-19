import React from 'react'
import './DealerButton.scss'

function DealerButton(props) {
    return (
        <div className={props.dealerButtonPosition ? 'dealerButton' : 'dealerButton dealerButton--p2dealer'}><p>D</p></div>
    )
}

export default DealerButton
