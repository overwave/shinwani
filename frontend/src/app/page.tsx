"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <a className="navbar-brand fw-bold" href="#">
                    LangLearn
                </a>
                <form className="d-flex ms-auto me-3">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </form>
                {user && (
                    <div className="position-relative d-inline-block">
                        <Image
                            src={user.avatar}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-circle border"
                        />
                        <span
                            className="badge bg-secondary-subtle text-primary position-absolute top-100 start-50 translate-middle rounded-pill px-2">
              {user.login}
            </span>
                    </div>
                )}
            </nav>

            <div className="container mt-4">
                <div className="row g-4">
                    {/* New Lessons */}
                    <div className="col-md-6">
                        <div
                            className={`card h-100 text-center p-3 shadow ${
                                counts?.lessons === 0 ? "bg-light text-muted" : ""
                            }`}
                        >
                            <Image
                                src="/lessons.png"
                                alt="Lessons"
                                width={120}
                                height={120}
                                className="mx-auto"
                            />
                            <h4 className="mt-3">New Lessons</h4>
                            {counts?.lessons === 0 ? (
                                <p>Good job, you’ve done all lessons for today!</p>
                            ) : (
                                <p>{counts?.lessons} lessons waiting for you!</p>
                            )}
                            <button
                                className="btn btn-primary"
                                disabled={counts?.lessons === 0}
                            >
                                Start Lessons
                            </button>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="col-md-6">
                        <div
                            className={`card h-100 text-center p-3 shadow position-relative ${
                                counts?.reviews === 0 ? "bg-light text-muted" : ""
                            }`}
                        >
                            <Image
                                src="/reviews.png"
                                alt="Reviews"
                                width={120}
                                height={120}
                                className="mx-auto"
                            />
                            <h4 className="mt-3">Reviews</h4>

                            {counts?.reviews === 0 ? (
                                <p>Good job, no reviews left for today!</p>
                            ) : (
                                <p>{counts?.reviews} reviews waiting for you!</p>
                            )}

                            {counts?.heap != null && counts.heap > 0 ? (
                                <div className="btn-group">
                                    <button
                                        className="btn btn-success"
                                        disabled={counts?.reviews === 0}
                                    >
                                        All Reviews
                                    </button>
                                    <button
                                        className="btn btn-outline-success"
                                        disabled={counts?.heap === 0}
                                    >
                                        Top {counts.heap}
                                    </button>

                                    {counts.heap > 0 && (
                                        <span
                                            className="badge bg-warning text-dark position-absolute top-0 start-100"
                                            style={{
                                                transform: "translate(-70%, 0%) rotate(15deg)",
                                            }}
                                        >
                  Take the top {counts.heap}
                </span>
                                    )}
                                </div>
                            ) : (
                                <button
                                    className="btn btn-success"
                                    disabled={counts?.reviews === 0}
                                >
                                    Start Reviews
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
