import React from 'react'
import './PlayersHUDs.scss'

function PlayersHUDs(props) {
    const { player1money, player2money, player1card1, player1card2, player2card1, player2card2, renderCard, determineSuit, showPlayer2cards } = props

    if (!player1card1) return (
        <>
            <div className="player1">
                <div className="player1__stack1">{player1money}</div>
            </div>
            <div className="player2">
                <div className="player2__stack2">{player2money}</div>
            </div>
        </>
    ); else return (
        <>
            <div className="player1">
                <div className="player1__stack1">{player1money}</div>
                <div className={`card card1 ${renderCard(player1card1)}`}>{<div><p>{player1card1.valueFont}</p> <div className="suit"><img src={determineSuit(player1card1.suit)} alt="suit" /></div></div>}</div>
                <div className={`card card2 ${renderCard(player1card2)}`}>{<div><p>{player1card2.valueFont}</p> <div className="suit"><img src={determineSuit(player1card2.suit)} alt="suit" /></div></div>}</div>
            </div>
            <div className="player2">
                <div className="player2__stack2">{player2money}</div>

                {showPlayer2cards ?
                    <div className={`card card1 ${renderCard(player2card1)}`}>{<div><p>{player2card1.valueFont}</p> <div className="suit"><img src={determineSuit(player2card1.suit)} alt="suit" /></div></div>}</div> :
                    <div className={"player2__cardBack card1"}></div>}

                {showPlayer2cards ?
                    <div className={`card card2 ${renderCard(player2card2)}`}>{<div><p>{player2card2.valueFont}</p> <div className="suit"><img src={determineSuit(player2card2.suit)} alt="suit" /></div></div>}</div> :
                    <div className={"player2__cardBack card2"}></div>}
            </div>
        </>
    )
}

export default PlayersHUDs
