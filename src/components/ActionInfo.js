import React from 'react'
import './ActionInfo.scss';

function ActionInfo(props) {
    const { actionInfo } = props
    return (
        <p className="actionInfo">{actionInfo}</p>
    )
}

export default ActionInfo
