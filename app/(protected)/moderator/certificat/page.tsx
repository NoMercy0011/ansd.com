"use client"

import React, { useState, useEffect } from "react";
import LateralBar from "@/src/components/moderator/LateralBar";
import Header from "@/src/components/moderator/Header";

export default function LovaAdminCertificat() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="lg:ml-64">
        <main>
          <h1> Etudiant </h1>
        </main>
      </div>
    </div>
  );
}