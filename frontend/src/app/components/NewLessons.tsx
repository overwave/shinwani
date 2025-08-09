"use client";

import Image from "next/image";

interface Counts {
    lessons: number;
    reviews: number;
    heap?: number | null;
}

interface NewLessonsProps {
    counts: Counts | null;
}

export default function NewLessons({ counts }: NewLessonsProps) {
    return (
        <div className="col-md-6">
            <div
                className={`card h-100 text-center p-3 shadow ${
                    counts?.lessons ? "" : "bg-light text-muted"
                }`}
            >
                <Image src="/lessons_done.png" alt="Lessons" width={120} height={120} className="mx-auto" />
                <h4 className="mt-3">New Lessons</h4>
                {counts?.lessons ? (
                    <p>{counts?.lessons} lessons waiting for you!</p>
                ) : (
                    <p>Good job, you&#39;ve done all lessons for today!</p>
                )}
                <button className={`btn ${counts?.lessons ? "btn-primary" : "btn-secondary"}`} disabled={!counts?.lessons}>
                    Start Lessons
                </button>
            </div>
        </div>
    );
}
