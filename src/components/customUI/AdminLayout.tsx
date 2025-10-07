import type { iAdminLayout } from "@/types/types";
import type { FC } from "react";

const AdminLayout: FC<iAdminLayout> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4">
        Sidebar
      </div>
      <div className="w-3/4 p-4 overflow-y-auto h-screen"> {children} </div>
    </div>
  );
};

export default AdminLayout;
