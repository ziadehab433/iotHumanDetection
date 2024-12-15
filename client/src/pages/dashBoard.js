import SidebarS from "../Components/SidebarS";
import Sidebar from "../Components/Sidebar";
import "./dashBoard.css";
import SensorTable from "../Components/sensorTable";
import SensorLogs from "../Components/SensorLogs";
function Navbar(){
    const sup = localStorage.getItem("super");
     if(sup == "true"){
        
        return(<SidebarS/>);
     } 
     else{
        return(<Sidebar/>);
     }
}
export default function DashBoard(){

    return(
    <div style={{ display: "flex", flexDirection: "row" }}> 
        {/* الشريط الجانبي */}
        <div style={{ flex: "0 0 18%", paddingRight: "10px" }}> 
            <Navbar />
        </div>

        {/* جدول الإدارة */}
        <div style={{ flex: "1",paddingRight:"100px"}}> 
            <SensorTable/>
            <SensorLogs/>
        </div>
    </div>
    );
}
