"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/users/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/login?registered=true");
            } else {
                const data = await response.json();
                setError(data.username?.[0] || data.detail || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
            <div className="w-full max-w-md space-y-8 rounded-3xl border bg-card p-10 shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UserPlus className="h-6 w-6" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">Join Bloom</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Start your postpartum wellness journey.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-500 border border-red-100 italic">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            className="block w-full rounded-2xl border-none bg-muted/50 px-4 py-4 focus:ring-2 focus:ring-primary/20"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email address"
                            className="block w-full rounded-2xl border-none bg-muted/50 px-4 py-4 focus:ring-2 focus:ring-primary/20"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className="block w-full rounded-2xl border-none bg-muted/50 px-4 py-4 focus:ring-2 focus:ring-primary/20"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative flex w-full justify-center rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-primary hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
