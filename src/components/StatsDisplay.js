import React, { useState, useEffect, useContext } from 'react';

import {GameContext} from '../contexts';

const StatsDisplay = () => {
    const [time, setTime] = useState(0)
    const {gameWon, gameOver, numberOfRemainingMines, level, bestTimes, setBestTimes} = useContext(GameContext)
    useEffect(()=>{
        let interval
        if(!gameOver || !gameWon) {
            interval = setInterval(()=>{
            if(gameOver || gameWon) {
                clearInterval(interval)
                if(gameWon) {
                    if(time < bestTimes[level]) {
                        const updatedBestTimes = {...bestTimes, [level]: time}
                        setBestTimes(updatedBestTimes)
                        localStorage.setItem('mineSweeperScores', JSON.stringify(updatedBestTimes))
                    }
                    
                }
            }
            setTime(prevState => prevState + 1)  
        }, 1000)
        }   
        return () => {if(interval) clearInterval(interval)}
    }, [gameOver, gameWon, level, bestTimes, setBestTimes, time])


    return(<div className="stats-display">
        <div></div>
        <div>
            <div>Time</div>
            <div>{time}</div>
        </div>
        <div>
            <div>Remaining mines</div>
            <div>{numberOfRemainingMines}</div>
        </div>
        <div>
            <div>Best Time</div>
            <div>{bestTimes[level]} seconds</div>
        </div>
        <div></div>
    </div>)
}

export default StatsDisplay