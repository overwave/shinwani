"use client";

import Image from "next/image";
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import "./Reviews.scss";
import {CourseType} from "../../services/types";

interface ComponentProps {
    reviews: number;
    heap: number;
    type: CourseType;
}

export default function Reviews({reviews, heap, type}: ComponentProps) {
    return (
        <Card className={"h-100 text-center p-3 shadow " + (reviews ? "" : "bg-light text-muted")}>
            <Row className="g-0">
                <Col md={4}>
                    {reviews ?
                        <Image src={`/${type}/reviews.png`} alt="Reviews" width={160} height={160}
                               className="img-fluid"/> :
                        <Image src={`/${type}/reviews_done.png`} alt="Reviews" width={160} height={160}
                               className="img-fluid"/>}
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title as="h4">Reviews</Card.Title>

                        {reviews ?
                            <Card.Text>{reviews} reviews waiting for you!</Card.Text> :
                            <Card.Text>Good job, no reviews left!</Card.Text>}

                        {heap ?
                            <ButtonGroup className="w-100 mt-3">
                                <Button variant="success"> All Reviews </Button>
                                <Button variant="outline-success" disabled={!heap}> Top {heap}</Button>
                            </ButtonGroup> :
                            reviews ? <Button variant="success" className="w-100 mt-3"> Start Reviews </Button> : <></>
                        }
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}
