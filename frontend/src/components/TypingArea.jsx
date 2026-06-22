import React, { useState } from 'react'
import { paragraphs } from '../data/paragraphs';
const TypingArea = () => {
    const getRandomId=()=>{
        return paragraphs[Math.floor(Math.random()*paragraphs.length)].id;
    }
    const [ranNum,setRanNum]=useState(getRandomId);

    const randomNum=()=>{
        setRanNum(getRandomId());
    }
    
    
        console.log(ranNum);
        const para=paragraphs.find(p=>p.id===ranNum);

    
  return (
    <div>
      {para &&(
        <div>
            <h4>{para.text}</h4>
        </div>
      )}
      <button onClick={randomNum} className='border'>Change Text</button>
    </div>
  )
}

export default TypingArea
