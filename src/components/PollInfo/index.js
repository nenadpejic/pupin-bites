import React from 'react';
import './style.css';

const PollInfo = (props)=>{

    const showTime = (t)=>{
        let monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        let d = new Date(t);
        if(Number.isNaN(d.getFullYear()) || d.getFullYear()===1970) return "";
        let date = `${d.getDate()+""}. ${monthNames[d.getMonth()]} ${d.getFullYear()+""}.`;
        let time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        return date + " " + time;
    }   

    const pollName = props.pollName;
    const pollCreated = props.pollCreated;
    const pollEnds = props.pollEnds;
 
    return( 
        <table className="pollInfo">
            <thead>
            <tr><th colSpan="3" style={{textAlign:"center"}}>{pollName}</th></tr>
            </thead>
            <tbody>
            <tr><th>Start</th><td colSpan="2">{showTime(pollCreated)} </td></tr>
            <tr><th>End</th><td colSpan="2">{showTime(pollEnds)}</td></tr>
            </tbody>
        </table> 
    )  
}

export default PollInfo;