import React from 'react';


function Strike(props){
  return (
    <span className="strikes-bar__strike" key={props.index} >
      <i className="far fa-times-circle"></i>
    </span>
  )
}


export default Strike;
