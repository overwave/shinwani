"use client";

import Image from "next/image";
import { Card, Button } from "react-bootstrap";

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
        <Card
            className={`h-100 text-center p-3 shadow ${
                counts?.lessons ? "" : "bg-light text-muted"
            }`}
        >
                <Card.Body>
                    <Image src="/lessons_done.png" alt="Lessons" width={120} height={120} className="mx-auto" />
                    <Card.Title as="h4" className="mt-3">New Lessons</Card.Title>
                    {counts?.lessons ? (
                        <Card.Text>{counts?.lessons} lessons waiting for you!</Card.Text>
                    ) : (
                        <Card.Text>Good job, you&#39;ve done all lessons for today!</Card.Text>
                    )}
                    <Button 
                        variant={counts?.lessons ? "primary" : "secondary"} 
                        disabled={!counts?.lessons}
                        className="w-100"
                    >
                        Start Lessons
                    </Button>
                </Card.Body>
            </Card>
        );
    }
