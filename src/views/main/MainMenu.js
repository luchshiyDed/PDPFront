import Login from "../login/loginPage";
import MainLayout from "./layouts/mainLayout"; 
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import "./Menu.css";

import ReportsData from "../functionalPages/reportsChoose";
import UsersData from "../functionalPages/Users";

import ProcessTable from "../tables/processTable";
import ICOPDTable from "../tables/ICOPDTable";
import EmployeeTable from "../tables/employeeTable";
import AWPTable from "../tables/awpTable";
import ISPDNTable from "../tables/ispdnTable";
import Report from "../functionalPages/reports";
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
                <Route key="pdData" path="pdData" element={<ProcessTable />} />
                <Route key="employee" path="employee" element={<EmployeeTable />} />
                <Route key="AWP" path="AWP" element={<AWPTable />} />
                <Route key="reportsCreate" path="reportsCreate" element={<ReportsData/>} />
                <Route key="reports" path="reports" element={<Report/>} />
                <Route key="ISPDN" path="ISPDN" element={<ISPDNTable/>} />
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