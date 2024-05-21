export const fromArray=(arr)=>{
    let res="";

    arr.map(e=>{res+=e.name.toString()+","});
    res=res.slice(0,res.length-1);
    return res;
}
export const toArray=(str)=>{
    let tmp=str.split(",");
    let tmp2=tmp.filter(e=>!(e===""));
    let arr=[];
    tmp2.map(e=>{arr.push({name:e})})
    return arr;
}
export const toString=(val)=>{
    if(val)
        return val.toString();
    return "";
}