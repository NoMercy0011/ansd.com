"use client"

import { Card } from "@/src/components/ui";
import { Award, BookOpen, GraduationCap, LucideIcon, Users } from "lucide-react";

type StatsType = {
    title: string;
    value: string; 
    change: string; 
    icon: LucideIcon; 
    color: "sky" | "pink" | "orange" | "purple";
}

export default function CardStats(){

    // Données mockées
const stats : StatsType[] = [
  { title: "Étudiants", value: "1,248", change: "+12%", icon: Users, color: "sky" },
  { title: "Enseignants", value: "48", change: "+5%", icon: GraduationCap, color: "pink" },
  { title: "Classes", value: "24", change: "0%", icon: BookOpen, color: "orange" },
  { title: "Moyenne Générale", value: "14.2/20", change: "+0.5", icon: Award, color: "purple" }
];
    return(
        <>
        {stats.map((stat, index) => (
            <Card 
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
            />
            ))}
        </>
    )
}