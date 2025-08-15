'use client';

import {useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import {useSettings} from '../services/hooks';
import Navbar from "@/app/components/navbar/Navbar";
import {CheckLg, ExclamationTriangle, Trash} from "react-bootstrap-icons";
import {apiService} from '@/app/services';

export default function SettingsPage() {
    const {data, error, isLoading, mutate} = useSettings();

    const [wanikaniToken, setWanikaniToken] = useState<string | undefined>(undefined);
    const [bunproEmail, setBunproEmail] = useState<string | undefined>(undefined);
    const [bunproPassword, setBunproPassword] = useState<string | undefined>(undefined);

    // Loading states
    const [wanikaniLoading, setWanikaniLoading] = useState(false);
    const [bunproLoading, setBunproLoading] = useState(false);

    // Error states
    const [wanikaniError, setWanikaniError] = useState<string | null>(null);
    const [bunproError, setBunproError] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            setWanikaniToken(data.wanikaniApiToken);
            setBunproEmail(data.bunproEmail);
        }
    }, [data]);

    const handleWanikaniSave = async () => {
        setWanikaniLoading(true);
        setWanikaniError(null);
        try {
            await apiService.updateWanikaniSettings(wanikaniToken!);
            await mutate();
        } catch (error) {
            console.error('Failed to save WaniKani settings:', error);
            setWanikaniError('Failed to save WaniKani settings. Please try again.');
        } finally {
            setWanikaniLoading(false);
        }
    };

    const handleBunproSave = async () => {
        setBunproLoading(true);
        setBunproError(null);
        try {
            await apiService.updateBunproSettings(bunproEmail!, bunproPassword!);
            await mutate();
        } catch (error) {
            console.error('Failed to save Bunpro settings:', error);
            setBunproError('Failed to save Bunpro settings. Please try again.');
        } finally {
            setBunproLoading(false);
        }
    };

    const handleWanikaniDelete = async () => {
        setWanikaniLoading(true);
        setWanikaniError(null);
        try {
            await apiService.deleteWanikaniSettings();
            setWanikaniToken('');
            await mutate();
        } catch (error) {
            console.error('Failed to delete WaniKani settings:', error);
            setWanikaniError('Failed to delete WaniKani settings. Please try again.');
        } finally {
            setWanikaniLoading(false);
        }
    };

    const handleBunproDelete = async () => {
        setBunproLoading(true);
        setBunproError(null);
        try {
            await apiService.deleteBunproSettings();
            setBunproEmail('');
            setBunproPassword('');
            await mutate();
        } catch (error) {
            console.error('Failed to delete Bunpro settings:', error);
            setBunproError('Failed to delete Bunpro settings. Please try again.');
        } finally {
            setBunproLoading(false);
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

    if (error) {
        return (
            <>
                <Navbar/>
                <Container className="py-4">
                    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                        <ExclamationTriangle size={64} className="text-danger mb-3"/>
                        <h2 className="text-danger">Error</h2>
                        <p className="text-muted">Failed to load settings. Please try refreshing the page.</p>
                    </div>
                </Container>
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
                                    <Button
                                        variant="outline-danger"
                                        onClick={handleWanikaniDelete}
                                        disabled={wanikaniLoading}
                                    >
                                        {wanikaniLoading ?
                                            <Spinner animation="border" size="sm" className="m-2"/> :
                                            <Trash className="m-2"/>}
                                    </Button>
                                )}
                                <Button
                                    variant="success"
                                    onClick={handleWanikaniSave}
                                    disabled={!wanikaniToken || wanikaniLoading}
                                >
                                    {wanikaniLoading ?
                                        <Spinner animation="border" size="sm" className="m-2"/> :
                                        <CheckLg className="m-2"/>}
                                </Button>
                            </InputGroup>
                            {wanikaniError &&
                                <Form.Text className="text-danger d-block mt-2">{wanikaniError}</Form.Text>}

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
                                    <Button
                                        variant="outline-danger"
                                        onClick={handleBunproDelete}
                                        disabled={bunproLoading}
                                    >
                                        {bunproLoading ?
                                            <Spinner animation="border" size="sm" className="m-2"/> :
                                            <Trash className="m-2"/>}
                                    </Button>
                                )}
                                <Button
                                    variant="success"
                                    onClick={handleBunproSave}
                                    disabled={!bunproEmail || !bunproPassword || bunproLoading}
                                >
                                    {bunproLoading ?
                                        <Spinner animation="border" size="sm" className="m-2"/> :
                                        <CheckLg className="m-2"/>}
                                </Button>
                            </InputGroup>
                            {bunproError ?
                                <Form.Text className="text-danger">{bunproError}</Form.Text> :
                                <Form.Text muted>Password need to be re-entered on e-mail update.</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
