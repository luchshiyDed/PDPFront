
import React, {useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./dialog.css";
export default function FormDialog({name:name="Noname",values:vals=[],onClose:closeFunc=()=>{}}){
  const [state, setState] = useState({
    open: false
  });
  const [values, setValues]=useState(vals)
  const handleClickOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
    closeFunc(values);
  };
  const handleChange=(e,i)=>{
    let{name,value}=e.target;
    let list=[...values];
    list[i]={name:value};
    setValues(list);
  }
  const handleAdd=()=>{
    let list=[...values];
    list.push({name:""});
    setValues(list);
  }

  const getText=()=>
  {
    let str=""
    values.map(e=>{str+=e.name+", "});
    str=str.slice(0,str.length-2);
    if(str)
      return str;
    return "click to add";
  }

    return (
      <div>
        <Button onClick={handleClickOpen}>{getText()}</Button>
        {state.open && (
          <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{name}</DialogTitle>
            <DialogContent>
                {values.map((e,i)=>{


                    return <input className="input" key={i} value={e.name} onChange={(e)=>handleChange(e,i)}></input>
                })}
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAdd} color="primary">
                Add
              </Button>
              <Button onClick={handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
}


