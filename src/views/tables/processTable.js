import {PdProcess,proccessNames} from "../../services/pdProcess/pdProcess";
import EditableTable from "./table"
import { fromArray } from "../../services/arrayStringParser";
const parseEntity=({
    id:id="",
    name: pdName="",
    pdTargets:{
        name:pdtarget
    },
    pdSubjects:sbjcts=[],
    pdProcessActions:acts=[],
    deleteCondition:{name:deleteCondition=""},
    source: source="",
    destination: dest="",
    employee:{
        email: eName="",
    }={},
    pdRegDoc:{
        name:prdName="",
    }={},
    thirdPeople: tp=false,
    pdProcessType:{
        name:pdtName="",
    }={},
    pdStorage:{
        name:sName="",
    }={},
    pdProcessPlace:{
        name:s1Name=""
    },
    pdDocument:{
        name:pddName="",
    }={},
    pdType:typs=[],
    auto:auto=false,

})=>{

    let sbjct=fromArray(sbjcts);
    let act=fromArray(acts);
    let tps=fromArray(typs);
    

    
   return {id:id?id:"",name:pdName,pdDocument:pddName,pdType:tps,
    pdTargets:pdtarget,pdProcessActions:act,pdSubjects:sbjct,deleteCondition:deleteCondition,auto:auto,pdProcessPlace:s1Name,source:source,destination:dest,employee:eName,pdRegDoc:prdName,
    thirdPeople:tp,pdProcessType:pdtName,pdStorage:sName};
}
const createEntity=(e)=>{
    return new PdProcess(e);
}

export default function ProcessTable(){
    const rowNames=proccessNames;

    return <EditableTable tableInfo={rowNames} createEntity={createEntity} parseEntity={parseEntity} fetchAddress="/PDP"/>;
}