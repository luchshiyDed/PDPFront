import { Outlet, Link } from "react-router-dom";
import "./layout.css"
export default function MainLayout(){
return <div className="topnav">
    <nav>
        <Link to="/pdData" className="logic">процессы</Link>
        <Link to="/employee" className="logic">сотрудники</Link>
        <Link to="/AWP" className="logic">АРМ</Link>
        <Link to="/ISPDN" className="logic">ИСПДн</Link>
        {localStorage["role"]==="ADMIN"&&<Link to="/users" className="logic">Пользователи</Link>}
        <Link to="/reports" className="logic">Отчеты</Link>
        <Link to="/reportsCreate" className="logic">Конструктор</Link>
        <Link to="/login" className="login" >login</Link>
       
    </nav>
    <Outlet className="outlet"/>
    
</div>
}