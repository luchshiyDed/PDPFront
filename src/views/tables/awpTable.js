
import EditableTable from "./table"
import { fromArray, toArray } from "../../services/arrayStringParser";

const parseEntity=({
    id:id,
    name: name,
    location: loc,
    subdivision:{
        name:sdName
    },
    type: tp,
    ispdns: ispdns

   
})=>{

    
   return {id:id?id:"",name:name,location:loc,ispdns:fromArray(ispdns),type:tp,subdivision:sdName};
}
const createEntity=({id=null,name="",location="",type="",ispdns="",subdivision=""})=>{
    return {
        id:id,
        name: name,
        location: location,
        type: type,
        subdivision: {name:subdivision},
        ispdns: toArray(ispdns)
       
    };
}
export default function AWPTable(){
    
    const rowNames=[{name:"Имя",dictName:"name",type:"text"},{name:"Локация",dictName:"location",type:"text"},
    {name:"Тип",dictName:"type",type:"text"},{name:"Подразделение",dictName:"subdivision",type:"text"},{name:"ИСПДн",dictName:"ispdns",type:"text"}];

    return <EditableTable tableInfo={rowNames} createEntity={createEntity} parseEntity={parseEntity} fetchAddress="/awp"/>;
}