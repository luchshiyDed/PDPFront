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
const fetchAddr='/auth';
const fetchDat= async ()=>{
    
    const responce = await api.get(fetchAddr+"/users");
    return responce.data;
}
const parseOne=(i)=>{
    for(const [key, value] of Object.entries(i)){
        i[key]=value?value:"";
     }
    return i;
}
const createUser=([id="",name="",sdName="",role="VIEWER",allSubdivisions=false])=>{
    return{
        id:id,
        name: name,
        allSubdivisions:allSubdivisions,
        subdivision:sdName,
        role:role
    }
}
const parseResponce=(res)=>{
    var arr=[];
    
    res.map(i=>{  
        
        arr.push(parseOne(i));
        
});
return arr;
}
const deleteEntity=async (id)=>{
    try {
        let responce= await api.delete(fetchAddr+'/delete'+'/'+id); 
        
    } catch (error) {
        
    }
}

export default function UsersData(){
    const fetchData=fetchDat;
    const rowNames=["id","Логин","Подразделение","Полный доступ","Роль"]
    const classes =useStyles();
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        fetchData()
          .then(res => {setRows(parseResponce(res));})
          .catch(error => {});
      }, []);
    const [open, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
 
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
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


    

    const createTableCells=(row,i)=>{
        const {
            id:id,
            name: name,
            subdivision:sdName,
            allSubdivisions:allSubdivisions,
            role:role,
        }=row;
        const defualtCell=(i,j,val,name="name",level=1,l2Name="name",isArray=false)=>{

            const getText=(e=[])=>{
              let str="";
              e.map(el=>{str+=el.name+","})
              str=str.slice(0,str.length-2);
              return str;
            }  
          if(isArray){
              return isEdit?<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center"><FormDialog id={i*rowNames.length+j} name={name} values={val} onClose={(e)=>{rows[i][name]=e}}/></TableCell>:<TableCell key={i*rowNames.length+j} component="th" scope="row" align="center">{getText(val)}</TableCell>
          }
          return <TableCell key={i*rowNames.length+j} component="th" scope="row" align="center">{val}</TableCell>
          }
        let j=-1;
        let arr=[
            <TableCell key={i*rowNames.length+j++} component="th" scope="row" align="center">{id}</TableCell>,defualtCell(i,j++,name),
            defualtCell(i,j++,sdName,"subdivision"),defualtCell(i,j++,allSubdivisions,"allSubdivisions"),defualtCell(i,j++,role,"role")
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
