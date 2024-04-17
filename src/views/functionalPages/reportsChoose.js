import "../css/reports.css";
const getAvailibleReports=()=>{
    return ["a","b","c"];
}
export default function ReportsData(){

    return <div className="buttons">
        {getAvailibleReports().map((e,i)=><button key={i}>{e}</button>)}
    </div>
}