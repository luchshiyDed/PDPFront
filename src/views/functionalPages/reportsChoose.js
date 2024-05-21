import React, { useState, useEffect } from 'react';
import { proccessNames } from '../../services/pdProcess/pdProcess';
import { Button } from '@material-ui/core';
const SQLSchemaExplorer = () => {
  const [tables, setTables] = useState([]);
  let sampleData = 
    [{name:'Процесс',
    columns:proccessNames,
  joined:[2]}, 
    {name:'АРМ',
    columns:[{name:"Имя",dictName:"name",type:"text"},{name:"Локация",dictName:"location",type:"text"},
    {name:"Тип",dictName:"type",type:"text"},{name:"Подразделение",dictName:"subdivision",type:"text"},{name:"ИСПДн",dictName:"ispdns",type:"text"}]
    ,joined:[3]
    }, {name:'Сотрудник',
    columns:[{name:"Почта",dictName:"email",type:"text"},{name:"подразделение",dictName:"subdivision",type:"text"},
    {name:"Должность",dictName:"job",type:"text"},
    {name:"Имя",dictName:"name",type:"text"},
    {name:"Фамилия",dictName:"secondName",type:"text"},
    {name:"Отчество",dictName:"fatherName",type:"text"},
    {name:"АРМ",dictName:"awp",type:"text"}
    ],
    joined:[1]
    },{name:'ИСПДн',
    columns:[{name:"Имя",dictName:"name",type:"text"},{name:"Уровень защиты",dictName:"defenceLevel",type:"text"},
    {name:"Трансграничная передеча",dictName:"overBorder",type:"checkbox"},{name:"Местоположение",dictName:"location",type:"text"}]
    ,joined:[]}];
  useEffect(() => {
    setTables([]);
  }, []);

  const handleTableChange = (e) => {
   const value=e.target.value;
   tables
  };

  const handleColumnChange = (e) => {

  };
  const createVals=()=>{}
  return (
    <div>
      <label>Таблица:</label>
      <select  onChange={handleTableChange}>
        {sampleData.map(table => (
          <option key={table} value={table}>{table.name}</option>
        ))}
      </select>
      <Button>Добавить колонку</Button>
    </div>
  );
};

export default SQLSchemaExplorer;