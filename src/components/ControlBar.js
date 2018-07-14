import React from 'react';


function ControlBar(props){
  return (
    <div className="control-bar">
      <span className="control-bar__title">{props.title}</span>
      <span className="control-bar__current">{props.currentListName}</span>
      <button className="control-bar__link btn" href="#" onClick={(e)=>{props.toggleMenu(true)}}><i className="fas fa-bars"></i></button>
    </div>
  )
}


export default ControlBar;
