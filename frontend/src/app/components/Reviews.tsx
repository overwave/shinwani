"use client";

import Image from "next/image";
import "./Reviews.scss";

interface Counts {
    lessons: number;
    reviews: number;
    heap?: number | null;
}

interface ReviewsProps {
    counts: Counts | null;
}

export default function Reviews({counts}: ReviewsProps) {
    return (
        <div className="col-md-6">
            <div
                className={`card h-100 text-center p-3 shadow position-relative ${
                    counts?.reviews ? "" : "bg-light text-muted"
                }`}
            >
                <Image src="/reviews.png" alt="Reviews" width={120} height={120} className="mx-auto" />
                <h4 className="mt-3">Reviews</h4>

                {counts?.reviews ? (
                    <p>{counts?.reviews} reviews waiting for you!</p>
                ) : (
                    <p>Good job, no reviews left for today!</p>
                )}

                {counts?.heap ? (
                    <div className="btn-group">
                        <button className="btn btn-success" disabled={!counts?.reviews}>
                            All Reviews
                        </button>
                        <button className="btn btn-outline-success" disabled={!counts?.heap}>
                            Top {counts.heap}
                        </button>

                        {counts.heap > 0 && (
                            <span className="reviews-heap-badge">Take the top {counts.heap}</span>
                        )}
                    </div>
                ) : (
                    <button className="btn btn-success" disabled={!counts?.reviews}>
                        Start Reviews
                    </button>
                )}
            </div>
        </div>
    );
}
