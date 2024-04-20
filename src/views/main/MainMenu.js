import Login from "../login/loginPage";
import MainLayout from "./layouts/mainLayout"; 
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import "./Menu.css";
import PdData from "../functionalPages/pdData"; 
import EmployeeData from "../functionalPages/emlpoyeeData"; 
import AWPData from "../functionalPages/AWPData"; 
import ICOPDData from "../functionalPages/ICOPDData"; 
import ReportsData from "../functionalPages/reportsChoose";
import UsersData from "../functionalPages/Users";

const Nopage = <div>AAAAAAAAAAAAAAAA</div>;

const MainMenu = () => {
  const isAuthenticated = () => {
    return !!localStorage['token'];
  };

  return (
    <div className="Menu">
      <h1>PDP</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
                <Route key="pdData" path="pdData" element={<PdData />} />
                <Route key="employee" path="employee" element={<EmployeeData />} />
                <Route key="AWP" path="AWP" element={<AWPData />} />
                <Route key="ICOPD" path="ICOPD" element={<ICOPDData />} />
                <Route key="reports" path="reports" element={<ReportsData />} />
                <Route key="ISPDN" path="ISPDN" element={Nopage} />
                <Route key="users" path="users" element={<UsersData/>}/>
                <Route key="login" path="login" element={<Login />} />
                <Route key="noPage" path="*" element={Nopage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MainMenu;