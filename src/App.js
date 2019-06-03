//  when coe back look into setting previousNap and get everything running :)
// Make sure the next naps are displaying as 12 instead of 0

import React, { useState } from 'react'

function sleepCalc() {
     const [time, setTime] = useState('22:30');
     const [sleepHour, setSleepHour] = useState(24);
     const [sleepMinute, setSleepMinute] = useState(30);
     const [previousNap, setPreviousNap] = useState((sleepHour + napType) % 12)
    
        // setHourMinute = () => {
        //     const sleepTime = (time || '').split(':')
        //     const sleepHour = sleepTime[0]
        //     const sleepMinute = sleepTime[1]
    
        //     return 'sleep Hour: ' + sleepHour + ', sleep Minute: ' + sleepMinute
        // }
        console.log(time)
        
        const sleepTime = (`${time}` || '').split(':')
    
        const handleSubmit = event => {
            event.preventDefault()
            setSleepHour(parseInt(sleepTime[0]))
            setSleepMinute(parseInt(sleepTime[1]))
        }
    
        // Defining how long my naps length options
        const twentyMinNap = 20
        const thirtyMinNap = 30
        const triphasicNapTime = 90
    
        // defining the amount of time between naps depending on sleep schedule type
        const biphasicHourTillNextNap = 4
        const dymaxionHourTillNextNap = 6
        const triphasicHourTillNextNap = 8
    
        // defining my function variables for what kind of sleep schedule I'm on and how long I want my naps to be
        const napType = biphasicHourTillNextNap
        const napLength = thirtyMinNap

        // const setNapTypeToLength = (napType) => {
        //     if ( napType = biphasicHourTillNextNap ) {
        //         return napLength = thirtyMinNap
        //     } else if ( napType = dymaxionHourTillNextNap ) {
        //         return napLength = twentyMinNap
        //     } else if ( napType = triphasicHourTillNextNap ) {
        //         return napLength = triphasicNapTime
        //     } else {
        //         return 'Error: Make a selection'
        //     }
        // }
    
        // converting hours and minutes into seconds for math functions
        const sleepHourInSeconds = () => {
            return (sleepHour * 60 * 60)
        }
    
        const sleepMinuteInSeconds = () => { 
            return (sleepMinute * 60)
        }
    
        // converting time till next nap into seconds
        const timeTillNextNap = () => { 
            return (napType * 60 * 60)
        }
    
        // nap time minutes to seconds
        const napTimeInSec = () => {
            return (napLength * 60)
        }
    
        // transforming hour and minute to a user display
        function minuteDisplay () {
            if (sleepMinute < 10){
                return '0' + sleepMinute 
            } else {
                return sleepMinute
            }
        }
    
        // Transforming any hours equalling 24, 12 or 0 to return 12, or return everything in between as a AM/PM number
        function sleepHourDisplay() {
            if (sleepHour === 24 || sleepHour === 12 || sleepHour === 0){
                return 12
            } else {
                return sleepHour % 12
            }
        }
    
        // displaying sleep time
        function sleepDisplay() {
            return ( sleepHourDisplay() + ':' + minuteDisplay() )
        }
    
        // setting wake up minute
        const wakeUpMinRemainder = () => { 
            return (
                (((sleepMinuteInSeconds() + napTimeInSec()) / 60) % 60) 
            )
        }
    
        // minute wake up time
        const wakeUpMinute = () => {
            if ( wakeUpMinRemainder() < 10 ) {
                return '0' + wakeUpMinRemainder()
            } else {
                return wakeUpMinRemainder()
            }
        }

        // Prevents returning 0 when the next nap hour equals 0, 12, or 24
        const wakeUpHour = () => {
            if ( ( sleepHour === 24 && sleepMinute < ( 60 - napLength ) ) || ( sleepHour === 12 && sleepMinute < ( 60 - napLength ) )) {
                return 12
            } else if ( ( sleepHour === 23 && sleepMinute >= ( 60 - napLength ) ) || ( sleepHour === 11 && sleepMinute >= ( 60 - napLength ) )) {
                return 12
            } else if ( sleepMinute >= ( 60 - napLength ) ) {
                return ( sleepHour + 1 ) % 12
            }  else {
                return sleepHour % 12
            }
        }
    
        const wakeUpTime = () => {
            return(
                wakeUpHour() + ':' + wakeUpMinute()
            )
        }

        // Prevents return 0 when the next nap hour equals 0, 12, or 24
        const nextNapHour = () => {
            if ( ( sleepHour === (24 - napType) && sleepMinute < ( 60 - napType ) ) || ( sleepHour === (12 - napType) && sleepMinute < ( 60 - napType ) )) {
                return 12
            } else if ( ( sleepHour === (23 - napType) && sleepMinute >= ( 60 - napType ) ) || ( sleepHour === (11 - napType) && sleepMinute >= ( 60 - napType ) )) {
                return 12
            } else if ( sleepMinute >= ( 60 - napType ) ) {
                return ( sleepHour + 1 ) % 12
            }  else {
                return  ((timeTillNextNap() + sleepHourInSeconds()) / 60 / 60) %12
            }
        }

        const nextNapDisplay = () => nextNapHour() + ':' + minuteDisplay()

        let nextNapTimes = []
        // setting next nap time
        for (var i = (sleepHour + napType); i <= (sleepHour + 24); i += napType) {
                nextNapTimes.push(i % 12)
        };

        const amPm = (sleepHour) => {
            if ((sleepHour % 24) < 12 ) {
                return sleepDisplay() + ' AM'
            } else {
                return sleepDisplay() + ' PM'
            }
        }

        console.log(amPm())

        // for (var i = sleepHour; i <= (sleepHour + 24); i += napType) {
        //     nextNapTimes.push('Next nap will be at ' + i % 12)
        // }

        const nextNapTimesDisplay = () => {
            nextNapTimes.forEach((nextNap) => {
                console.log(nextNap + ':' + sleepMinute)
            })
        }
        // const nextNapTimesDisplay = () => {
        //     nextNapTimes.forEach(function(nextNap) {
        //         return('Your next nap will be at: ' + nextNap)
        //     })
        // }

        console.log(nextNapTimes)

        console.log(previousNap)

        // console.log(nextNapTime())

        const nextNap2 = () => {
            return (nextNapHour() + napType) + ':' + minuteDisplay()
        }

        console.log((parseInt((nextNap2().split(':')[0])) + napType))

        const nextNap3 = () => {
            return (parseInt((nextNap2().split(':')[0])) + napType)
        }

        console.log(nextNap3())

            return (
                <div>
                <form onSubmit = {handleSubmit} >
                    <input type='time' onChange = {(event) => setTime(event.target.value)}/>
                    <input type='submit' value = 'Submit'/>
                    <p>Your sleep time is {sleepDisplay()}</p>
                    <p>Wake up in {napLength} minutes</p>
                    <p>Wake up at {wakeUpTime()}</p>
                    <p>Your next naps will be at {nextNapDisplay()}</p>
                    <p></p>
                    { nextNapTimesDisplay() }
                    {/* {addTimes} */}
                </form>
            </div>
        )}

export default sleepCalc