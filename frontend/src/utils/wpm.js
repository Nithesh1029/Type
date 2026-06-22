export const calculateCorrectness=(typedChara, correctyped)=>{
    return typedChara.filter((char,index)=>
        char===correctyped[index]
    ).length;
}



export const wordsPerMinute=(correctWords, elapsedTime)=>{
    if(elapsedTime==0)return 0;
    const minutes=elapsedTime/60;
    return Math.round((correctWords/5)/minutes)
}