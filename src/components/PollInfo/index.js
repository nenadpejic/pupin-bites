import React from 'react';
import './style.css';

const PollInfo = (props) => {

    const showTime = (t) => {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date(t);
        if (Number.isNaN(d.getFullYear()) || d.getFullYear() === 1970) return "";
        let date = `${d.getDate() + ""}. ${monthNames[d.getMonth()]} ${d.getFullYear() + ""}.`;
        let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return date + " " + time;
    }

    const poll = props.poll;
    const pollName = poll.label;
    const pollCreated = poll.created;
    const pollEnds = new Date(poll.created)

    return (
        <table className="pollInfo">
            <thead>
                <tr style={{ height: "2em" }}><th colSpan="3" style={{ textAlign: "center" }}>{pollName}</th></tr>
            </thead>
            <tbody>
                <tr><td><b>Start</b></td><td colSpan="2">{showTime(pollCreated)} </td></tr>
                <tr><td><b>End</b></td><td colSpan="2">{showTime(pollEnds.setMinutes(pollEnds.getMinutes() + 30))}</td></tr>
            </tbody>
        </table>
    )
}

export default PollInfo;