"use client";

import {useEffect, useState} from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
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
    const [userLoading, setUserLoading] = useState(true);
    const [countsLoading, setCountsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userRes = await fetch("/api/user").then((r) => r.json());
                setUser(userRes);
            } catch (err) {
                console.error(err);
            } finally {
                setUserLoading(false);
            }
        }

        async function fetchCounts() {
            try {
                const countsRes = await fetch("/api/counts").then((r) => r.json());
                setCounts(countsRes);
            } catch (err) {
                console.error(err);
            } finally {
                setCountsLoading(false);
            }
        }

        fetchUser();
        fetchCounts();
    }, []);

    return (
        <>
            <Navbar user={user} />
            <Container className="mt-4">
                <Row className="g-4">
                    <Col md={12}>
                        <div className="p-3">
                            <h3 className="mb-3">WaniKani</h3>
                            {countsLoading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status" />
                                </div>
                            ) : (
                                <Row className="g-3">
                                    <Col md={6}>
                                        <NewLessons counts={counts} />
                                    </Col>
                                    <Col md={6}>
                                        <Reviews counts={counts} />
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="p-3">
                            <h3 className="mb-3">Bunpro</h3>
                            {countsLoading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status" />
                                </div>
                            ) : (
                                <Row className="g-3">
                                    <Col md={6}>
                                        <NewLessons counts={counts} />
                                    </Col>
                                    <Col md={6}>
                                        <Reviews counts={counts} />
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
