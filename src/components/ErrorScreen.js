import React from 'react';


function ErrorScreen(props){
  let errorClassName = props.apiError.showScreen ? "error--show" : "error--hide";
  return (
    <div className={errorClassName}>
      <p className="error__msg">There has been an error fetching the list data, please click below to retry:</p>
      <a href="/" className="error__reload btn">Reload</a>
    </div>
  )
}


export default ErrorScreen;
