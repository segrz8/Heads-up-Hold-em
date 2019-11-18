import React from 'react'
import './ActionInfo.scss';

function ActionInfo(props) {
    const { actionInfo } = props
    return (
        <div className="actionInfo">
            <p>{actionInfo}</p>
        </div>
    )
}

export default ActionInfo
