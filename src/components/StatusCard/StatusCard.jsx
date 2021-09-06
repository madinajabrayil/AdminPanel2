import React from "react";
import './StatusCard.css';
// import 'boxicons';

const StatusCard = (props) => {
    return(
     <div className="status-card">
        <div className="status-card-icon">
            {/* <box-icon  name={props.icon}></box-icon> */}
            <i className={props.icon}></i>
        </div>
        <div className="status-card-info">
            <h4>{props.count}</h4>
            <span>{props.title}</span>
        </div>
      </div>
    )
}

export default StatusCard;