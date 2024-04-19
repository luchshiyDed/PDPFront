import React, { useEffect,useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
    Box, Button, Snackbar, Table,
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
import axios from "axios";
import PdProcess from "../../services/pdProcess/pdProcess";
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
const fetchAddr="/employee";
const fetchDat= async ()=>{
    
    const responce = await api.get(fetchAddr);
    return responce.data;//.then(data=>{resp=data;});
}
const sendDat=async (dat)=>{
    var arr=[];
    dat.map(e=>{arr.push(createEmloyee(e));});
    try {
       let responce= await api.post(fetchAddr+'/editMany', arr);
    } catch (error) {
        
    }
    
}
const deleteEntity=async (id)=>{
    try {
        let responce= await api.delete(fetchAddr+'/delete'+'/'+id); 
        
    } catch (error) {
        
    }
}
const parseOne=(i)=>{
    for(const [key, value] of Object.entries(i)){
        i[key]=value?value:"";
     }
    const{
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

    }=i;
    
   
    return [id,name,sName,fName,email,jName,sdName,aName];
}
const createEmloyee=([id="",name="",sName="",fName="",email="",jName="",sdName="",aName=""])=>{
    return{
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

    }
}
const parseResponce=(res)=>{
    var arr=[];
    res.map(i=>{  
        arr.push(parseOne(i));
});

return arr;
}

export default function EmployeeData(){
    const sendData= sendDat;
    const fetchData=fetchDat;
    const rowNames=["id","Имя","Фамилия","Отчество","Почта","Должность","Подразделение","АРМ"]
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
        var newRow=parseOne(createEmloyee([]));
        setDisable(false);
        setRows([
            ...rows,
            newRow,
        ]);
        setEdit(true);
        
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
 
    const handleInputChange = (e, index) => {
        setDisable(false);
        const { name, value } = e.target;
        const list = [...rows];
        rows[index][Number(name)] = value;
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
            var prevId=Number(event.target.id)
            if(prevId%rowNames.length==rowNames.length-1){
                handleSave()
                return
            }
            event.preventDefault();
            document.getElementById(prevId+1).focus();
        };
    }
    

    const createTableCells=(row,i)=>{
       var arr=[];
        row.map((e,j)=>{
        arr.push(isEdit && j!=0?
        <TableCell key={i*rowNames.length+j} component="th" scope="row" align="center"> 
        <input 
        id ={i*rowNames.length+j}
        name={j}
        onKeyDown={handleEnter}
        value={e}
        onChange={(row) => 
        handleInputChange(row, i)}
    /></TableCell>:<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center">{e}
</TableCell>)
j=j+1});
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
