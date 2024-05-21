
import EditableTable from "./table"
import { fromArray, toArray } from "../../services/arrayStringParser";

const parseEntity=( {
    id:id,
    name: name,
    subdivision:{
        name:sdName
    },
    awps:awp,
    activationDate:date,
    isActive:isActive
})=>{

    
   return {id:id?id:"",name:name,subdivision:sdName,awp:fromArray(awp),activationDate:date,isActive:isActive};
}
const createEntity=({id=null,name="",subdivision="",awp="",activationDate="4444-03-21",isActive=false})=>{
    return{
        id:id,
        name: name,
        subdivision:{
            name:subdivision
        },
        awps:toArray(awp),
        activationDate:activationDate,
        isActive: isActive
    };
}
export default function ICOPDTable(){
    
    const rowNames=[{name:"Имя",dictName:"name",type:"text"},{name:"подразделение",dictName:"subdivision",type:"text"},
    {name:"АРМ",dictName:"awp",type:"text"},{name:"Дата активации",dictName:"activationDate",type:"date"},
    {name:"Активировано",dictName:"isActive",type:"checkbox"}];

    return <EditableTable tableInfo={rowNames} createEntity={createEntity} parseEntity={parseEntity} fetchAddress="/icopd"/>;
}