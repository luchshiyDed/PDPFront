import EditableTable from "./table"
import { fromArray, toArray } from "../../services/arrayStringParser";

const parseEntity=( {
    id:id,
    name: name,
    defenceLevel: defenceLevel="ONE",
    overBorder: overBorder,
    location:location=""
})=>{

    
   return {id:id?id:"",name:name,defenceLevel:defenceLevel,overBorder:overBorder,location:location};
}
const createEntity=({id=null,name="",defenceLevel="ONE",overBorder=false,location=""})=>{
    return{
        id:id,
        name: name,
        defenceLevel:defenceLevel,
        overBorder:overBorder,
        location:location
    };
}
export default function ISPDNTable(){
    
    const rowNames=[{name:"Имя",dictName:"name",type:"text"},{name:"Уровень защиты",dictName:"defenceLevel",type:"text"},
    {name:"Трансграничная передеча",dictName:"overBorder",type:"checkbox"},{name:"Местоположение",dictName:"location",type:"text"}];

    return <EditableTable tableInfo={rowNames} createEntity={createEntity} parseEntity={parseEntity} fetchAddress="/ispdn"/>;
}