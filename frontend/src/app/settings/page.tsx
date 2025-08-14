'use client';

import {useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import {useSettings} from '../services/hooks';
import Navbar from "@/app/components/navbar/Navbar";

export default function SettingsPage() {
    const {data, error, isLoading, mutate} = useSettings();

    const [wanikaniToken, setWanikaniToken] = useState<string | undefined>(undefined);
    const [bunproEmail, setBunproEmail] = useState<string | undefined>(undefined);
    const [bunproPassword, setBunproPassword] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setWanikaniToken(data.wanikaniApiToken);
            setBunproEmail(data.bunproEmail);
            setBunproPassword(data.bunproPassword);
        }
    }, [data]);

    const handleWanikaniSave = async () => {
        // TODO: Implement actual save to backend
        await mutate({
            wanikaniApiToken: wanikaniToken,
            bunproEmail: data?.bunproEmail,
            bunproPassword: data?.bunproPassword
        }, false);
    };

    const handleBunproSave = async () => {
        // TODO: Implement actual save to backend
        await mutate({
            wanikaniApiToken: data?.wanikaniApiToken,
            bunproEmail: bunproEmail,
            bunproPassword: bunproPassword
        }, false);
    };

    if (isLoading) {
        return (
            <>
                <Navbar/>
                <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar/>
            <Container className="py-4">
                <h1 className="mb-3">Settings</h1>
                <Row md={2}>
                    <Col>
                        <Form.Group>
                            <h4 className="my-3">WaniKani</h4>
                            <InputGroup>
                                <FloatingLabel controlId="waniKaniApiKey" label="API Token">
                                    <Form.Control
                                        type="text"
                                        placeholder="API Token"
                                        value={wanikaniToken || ""}
                                        onChange={(e) => setWanikaniToken(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Button variant="primary" onClick={handleWanikaniSave}>Save</Button>
                            </InputGroup>
                        </Form.Group>

                        <h4 className="my-3">Bunpro</h4>
                        <InputGroup>
                            <FloatingLabel controlId="bunproEmail" label="E-mail">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Bunpro email"
                                    value={bunproEmail || ""}
                                    onChange={(e) => setBunproEmail(e.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="bunproPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your Bunpro password"
                                    value={bunproPassword || ""}
                                    onChange={(e) => setBunproPassword(e.target.value)}
                                />
                            </FloatingLabel>
                            <Button variant="primary" onClick={handleBunproSave}>Save</Button>
                        </InputGroup>
                        <Form.Text className="text-muted">Password need to be re-entered on e-mail update.</Form.Text>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
