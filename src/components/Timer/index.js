import React, {useState, useRef, useEffect} from 'react';

const Timer = () => {
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState('00:00:00')

    function getTimeRemaining(endtime){
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60);
        const minutes = Math.floor( (total/1000/60) % 60);
        const hours = Math.floor( (total/1000*60*60) % 24);
        const days = Math.floor(total/ (1000*60*60*24));
        return {
            total, seconds, minutes, hours, days
        };
    }
    //update the timer and also stop it when the timer reach to zero
    function startTimer(deadline) {
        let {  total, seconds, minutes, hours, days } = getTimeRemaining(deadline);
        if(total >= 0){
            setTimer(
                (hours > 9 ? hours : '0'+ hours) + ':' +
                (minutes > 9 ? minutes : '0'+ minutes) + ':' +
                (seconds > 9 ? seconds : '0'+ seconds)
            )
            }else{
                clearInterval(intervalRef.current);
            }
        }

        //reset the timer starting from the start
        //we can also use this function when updating the question
        function clearTimer(endtime) {
            //declared 20 sec for each question
            setTimer('00:00:20');
            if(intervalRef.current) clearInterval(intervalRef.current);
            const id = setInterval(() => {
                startTimer(endtime)
            }, 1000)
            intervalRef.current = id;
    }

    function getDeadlineTime(){
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 20);
        return deadline;
    }

    useEffect(() => {
    clearTimer(getDeadlineTime());
    //this will be run when the component will unmount
    return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
    }, []) //we put empty array to act as componentDidMount only

    function onClickResetBtn(){
        if(intervalRef.current) clearInterval(intervalRef.current);//avoid memory leak
        clearTimer(getDeadlineTime())
    }

    return (
        <div>
        <h2>{timer}</h2>
        <button onClick={onClickResetBtn}>Reset</button>
        </div>
    );
}

export default Timer;