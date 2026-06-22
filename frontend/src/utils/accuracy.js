export const Accuracy=(correctChara,total)=>{
    if(total==0)return;
    return Math.round((correctChara/total)*100);
}