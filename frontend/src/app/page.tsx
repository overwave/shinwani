"use client";

import {Col, Container, Row, Spinner} from "react-bootstrap";
import Navbar from "./components/navbar/Navbar";
import Lessons from "./components/lessons/Lessons";
import Reviews from "./components/reviews/Reviews";
import { useUser, useCounts } from "./services/hooks";

export default function HomePage() {
    const { data: user, isLoading: userLoading } = useUser();
    const { data: counts, isLoading: countLoading } = useCounts();

    return (
        <>
            <Navbar user={user} loading={userLoading}/>
            <Container className="mt-4">
                <Row className="g-4">
                    <Col md={12}>
                        <div className="p-3">
                            <h3 className="mb-3">WaniKani</h3>
                            {countLoading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status"/>
                                </div>
                            ) : (
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Lessons lessons={counts?.wani?.lessons || 0} type="wani"/>
                                    </Col>
                                    <Col md={6}>
                                        <Reviews reviews={counts?.wani?.reviews || 0} heap={counts?.wani?.heap || 0} type="wani"/>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="p-3">
                            <h3 className="mb-3">Bunpro</h3>
                            {countLoading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status"/>
                                </div>
                            ) : (
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Lessons lessons={counts?.bun?.lessons || 0} type="bun"/>
                                    </Col>
                                    <Col md={6}>
                                        <Reviews reviews={counts?.bun?.reviews || 0} heap={counts?.bun?.heap || 0} type="bun"/>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
