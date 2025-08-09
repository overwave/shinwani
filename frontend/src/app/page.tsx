"use client";

import {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import NewLessons from "./components/NewLessons";
import Reviews from "./components/Reviews";

interface User {
    login: string;
    avatar: string;
}

interface Counts {
    lessons: number;
    reviews: number;
    heap?: number | null;
}

export default function HomePage() {
    const [user, setUser] = useState<User | null>(null);
    const [counts, setCounts] = useState<Counts | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [userRes, countsRes] = await Promise.all([
                    fetch("/api/user").then((r) => r.json()),
                    fetch("/api/counts").then((r) => r.json()),
                ]);
                setUser(userRes);
                setCounts(countsRes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar user={user} />
            <div className="container mt-4">
                <div className="row g-4">
                    <NewLessons counts={counts} />
                    <Reviews counts={counts} />
                </div>
            </div>
        </>
    );
}
