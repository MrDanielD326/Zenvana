import type { iAdminLayout } from "@/types/types";
import type { FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, LogOut } from "lucide-react";
import { sidebarIcon } from "@/config/siderbarIcons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogoutSSO } from "./ClerkAuth";

const navMenu = [
  "dashboard", "leadManagement", "wellVantageLeads", "memberManagement", "membershipManagement",
  "attendanceTracking", "employeeManagement", "revenueManagement", "expenseManagementAndProfit", "workoutManagement"
] as const;

const AdminLayout: FC<iAdminLayout> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const menuItems = navMenu.map((id) => {
    let label = id.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
    if (label.includes(" And ")) label = label.replace(" And ", " & ");
    return {
      id,
      label,
      path: `/${id}`,
      icon: sidebarIcon[id as keyof typeof sidebarIcon],
    };
  });

  // Default to /leadManagement if root path
  const currentPath = location.pathname === "/" ? "/leadManagement" : location.pathname;

  const navLogout = () => navigate("/");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-muted/30">
      {/* Sidebar */}
      <div
        className={`
          h-full bg-[#D6E2D9] flex flex-col transition-all duration-300
          ${isMobile ? (collapsed ? "hidden" : "fixed z-50 top-0 left-0 w-60 h-full shadow-lg") : collapsed ? "w-20" : "w-70"}
        `}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Logo */}
          <div className="mb-2 -mt-2 flex justify-center">
            <img src="brandLogo.svg" alt="Brand Title" className="w-[80px] md:w-[100px] h-[80px] md:h-[100px]" />
          </div>

          {/* Menu Items */}
          <div className={`flex flex-col space-y-1 ${collapsed ? "items-center" : "ml-0 md:-ml-5"}`}>
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setCollapsed(true);
                  }}
                  className={`w-full justify-start ${isActive ? "bg-green-700 text-white" : "text-gray-800"}`}
                >
                  <span className={isActive ? "text-white" : "text-gray-800"}>{item.icon}</span>
                  {!collapsed && <span className="ml-2 truncate">{item.label}</span>}
                </Button>
              );
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center justify-between mt-auto">
            {!collapsed && ( <LogoutSSO /> )}
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-green-700 cursor-pointer" onClick={navLogout}>
              <LogOut />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !collapsed && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setCollapsed(true)} />}

      {/* Main Content */}
      <div className="flex-1 -mt-6 p-4 md:p-6 overflow-y-auto h-screen bg-background">
        <div className="flex items-center -ml-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <ArrowRight /> : <ArrowLeft />}
              </Button>
            </TooltipTrigger>
            <TooltipContent> {collapsed ? "Open" : "Close"} Sidebar </TooltipContent>
          </Tooltip>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
