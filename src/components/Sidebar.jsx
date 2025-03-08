import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, Box, Users, Server, Zap, User, Layers, Shield, Warehouse, LogOut, BaggageClaim } from "lucide-react";

export default function Sidebar() {
    const { logout } = useContext(AuthContext);
    const { userAuthLevel } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    if (!userAuthLevel || userAuthLevel.role !== "admin") return null;

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        if (window.confirm("آیا از خروج اطمینان دارید؟")) {
            logout();
            navigate('/login');
        }
    };

    const menuItems = [
        { name: "خانه", path: "/", icon: <Home size={20} /> },
        { name: "تحویل بار", path: "/Delivery", icon: <BaggageClaim size={20} /> },
        { name: "قطعات", path: "/parts", icon: <Box size={20} /> },
        { name: "مشتریان", path: "/Customers", icon: <Users size={20} /> },
        { name: "دستگاه‌ها", path: "/Devices", icon: <Server size={20} /> },
        { name: "لیزر", path: "/Laser", icon: <Zap size={20} /> },
        { name: "اپراتور", path: "/Operator", icon: <User size={20} /> },
        { name: "پالت‌ها", path: "/Pallets", icon: <Layers size={20} /> },
        { name: "سرپرست", path: "/Supervisor", icon: <Shield size={20} /> },
        { name: "انبار", path: "/Warehouse", icon: <Warehouse size={20} /> },
        { name: "خروج", path: "#", icon: <LogOut size={20} />, onClick: handleLogout },
    ];

    return (
        <>
            {/* دکمه باز کردن منو در موبایل */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-lg"
                onClick={toggleSidebar}
            >
                <Menu size={24} />
            </button>

            {/* بک‌دراپ برای موبایل */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* سایدبار سمت راست */}
            <div className={`fixed top-0 right-0 h-full w-52 bg-gray-900 text-white p-4 transition-transform transform z-50 
                            ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>

                {/* دکمه بستن برای موبایل */}
                <button
                    className="md:hidden absolute top-4 left-4 text-gray-400 hover:text-white"
                    onClick={toggleSidebar}
                >
                    <X size={24} />
                </button>
                <div className=" flex justify-end mx-3 my-2">

                    <img src='./images/logo.png' alt="" className="w-18 h-18  " />
                </div>

                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.onClick ? (
                                <button
                                    onClick={item.onClick}
                                    className="w-full flex flex-row-reverse items-center justify-end gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                                >
                                    {item.icon} <span className="flex-1 text-right">{item.name}</span>
                                </button>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="flex flex-row-reverse items-center justify-end gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon} <span className="flex-1 text-right">{item.name}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
