import React from 'react'
import './ActionInfo.css';

function ActionInfo(props) {
    const { actionInfo } = props
    return (
        <p className="actionInfo">{actionInfo}</p>
    )
}

export default ActionInfo
