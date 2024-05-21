import React, { useEffect,useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField,  Button, Snackbar, Checkbox } from '@material-ui/core';
import api from '../../api.js';
import "./table.css";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FormDialog from '../../components/dialog/dialog.js';
let cid=0;
const EditableTable = ({tableInfo,fetchAddress,createEntity,parseEntity}) => {

  const fetchData= async ()=>{
    const responce = await api.get(fetchAddress);
    return responce.data;
  }
  const parseOne=(i)=>{
    for(const [key, value] of Object.entries(i)){
      if(value===null&& !(key==="id") )
        i[key]={name:""};
    }
    let t=parseEntity(i);
    t.cid=cid;
    cid++;
    t.hidden=false;
    return t;
    }
  const parseResponce=(res)=>{
    let arr= res.map(i=>  
      parseOne(i));
    return arr;
    }
const [data, setData] = useState([]);
const [refresh,setRefresh]=useState(false);
useEffect(() => {
    fetchData()
      .then(res => {setData(parseResponce(res));})
      .catch(error => {console.error(error);});
  }, [refresh]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [edit,setEdit]=useState(false);
  


const deleteEntity=async (id)=>{
  if(!id)
    return
    try {
        let responce= await api.delete(fetchAddress+'/delete'+'/'+id); 
        
    } catch (error) {
        
    }
  setRefresh(!refresh);
}
const sendData=async (dat)=>{
  let newDat=dat.map(i=>createEntity(i));
    try {
        let responce= await api.post(fetchAddress+'/editMany', newDat); 
        
    } catch (error) {
        
    }
    setRefresh(!refresh);
}
const createRow=(row,i)=>{
    let arr=[];
    arr=tableInfo.map(e=>{
      if(e.type==="checkbox"){
        return <TableCell key={e.dictName}>{
          edit?<Checkbox onChange={(k)=>handleEdit(row.cid,e.dictName,k.target.checked)} key={e.name} type={e.type} checked={row[e.dictName]}/>
      :row[e.dictName].toString()}
        </TableCell>}
    
    return <TableCell key={e.dictName}>{
      edit?<TextField onChange={(k)=>handleEdit(row.cid,e.dictName,k.target.value)} key={e.name} type={e.type} value={row[e.dictName]}/>
  : row[e.dictName]}
      
    </TableCell>})
  arr.push( 
  <TableCell key="copy" onClick={()=>{let n=parseOne(createEntity({...row,id:null}));setData([...data,n])}}><Button><AddIcon/></Button></TableCell>,
  
  <TableCell key="edit">
    <FormDialog  name="Редактирование" names={tableInfo} values={row} onClose={(nd)=>{ 
      //let updatedData =  [...data];
      let updatedData=data.map((item)=> row.cid === item.cid ? nd : item); 
      setData(updatedData);
    }
    }
    onOpen={f=>{data.map(e=>{if(row.cid === e.cid) f(e)})}}/>
      </TableCell>
   , <TableCell key="delete">
    <Button onClick={()=>{let list =[...data]; list.splice(i,1); setData(list); 
      deleteEntity(row.id);}}><DeleteIcon/></Button>
      </TableCell>);
      return arr;
  
  }
  const handleEdit = (id, field, value) => {
    const updatedData = data.map((item)=> item.cid === id ? { ...item, [field]: value } : item);
    setData(updatedData);

  };
  const handleFilter = (field) =>{
  
    const filteredData =  data.map(item => {let res=false;
      for(const [key, value] of Object.entries(item)){
          if(value!=null){
            res|=value.toString().toLowerCase().includes(field.toLowerCase());
          }}
    item.hidden=!res;
  return item;
}
    
    );
    setSearchTerm(field);
    setData(filteredData);
  }
  const handleSort = (field) => {
    let sd=sortDirection === 'asc' ? 'desc' : 'asc';
    if (field === sortedField) {
      setSortDirection(sd);
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
    const sortedData = field ? data.sort((a, b) => {
      const compareValue = a[field] > b[field] ? 1 : -1;
      return sd === 'asc' ? compareValue : -compareValue;
    }) : data;
    setData(sortedData);
  };
  const getRows=()=>{
   let arr=tableInfo.map(i=><TableCell className='tableHead' key ={i.name} onClick={() => handleSort(i.dictName)}>{i.name}</TableCell>)
   arr.push(<TableCell width={'3%'}classname="tools" key ={1}></TableCell>);
   arr.push(<TableCell width={'3%'} classname="tools" key ={2}></TableCell>);
   arr.push(<TableCell  width={'3%'} classname="tools" key ={3}></TableCell>);
   return arr;
  }

  return (
    <TableContainer component={Paper}>
      <div className='main-tools'>
      {!(localStorage["role"]==="VIEWER") && 
      
        <div>
            <Button key="saveButton" onClick={()=>{ setEdit(false);sendData(data)}}>SAVE</Button>
            <Button key="addButton" onClick={()=>{ let n=parseOne(createEntity({}));setData([...data,n]);}}>Add</Button>
            </div>}
            <div>
            <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => handleFilter(e.target.value)}
              />
              </div>
        </div>
            
      <Table>
        <TableHead  className='tableHeadRow'>
          <TableRow >   
            {getRows()}
          </TableRow>
        </TableHead>
        <TableBody className='table-body'>
          {data.map((row,i) => row.hidden?"":(
            <TableRow className='row' key={i}>
              {createRow(row,i)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableTable;