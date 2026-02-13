"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Apple, Moon, Baby, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const dailyItems = [
    { id: "eat", label: "Did she eat properly today? 🍎", icon: <Apple className="h-4 w-4" /> },
    { id: "rest", label: "Did she get at least 1 hour of rest? 😴", icon: <Moon className="h-4 w-4" /> },
    { id: "baby", label: "Did someone help with the baby? 👶", icon: <Baby className="h-4 w-4" /> },
    { id: "talk", label: "Did you talk to her emotionally? 💬", icon: <MessageCircle className="h-4 w-4" /> },
];

export function CareChecklist() {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setCheckedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const progress = (checkedItems.length / dailyItems.length) * 100;

    return (
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Daily Care Checklist</h2>
                <span className="text-sm font-medium text-primary">{Math.round(progress)}% Done</span>
            </div>

            <div className="mb-6 h-3 w-full rounded-full bg-muted overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="grid gap-3">
                {dailyItems.map((item) => {
                    const isChecked = checkedItems.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                                isChecked
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                            )}
                        >
                            {isChecked ? (
                                <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                            ) : (
                                <Circle className="h-6 w-6 shrink-0 opacity-20" />
                            )}
                            <div className="flex items-center gap-2">
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
