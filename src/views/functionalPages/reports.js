import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Button } from '@material-ui/core';
import FormDialog from '../../components/dialog/dialog';
import createICOPDReport from '../../services/createICOPDReport';
import { Document, TableLayoutType,WidthType, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, TextDirection } from "docx";
import "../css/reports.css";
import createBaseReport from '../../components/baseReport';
export default function Report(){
    const [availibleReports,setAvailibleReports] = useState([]);
    const [report,setReport]=useState({name:"skip"});
    const createReport=(rp)=>{
        if(rp.name==="skip")
            return;
        if(rp.name==="ICOPD"){
            createICOPDReport(rp);
        }
        else{
            createBaseReport(rp);
        }
    }
    useEffect(()=>createReport(report),[report]);

    const getReport=(adress,body)=>{
            try{
            api.post(adress,body).then(responce=>setReport(responce.data)).catch(()=>{});
            }
            catch{
    
            }
    }
    const fetchData = () =>{
        try{
        api.get("/PDP/reports").then(responce=>setAvailibleReports(responce.data)).catch(()=>{});
        }
        catch{

        }
    }
    useEffect(fetchData,[]);
    //return <Button onClick={()=>createReport({name:"ICOPD"})}>A</Button>
    return (<div className='reports'>{availibleReports.map(e=>(<label>{e.name}<FormDialog name={e.name} names={e.reportProperties} onClose={(t)=>getReport(e.address,t.subdivision)}/></label>))}</div>)
}