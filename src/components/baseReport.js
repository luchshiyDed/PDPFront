import { Document, TableLayoutType,WidthType, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, TextDirection } from "docx";
export default async function createBaseReport({name="",subdivision="",rowNames=[],rdata=[]}){
const doc = new Document({sections:[]});
    
    
let rows=[
    new TableRow({
        width:{
            size: 10000,
            type:WidthType.DXA,
        },
        children: rowNames.map(e=> new TableCell({ 
            width: {
                size: 100/rowNames.length,
                type: WidthType.PERCENTAGE
            },
            children: [
            new Paragraph({
                text: e.name,
            }),]
        })),
    }),
];

rows=rows.concat( rdata.map(el=>
    new TableRow({
        children: rowNames.map(e=> new TableCell({ 
            width: {
                size: 100/rowNames.length,
                type: WidthType.PERCENTAGE
            },
            children: [
            new Paragraph({
                text: el[e.dictName].toString(),
            }),]
        })),
    }),
));
const table = new Table({
    layout:TableLayoutType.FIXED,
    width:{
        size: 10000,
        type:WidthType.DXA,
    },
    rows:[
        new TableRow({children:[new TableCell({children:[new Table({width:{ size: 10000,
            type:WidthType.DXA,},rows:rows})]})]}),
    ]
});
doc.addSection({
    properties: {},
    children: [new Paragraph({text:name}),table, 
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