"use client";

import {Card, Col, Placeholder, Row} from "react-bootstrap";

export default function LearnPlaceholder() {
    return (
        <Card className="text-center p-3 shadow">
            <Row className="g-0">
                <Col md={4}>
                    <Placeholder bg="light" style={{width: '160px', height: '160px'}}/>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Placeholder as="h4" animation="glow" className="card-title ">
                            <Placeholder xs='5' className="rounded-1"/>
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs='3' className="rounded-1 me-1"/>
                            <Placeholder xs='6' className="rounded-1"/>
                        </Placeholder>
                        <Placeholder.Button variant="primary" xs={12}/>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}
