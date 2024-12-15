import AdminForm from "./AdminForm";
import SidebarS from "./SidebarS";
import Sidebar from "./Sidebar";

function Navbar() {
    const rol = "SuperAdmin";
    if (rol === "SuperAdmin") {
        return <SidebarS />;
    } else {
        return <Sidebar />;
    }
}

export default function AddAdmin() {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}> 
            {/* الشريط الجانبي */}
            <div style={{ flex: "0 0 18%", paddingRight: "10px" }}> 
                <Navbar />
            </div>

            {/* جدول الإدارة */}
            <div style={{ flex: "1",paddingRight:"100px"}}> 
                <AdminForm />
            </div>
        </div>
    );
}