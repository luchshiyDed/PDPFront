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
const fetchAddr="/AWP";
const fetchDat= async ()=>{
    const responce = await api.get(fetchAddr);
    return responce.data;//.then(data=>{resp=data;});
}
const sendDat=async (dat)=>{
    try {
      let responce=await api.post(fetchAddr+'/editMany',  dat);  
    } catch (error) {
        
    }
    
}
const parseOne=(i)=>{
    for(const [key, value] of Object.entries(i)){
        i[key]=value?value:"";
     }
    return i;
}

const parseResponce=(res)=>{
    var arr=[];
    res.map(i=>{  
        arr.push(parseOne(i));
});

return arr;
}

const createAWP=([id="",name="",loc="",tp="",ispdns=[]])=>{
    return {
        id:id,
        name: name,
        location: loc,
        type: tp,
        ispdns: ispdns
       
    };
}
export default function AWPData(){
    const sendData= sendDat;
    const fetchData=fetchDat;
    const rowNames=["id","Имя","Локация","Тип","ИСПДн"]
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
        setDisable(false);
        var newRow=parseOne(createAWP([]));
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
            if(prevId%rowNames.length==rowNames.length-2){
                handleSave()
                return
            }
            event.preventDefault();
            document.getElementById(prevId+1).focus();
        };
    }
    

    const createTableCells=(row,i)=>{
        const defualtCell=(i,j,val,name="name",level=1,l2Name="name",isArray=false)=>{

            const getText=(e=[])=>{
              let str="";
              e.map(el=>{str+=el.name+","})
              str=str.slice(0,str.length-2);
              return str;
            }  
          if(isArray){
              return isEdit?<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center"><FormDialog name={name} values={val} onClose={(e)=>{rows[i][name]=e}}/></TableCell>:<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center">{getText(val)}</TableCell>
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
        const{
            id:id,
            name: name,
            location: loc,
            type: tp,
            ispdns: ispdns
           
        }=row;
        let j=-1;
       var arr=[
        <TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center" >{id}</TableCell>,
        defualtCell(i,j++,name),defualtCell(i,j++,loc,"location"),defualtCell(i,j++,tp,"type"),defualtCell(i,j++,ispdns,"ispdns",2,"name",true)
       ];
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
                            <div>
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
