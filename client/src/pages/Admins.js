import AdminTable from "../Components/AdminTable";
import SidebarS from "../Components/SidebarS";
import Sidebar from "../Components/Sidebar";

function Navbar() {
    const rol = "SuperAdmin";
    if (rol === "SuperAdmin") {
        return <SidebarS />;
    } else {
        return <Sidebar />;
    }
}

export default function Admins() {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}> 
            {/* الشريط الجانبي */}
            <div style={{ flex: "0 0 15%" }}> 
                <Navbar />
            </div>

            {/* جدول الإدارة */}
            <div style={{ flex: "1",paddingRight:"100px"}}> 
                <AdminTable />
            </div>
        </div>
    );
}
