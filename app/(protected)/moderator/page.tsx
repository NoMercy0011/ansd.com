"use client"

import { Button } from "@/src/components/ui/button";
import PerformanceClasses from "@/src/features/moderator/Dashboard/PerformanceClasses";
import StudentDistribution from "@/src/features/moderator/Dashboard/StudentDistribution";
import CardStats from "@/src/features/moderator/Dashboard/CardStat";
import RecentActivity from "@/src/features/moderator/Dashboard/RecentActivity";
import { Clock } from "lucide-react";
import EventUpcome from "@/src/features/moderator/Dashboard/EventUpcome";




export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900"></h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-700">{new Date().toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <Button variant="primary" size="sm">
            Générer Rapport
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardStats />
      </div>

      {/* Main Content */}
      <div className="lg:flex grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceClasses />
        <StudentDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <EventUpcome />
      </div>
    </div>
  );
}