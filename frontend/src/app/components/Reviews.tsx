"use client";

import Image from "next/image";
import {Button, ButtonGroup, Card} from "react-bootstrap";
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
        <Card
            className={`h-100 text-center p-3 shadow position-relative ${
                counts?.reviews ? "" : "bg-light text-muted"
            }`}
        >
            <Card.Body>
                <Image src="/reviews.png" alt="Reviews" width={120} height={120} className="mx-auto"/>
                <Card.Title as="h4" className="mt-3">Reviews</Card.Title>

                {counts?.reviews ? (
                    <Card.Text>{counts?.reviews} reviews waiting for you!</Card.Text>
                ) : (
                    <Card.Text>Good job, no reviews left for today!</Card.Text>
                )}

                {counts?.heap ? (
                    <ButtonGroup className="w-100">
                        <Button variant="success" disabled={!counts?.reviews}>
                            All Reviews
                        </Button>
                        <Button variant="outline-success" disabled={!counts?.heap}>
                            Top {counts.heap}
                        </Button>

                        {/*{counts.heap > 0 && (*/}
                        {/*    <Badge bg="info" className="reviews-heap-badge">*/}
                        {/*        Take the top {counts.heap}*/}
                        {/*    </Badge>*/}
                        {/*)}*/}
                    </ButtonGroup>
                ) : (
                    <Button variant="success" disabled={!counts?.reviews} className="w-100">
                        Start Reviews
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}
