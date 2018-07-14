import React from 'react';


function ResultsPanel(props){
  return (
    <div className="results-panel">
    <p className="results-panel__heading">Results</p>
     <ul className="results-panel__list">
        {props.results.map((answer, index)=>{
          let correctClass = answer.wasCorrect ? "results-panel__item--correct" : "results-panel__item--incorrect";
          return <li className={correctClass} key={index}>
            <span className="results-panel__text">{answer.text}</span>
          </li>
        })}
      </ul>
    </div>
  )
}


export default ResultsPanel;
