'use client';

import {useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import {useSettings} from '../services/hooks';
import Navbar from "@/app/components/navbar/Navbar";
import {CheckLg, Trash} from "react-bootstrap-icons";
import {apiService} from '../services/api';

export default function SettingsPage() {
    const {data, error, isLoading, mutate} = useSettings();

    const [wanikaniToken, setWanikaniToken] = useState<string | undefined>(undefined);
    const [bunproEmail, setBunproEmail] = useState<string | undefined>(undefined);
    const [bunproPassword, setBunproPassword] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setWanikaniToken(data.wanikaniApiToken);
            setBunproEmail(data.bunproEmail);
        }
    }, [data]);

    const handleWanikaniSave = async () => {
        try {
            await apiService.updateWanikaniSettings(wanikaniToken!);
            await mutate();
        } catch (error) {
            console.error('Failed to save WaniKani settings:', error);
        }
    };

    const handleBunproSave = async () => {
        try {
            await apiService.updateBunproSettings(bunproEmail!, bunproPassword!);
            await mutate();
        } catch (error) {
            console.error('Failed to save Bunpro settings:', error);
        }
    };

    const handleWanikaniDelete = async () => {
        try {
            await apiService.deleteWanikaniSettings();
            setWanikaniToken('');
            await mutate();
        } catch (error) {
            console.error('Failed to delete WaniKani settings:', error);
        }
    };

    const handleBunproDelete = async () => {
        try {
            await apiService.deleteBunproSettings();
            setBunproEmail('');
            setBunproPassword('');
            await mutate();
        } catch (error) {
            console.error('Failed to delete Bunpro settings:', error);
        }
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
                                {wanikaniToken && (
                                    <Button variant="outline-danger" onClick={handleWanikaniDelete}>
                                        <Trash className="m-2"></Trash>
                                    </Button>
                                )}
                                <Button variant="success" onClick={handleWanikaniSave} disabled={!wanikaniToken}>
                                    <CheckLg className="m-2"></CheckLg>
                                </Button>
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
                            {bunproEmail && (
                                <Button variant="outline-danger" onClick={handleBunproDelete}>
                                    <Trash className="m-2"></Trash>
                                </Button>
                            )}
                            <Button variant="success" onClick={handleBunproSave}
                                    disabled={!bunproEmail || !bunproPassword}>
                                <CheckLg className="m-2"></CheckLg>
                            </Button>
                        </InputGroup>
                        <Form.Text className="text-muted">Password need to be re-entered on e-mail update.</Form.Text>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
