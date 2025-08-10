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
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" />
            </Container>
        );
    }

    return (
        <>
            <Navbar user={user} />
            <Container className="mt-4">
                <Row className="g-4">
                    <Col md={6}>
                        <NewLessons counts={counts} />
                    </Col>
                    <Col md={6}>
                        <Reviews counts={counts} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
