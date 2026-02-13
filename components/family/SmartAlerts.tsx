"use client";

import { useState, useEffect } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function SmartAlerts() {
    const [motherLog, setMotherLog] = useState<any>(null);
    const [physicalStatus, setPhysicalStatus] = useState<any>(null);
    const [mentalScore, setMentalScore] = useState<number | null>(null);

    useEffect(() => {
        const log = localStorage.getItem("mother_log");
        const physical = localStorage.getItem("physical_status");
        const mental = localStorage.getItem("mental_health_score");

        if (log) setMotherLog(JSON.parse(log));
        if (physical) setPhysicalStatus(JSON.parse(physical));
        if (mental) setMentalScore(parseInt(mental));
    }, []);

    const getAlert = () => {
        // 1. URGENT Physical Red Flag
        if (physicalStatus?.isUrgent) {
            return {
                type: "URGENT",
                level: "red",
                title: "Immediate Action Required",
                message: "Severe physical symptoms logged (fever + bleeding + pain). Please seek medical help now.",
                suggestions: ["Call her doctor", "Ensure she is resting", "Take over all baby duties"],
                icon: <AlertCircle className="h-6 w-6" />,
            };
        }

        // 2. High Emotional Distress
        if (mentalScore && mentalScore >= 11) {
            return {
                type: "HIGH SUPPORT",
                level: "red",
                title: "Emotional Support Needed",
                message: "Her wellness screening indicates she is struggling emotionally right now.",
                suggestions: ["Ask how she's really feeling", "Listen without judgment", "Book a professional consult"],
                icon: <AlertTriangle className="h-6 w-6" />,
            };
        }

        // 3. Low Mood Alert
        if (motherLog && (motherLog.mood === 0 || motherLog.mood === 1)) {
            return {
                type: "CAUTION",
                level: "yellow",
                title: "Mood Dip Noted",
                message: "She's logged a low or very low mood today. Keep a close eye on her.",
                suggestions: ["Make her favorite tea", "Take the baby for a 30m walk", "Offer a warm bath"],
                icon: <Info className="h-6 w-6" />,
            };
        }

        // 4. Normal / Good
        return {
            type: "STABLE",
            level: "green",
            title: "Doing Well",
            message: "Things seem stable today! Keep up the great support.",
            suggestions: ["Tell her she's a great mom", "Prepare a healthy snack"],
            icon: <CheckCircle className="h-6 w-6" />,
        };
    };

    const alert = getAlert();

    const levelColors = {
        red: "bg-red-50 border-red-200 text-red-900",
        yellow: "bg-orange-50 border-orange-200 text-orange-900",
        green: "bg-green-50 border-green-200 text-green-900",
    };

    const iconColors = {
        red: "text-red-600",
        yellow: "text-orange-500",
        green: "text-green-600",
    };

    return (
        <div className={cn("rounded-3xl border-2 p-6 shadow-sm transition-all", levelColors[alert.level])}>
            <div className="mb-4 flex items-center gap-3">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm", iconColors[alert.level])}>
                    {alert.icon}
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{alert.type}</span>
                    <h2 className="text-xl font-bold">{alert.title}</h2>
                </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed opacity-90">
                {alert.message}
            </p>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
                    <Heart className="h-3 w-3" />
                    Suggested Support
                </div>
                <div className="grid gap-2">
                    {alert.suggestions.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className={cn("h-1.5 w-1.5 rounded-full", alert.level === 'red' ? 'bg-red-500' : alert.level === 'yellow' ? 'bg-orange-400' : 'bg-green-500')} />
                            {s}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
