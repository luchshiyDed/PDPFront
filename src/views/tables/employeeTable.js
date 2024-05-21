
import EditableTable from "./table"


const parseEntity=({
    id:id,
    name: name,
    secondName: sName,
    fatherName: fName,
    email:email,
    job:{
        name:jName
    },
    subdivision:{
        name: sdName
    },
    awp:{
        name: aName
    },

})=>{

    
   return {id:id?id:"",name:name,secondName:sName,fatherName:fName,subdivision:sdName,awp:aName,job:jName,email:email};
}
const createEntity=({id=null,name="",secondName="",subdivision="",job="",fatherName="",email="",awp=null})=>{
    let awp1={
        name:awp
    }
    if(!awp){
        awp1=null;
    }
    
    return{
        id:id,
        name: name,
        secondName: secondName,
        fatherName: fatherName,
        email:email,
        job:{
            name:job
        },
        subdivision:{
            name: subdivision
        },
        awp:awp1,

    };
}
export default function EmployeeTable(){
    
    const rowNames=[{name:"Почта",dictName:"email",type:"text"},{name:"подразделение",dictName:"subdivision",type:"text"},
    {name:"Должность",dictName:"job",type:"text"},
    {name:"Имя",dictName:"name",type:"text"},
    {name:"Фамилия",dictName:"secondName",type:"text"},
    {name:"Отчество",dictName:"fatherName",type:"text"},
    {name:"АРМ",dictName:"awp",type:"text"}
    ];

    return <EditableTable tableInfo={rowNames} createEntity={createEntity} parseEntity={parseEntity} fetchAddress="/employee"/>;
}