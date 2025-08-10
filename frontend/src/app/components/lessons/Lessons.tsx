"use client";

import Image from "next/image";
import {Button, Card, Col, Row} from "react-bootstrap";
import {CourseType} from "../../services/types";

export interface ComponentProps {
    lessons: number;
    type: CourseType;
}

export default function Lessons({lessons, type}: ComponentProps) {
    return (
        <Card className={"h-100 text-center p-3 shadow " + (lessons ? "" : "bg-light text-muted")}>
            <Row className="g-0">
                <Col md={4}>
                    {lessons ?
                        <Image src={`/${type}/lessons.png`} alt="Lessons" width={160} height={160}
                               className="img-fluid"/> :
                        <Image src={`/${type}/lessons_done.png`} alt="Lessons" width={160} height={160}
                               className="img-fluid"/>}
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title as="h4">New Lessons</Card.Title>
                        {lessons ?
                            <Card.Text>{lessons} lessons waiting for you!</Card.Text> :
                            <Card.Text>Good job, you&#39;ve done all lessons!</Card.Text>}
                        {!!lessons && <Button variant={"primary"} className="w-100 mt-3">Start Lessons</Button>}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}
