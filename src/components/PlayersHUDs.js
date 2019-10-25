import React from 'react'
import './PlayersHUDs.css'

function PlayersHUDs(props) {
    const { player1money, player2money, player1card1, player1card2, player2card1, player2card2, renderCard } = props
    if (!player1card1) return (
        <div>
            <div className="player1">
                <div className="stack1">{player1money}</div>
            </div>
            <div className="player2">
                <div className="stack2">{player2money}</div>
            </div>
        </div>
    ); else return (
        <div>
            <div className="player1">
                <div className="stack1">{player1money}</div>
                <div className={`card card1 ${renderCard(player1card1)}`}>{<div><p>{player1card1.valueFont}</p> <p className="suitFont">{player1card1.suitFont}</p></div>}</div>
                <div className={`card card2 ${renderCard(player1card2)}`}>{<div><p>{player1card2.valueFont}</p> <p className="suitFont">{player1card2.suitFont}</p></div>}</div>
            </div>
            <div className="player2">
                <div className="stack2">{player2money}</div>
                <div className={`card card1 ${renderCard(player2card1)}`}>{<div><p>{player2card1.valueFont}</p> <p className="suitFont">{player2card1.suitFont}</p></div>}</div>
                <div className={`card card2 ${renderCard(player2card2)}`}>{<div><p>{player2card2.valueFont}</p> <p className="suitFont">{player2card2.suitFont}</p></div>}</div>
            </div>
        </div>
    )
}

export default PlayersHUDs
