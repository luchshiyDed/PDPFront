import { Document, TableLayoutType,WidthType, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, TextDirection } from "docx";
import { fromArray } from "./arrayStringParser";
import { proccessNames } from "./pdProcess/pdProcess";
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
    pdTargets:pdtarget,pdProcessActions:act,pdSubjects:sbjct,deleteCondition:deleteCondition,auto:auto?"Автоматизированная":"Неавтоматизированная",pdProcessPlace:s1Name,source:source,destination:dest,employee:eName,pdRegDoc:prdName,
    thirdPeople:tp,pdProcessType:pdtName,pdStorage:sName};
}



export default async function createICOPDReport({name="",subdivision="",pdProcesses=[],employees=[]}){

    const parseOne=(i)=>{
        for(const [key, value] of Object.entries(i)){
          if(value===null&& !(key==="id") )
            i[key]={name:""};
        }
    return i;
    }
    let processArr=pdProcesses.map(e=>parseEntity(parseOne(e)));
   

    const rowNames=proccessNames;
    const secondRowNames=[{name:"Почта",dictName:"email",type:"text"},
    {name:"Должность",dictName:"job",type:"text"},
    {name:"наименование АРМ",dictName:"awpName",type:"text"},
    {name:"Локация",dictName:"location",type:"text"},
    {name:"Тип",dictName:"type",type:"text"},
    {name:"ИСПДн",dictName:"ispdns",type:"text"}];

    
    const doc = new Document({sections:[]});
    
    
    let rows=[
        new TableRow({
            width:{
                size: 10000,
                type:WidthType.DXA,
            },
            children: rowNames.map(e=> new TableCell({ 
                width: {
                    size: e.dictName==="pdType"?35:5,
                    type: WidthType.PERCENTAGE
                },
                children: [
                new Paragraph({
                    text: e.name,
                }),]
            })),
        }),
    ];

    rows=rows.concat( processArr.map(el=>
        new TableRow({
            children: rowNames.map(e=> new TableCell({ 
                width: {
                    size: el.dictName==="PdType"?35:5,
                    type: WidthType.PERCENTAGE
                },
                children: [
                new Paragraph({
                    text: el[e.dictName].toString(),
                }),]
            })),
        }),
    ));
    let rows2=[];
    rows2.push(new TableRow({
        children: secondRowNames.map(e=> new TableCell({ 
            width: {
                size: 100/secondRowNames.length,
                type: WidthType.PERCENTAGE
            },
            children: [
            new Paragraph({
                text: e.name,
            }),]
        })),
    }));
    rows2=rows2.concat( employees.map(em=>{
       return new TableRow({
            children: secondRowNames.map(e=> {return new TableCell({ 
                width: {
                    size: 100/secondRowNames.length,
                    type: WidthType.PERCENTAGE
                },
                children: [
                new Paragraph({
                    text: em[e.dictName].toString(),
                }),]
            })}),
        })}
    ),);
    const table = new Table({
        layout:TableLayoutType.FIXED,
        width:{
            size: 10000,
            type:WidthType.DXA,
        },
        rows:[
            new TableRow({children:[new TableCell({children:[new Table({width:{ size: 10000,
                type:WidthType.DXA,},rows:rows})]})]}),
            new TableRow({children:[new TableCell( {children:[new Table({width:{ size: 10000,
                type:WidthType.DXA,},rows:rows2})]})]})
        ]
    });
    doc.addSection({
        properties: {},
        children: [new Paragraph({text:"ИНФОРМАЦИОНАЯ КАРТА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ПОДРАЗДЕЛЕНИЯ: "+subdivision}),table, 
        new Paragraph({text:"Подпись ответственного за обработку персональных данных в подразделении:_______   _________ 20__ г."})],
      });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'generated_document.docx');


    link.addEventListener('click', () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    });

    link.click();
}