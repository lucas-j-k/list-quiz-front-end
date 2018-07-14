import React from 'react';


function Prompt(props){
  return (
    <div className="prompt">
      <div className="prompt__current-guess">{props.currentGuess}</div>
    </div>
  )
}


export default Prompt;
