import React from 'react';


function Keyboard(props){
  let topRow = props.layout.top.map((letter, index)=>{
    return <span className="keyboard__letter" onClick={(e)=>{props.checkLetter(letter)}} key={index}>{letter.toUpperCase()}</span>
  });
  let middleRow = props.layout.middle.map((letter, index)=>{
    return <span className="keyboard__letter" onClick={(e)=>{props.checkLetter(letter)}} key={index}>{letter.toUpperCase()}</span>
  });
  let bottomRow = props.layout.bottom.map((letter, index)=>{
    return <span className="keyboard__letter" onClick={(e)=>{props.checkLetter(letter)}} key={index}>{letter.toUpperCase()}</span>
  })
  return (
    <div className="keyboard">
      <div className="keyboard__row">{topRow}</div>
      <div className="keyboard__row">{middleRow}</div>
      <div className="keyboard__row">{bottomRow}</div>

    </div>
  )
}


export default Keyboard;
