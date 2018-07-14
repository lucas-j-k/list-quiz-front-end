import React from 'react';

import Strike from './Strike';

function Strikes(props){
  let strikesMarkup = [];
  for(let i = 0; i < props.strikes; i++){
    strikesMarkup.push(<Strike index={i} />);
  }
  return (
    <div className="strikes-bar">
      <span className="strikes-bar__heading">Strikes:</span>
      <div className="strikes-bar__strikes-wrapper">
        {strikesMarkup}
      </div>
    </div>
  )
}


export default Strikes;
