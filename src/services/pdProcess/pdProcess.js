import { toArray } from "../arrayStringParser";
export class PdProcess{
    constructor({id=null,name="", pdDocument="",pdType="",pdProcessPlace="", subdivision="",pdTargets="",pdProcessActions="",pdSubjects="",deleteCondition="",source="",destination="",employee="", pdRegDoc="",thirdPeople=false,pdProcessType="",pdStorage="",auto=false}){
        this.id=id?id:null;
        this.name=name;
        this.pdTargets={name:pdTargets};
        this.pdSubjects=toArray(pdSubjects);
        this.pdProcessActions=toArray(pdProcessActions);
        this.pdType=toArray(pdType);
        deleteCondition=deleteCondition.replace(",","");
        this.deleteCondition={name:deleteCondition};
        this.auto=auto;
        this.source=source;
        this.destination=destination;
        this.employee={email:employee};
        this.pdRegDoc={name:pdRegDoc};
        this.thirdPeople=thirdPeople;
        this.pdProcessType={name:pdProcessType};
        this.pdStorage={name:pdStorage};
        this.pdDocument={name:pdDocument};
        this.pdProcessPlace={name:pdProcessPlace};
        this.subdivision={name:subdivision};
    }
}
export const proccessNames=[{name:"Имя",dictName:"name",type:"text"},
{name:"Документ содержащий ПД",dictName:"pdDocument",type:"text",fetchAddress:"/pddocument"},
{name:"Субъекты ПД",dictName:"pdSubjects",type:"text",fetchAddress:"/subject"},
{name:"Наименование ПД",dictName:"pdType",type:"text",fetchAddress:"/type"},
{name:"Цели обработки",dictName:"pdTargets",type:"text",fetchAddress:"/pdtarget"},
{name:"Правовые основания",dictName:"pdRegDoc",type:"text"},
{name:"Степень автоматизации",dictName:"auto",type:"checkbox"},
{name:"Место хранения данных",dictName:"pdStorage",type:"text",fetchAddress:"/awp/awp"},
{name:"Место обработки данных",dictName:"pdProcessPlace",type:"text",fetchAddress:"/awp/awp"},
{name:"Действия с ПД",dictName:"pdProcessActions",type:"text",fetchAddress:"/pdprocessaction"},
{name:"Срок хранения",dictName:"deleteCondition",type:"text",fetchAddress:"/deletecondition"},
{name:"Источник данных",dictName:"source",type:"text"},
{name:"Куда передаются",dictName:"destination",type:"text"},
{name:"Сотрудник ответственный за обработку",dictName:"employee",type:"email",fetchAddress:"/employee/employee"},
{name:"Доступ третьих лиц",dictName:"thirdPeople",type:"checkbox"},
{name:"Тип процесса",dictName:"pdProcessType",type:"text"}];