
import React, {useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./dialog.css";
import api from "../../api";
export default function FormDialog({id:id=null,name:name="Noname",values:vals={},names=[],onClose:closeFunc=()=>{}, onOpen:openFunc=()=>{}}){
  const [state, setState] = useState({
    open: false
  });
  const [suggestions,setSuggestions]= useState([])
  const fetchData= async (fetchAddress,filter)=>{
  let responce;
  try {
     responce = await api.post(fetchAddress,filter);
  } catch (error) {
        return [];
  }
    return responce.data;
  }
  const getPossibleValues=(fetchAddress,filter="")=>{
    let res=[];
   
    let arr=filter.split(",");
    
    if(fetchAddress){
        fetchData(fetchAddress,arr[arr.length-1]).then(e=>setSuggestions(e)).catch(setSuggestions([]));
      
    }


  }
  const [values, setValues]=useState(vals);
  const handleClickOpen = () => {
    openFunc(setValues);
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
    setSuggestions([]);
    closeFunc(values);
  };
  const handleChange=(dictName,e,picked=false)=>{
    let{value,type,checked}=e.target;
    let newVal = type === 'checkbox' ? checked : value;

    if (picked){
      let arr=values[dictName].toString().split(",");
      let str="";
      arr.map((e,i)=>{
        if(i===(arr.length-1)){
        str+=value.toString()
        str+=","
        }
      else{
        str+=e+",";
      }
    });
    newVal=str;
    }
  
    setValues({...values,[dictName]:newVal});
  }
 

    return (
      <div>
        <Button id={id} onFocus={handleClickOpen} onClick={handleClickOpen}><EditIcon/></Button>
        {state.open && (
          <Dialog
            onClose={()=>setSuggestions([])}
            open={true}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{name}</DialogTitle>
            <DialogContent >
              <form className="dropdown">
                {names.map((e,i)=>{
                    return <div key={i} className="single-drop-down">
                      <label>{e.name}
                      <input className="dialogInput" type={e.type} checked={values[e.dictName]} onClick={(el)=>getPossibleValues(e.fetchAddress,el.target.value)} value={values[e.dictName]} onChange={(el)=>{handleChange(e.dictName,el); getPossibleValues(e.fetchAddress,el.target.value)}}/>
                      </label>
                      {e.type==='text' && (
                     <div className="dropdown-content">
                    {suggestions.map((suggestion, index) => 
                    <a key={index} onClick={(el) => handleChange(e.dictName,{target:{type:"text",value:suggestion,checked:false}},true)}>
                      {suggestion}
                     </a>
                    )}
                    </div>)}
                    </div>
                })}
                </form>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
}


