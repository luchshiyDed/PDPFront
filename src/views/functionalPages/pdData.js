import React, { useEffect,useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { Button, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow,Paper,TableContainer
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PdProcess from "../../services/pdProcess/pdProcess";
import FormDialog from "../../components/dialog/dialog";
import api from '../../api.js';
const useStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    table: {
        minWidth: 650,
    },
    snackbar: {
        bottom: "104px",
    },
});
const fetchAddr='/PDP';
const fetchDat= async ()=>{
    
    const responce = await api.get(fetchAddr);
    return responce.data;
}
const deleteEntity=async (id)=>{
    try {
        let responce= await api.delete(fetchAddr+'/delete'+'/'+id); 
        
    } catch (error) {
        
    }
}
const sendDat=async (dat)=>{
    try {
        let responce= await api.post(fetchAddr+'/editMany', dat); 
        
    } catch (error) {
        
    }
    
}
const parseOne=(i)=>{
    for(const [key, value] of Object.entries(i)){
        if(value===null&& !(key==="id") )
            i[key]={name:""};
     }
    return i;
}
const parseResponce=(res)=>{

    res.map(i=>{  
        parseOne(i);
});

return res;
}

export default function PdData(){
    const sendData= sendDat;
    const fetchData=fetchDat;
    const rowNames=["id","Имя","документ","тип данных","ИСПДн","ИКОПД","цели","действия","субъекты","дата удаления","источник данных","куда отправляются","сотрудник","регламентирующий документ","доступ третьих лиц","тип процесса","место хранения данных"]
    const classes =useStyles();
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        fetchData()
          .then(res => {setRows(parseResponce(res));})
          .catch(error => {});
      }, []);
    const [open, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const [showConfirm, setShowConfirm] = React.useState(false);
 
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
 
    const handleAdd = () => {
        var newProc= new PdProcess([]);
        var newRow=parseOne(newProc);
        setRows([
            ...rows,
            newRow,
        ]);
        setEdit(true);
        setDisable(false);
        
    };
 
    const handleEdit = (i) => {
        setEdit(!isEdit);setDisable(false);
    };
 
    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
        setDisable(true);
        setOpen(true);
        sendData(rows);
    };
 
    const handleInputChange = (e, index,level=1,l2Name="name",isArray=false) => {
        const list = [...rows];
        
        const { name, value } = e.target;
        if(level===2)
            list[index][name][l2Name] = value;
        else
            list[index][name]=value;
        setRows(list);
        
    };
 
    const handleConfirm = () => {
        setShowConfirm(true);
    };
 
    const handleRemoveClick = (i) => {
        const list = [...rows];
        deleteEntity(rows[i].id);
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };
 
    const handleNo = () => {
        setShowConfirm(false);
    };

    const handleEnter=(event)=> {
        if (event.code=== "Enter"){
            var prevId=Number(event.target.id);
            if(prevId%rowNames.length===rowNames.length-2){
                handleSave()
                return
            }
            event.preventDefault();
            document.getElementById(prevId+1).focus();
        };
    }
    

    const createTableCells=(row,i)=>{
        const{
            id:id,
            name: pdName,
            pdTargets:trgts,
            pdSubjects:sbjcts,
            pdProcessActions:acts,
            deleteDate:date,
            source: source,
            destination: dest,
            employee:{
                id:eid,
                email: eName,
            },
            pdRegDoc:{
                id:prdid,
                name:prdName,
            },
            thirdPeople: tp,
            pdProcessType:{
                id:pdptid,
                name:pdtName,
            },
            pdStorage:{
                id:sid,
                name:sName,
            },
            pdDocument:{
                id:pdid,
                name:pddName,
            },
            pdType:{
                id:tid,
                name:tName,
            },
            ispdn:{
                id:ispdnid,
                name:ispdnName,
                defenceLevel: dl
            },
            icopd:{
                id:icopdid,
                name:icopdName,
            },
    
        }=row;

        const defualtCell=(i,j,val,name="name",level=1,l2Name="name",isArray=false)=>{

          const getText=(e=[])=>{
            let str="";
            e.map(el=>{return str+=el.name+","})
            str=str.slice(0,str.length-2);
            return str;
          }  
        if(isArray){
            return isEdit?<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center"><FormDialog id={i*rowNames.length+j}  name={name} values={val} onClose={(e)=>{rows[i][name]=e}}/></TableCell>:<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center">{getText(val)}</TableCell>
        }
        return isEdit?<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center"> 
        <input 
        id ={i*rowNames.length+j}
        name={name}
        onKeyDown={handleEnter}
        value={val}
        onChange={(row) => 
        handleInputChange(row, i,level,l2Name,isArray)}/></TableCell>:<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center">{val}</TableCell>
        }
        let j=-1;
       let arr=[
<TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center">{id}</TableCell>,
,defualtCell(i,j++,pdName),defualtCell(i,j++,pddName,"pdDocument",2),defualtCell(i,j++,tid,"pdType",2),defualtCell(i,j++,ispdnName,"ispdn",2),defualtCell(i,j++,icopdName,"icopd",2),defualtCell(i,j++,trgts,"pdTargets",2,"name",true),
defualtCell(i,j++,acts,"pdProcessActions",2,"name",true),defualtCell(i,j++,sbjcts,"pdSubjects",2,"name",true),isEdit?<TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center"> 
<input type="date"
id ={i*rowNames.length+j}
name={"deleteDate"}
onKeyDown={handleEnter}
value={date}
onChange={(row) => 
handleInputChange(row, i)}/></TableCell>:<TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center">{date}</TableCell>,
defualtCell(i,j++,source,"source"),defualtCell(i,j++,dest,"destination"),defualtCell(i,j++,eName,"employee",2,"email"),defualtCell(i,j++,prdName,"pdRegDoc",2),isEdit?<TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center"> 
<input type="checkbox"
id ={i*rowNames.length+j}
name={"thirdPeople"}
onKeyDown={handleEnter}
checked={tp}
onChange={(e) => 
{let list=[...rows]; list[i][e.target.name]=e.target.checked; setRows(list);}}/></TableCell>:<TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center">{tp.toString()}</TableCell>,
defualtCell(i,j++,pdtName,"pdProcessType",2),defualtCell(i,j++,sName,"pdStorage",2)];

    return arr;
    }
    return (
        <TableContainer component={Paper}>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                className={classes.snackbar}
            >
                <Alert onClose={handleClose} severity="success">
                    Record saved successfully!
                </Alert>
            </Snackbar>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        {isEdit ? (
                            <div>
                                <Button onClick={handleAdd}>
                                    <AddBoxIcon onClick={handleAdd} />
                                    ADD
                                </Button>
                                {rows.length !== 0 ? (
                                    <div>
                                        {disable ? (
                                            <Button disabled align="right"
                                                             onClick={handleSave}>
                                                <DoneIcon />
                                                SAVE
                                            </Button>
                                        ) : (
                                            <Button align="right" onClick={handleSave}>
                                                <DoneIcon />
                                                SAVE
                                            </Button>
                                        )}
                                    </div>
                                ):null}
                            </div>
                        ) : (
                            localStorage["role"]&&!(localStorage["role"]==="VIEWER")&&<div>
                                <Button onClick={handleAdd}>
                                    <AddBoxIcon onClick={handleAdd} />
                                    ADD
                                </Button>
                                <Button onClick={handleEdit}>
                                    <CreateIcon />
                                    EDIT
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <Table
                    className={classes.table}
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            {rowNames.map(e=>{return <TableCell align="center" colSpan={1} key={e}>{e}</TableCell>})}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => {
                            return (
                                    <TableRow key={i}>
                                        
                                        {createTableCells(row,i)}
                                        {isEdit ? (
                                            
                                            <TableCell><Button key={i} className="mr10"
                                                     onClick={handleConfirm}>
                                                <ClearIcon />
                                            </Button></TableCell>
                                        ) : (
                                            <TableCell><Button key={i} className="mr10"
                                                    onClick={handleConfirm}>
                                                <DeleteOutlineIcon />
                                            </Button></TableCell>
                                        )}
                                        {showConfirm && (
                                            <div>
                                                <Dialog
                                                    open={showConfirm}
                                                    onClose={handleNo}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby=
                                                        "alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Confirm Delete"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText 
                                                            id="alert-dialog-description">
                                                            Are you sure to delete
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => 
                                                            handleRemoveClick(i)}
                                                            color="primary"
                                                            autoFocus
                                                        >
                                                            Yes
                                                        </Button>
                                                        <Button
                                                            onClick={handleNo}
                                                            color="primary"
                                                            autoFocus
                                                        >
                                                            No
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        )}
                                    </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
        </TableContainer>
    );
}
