import React from 'react';

function LetterAnimation ({string_txt}) {
    const text = string_txt // Ensure this is a string
  
    if (typeof text !== "string") {
      return <div>Error: text is not a string</div>;
    }
  
    return (
      <div style={{ fontSize: '50px',textAlign:'center', fontWeight: 'bold' ,alignContent:'center',alignItems:"center"}}>
        {text.split("").map((letter, index) => (
          <span key={index} className="animated-letter" style={{ display: 'inline-block' }}>
            {letter}
          </span>
        ))}
      </div>
    );
  }

export default LetterAnimation;
