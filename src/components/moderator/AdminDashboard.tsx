// "use client"

// import React, { useState, useEffect } from "react";
// import LateralBar from "./LateralBar";
// import Header from "./Header";
// import Dashboard from "@/app/(protected)/user/page";

// export default function LovaAdminDashboard() {
//   const [activeModule, setActiveModule] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const renderContent = () => {
//     if (activeModule === 'dashboard') return <Dashboard />;
//     return <div className="p-6">Module {activeModule} en développement...</div>;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <LateralBar 
//         activeModule={activeModule}
//         setActiveModule={setActiveModule}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />
//       <div className="lg:ml-64">
//         <Header 
//           activeModule={activeModule}
//           currentTime={currentTime}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//         <main>
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }
