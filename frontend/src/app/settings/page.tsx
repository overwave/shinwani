'use client';

import {ChangeEvent, Dispatch, FormEvent, useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import {useSettings} from '../services/hooks';
import Navbar from "@/app/components/navbar/Navbar";
import {CheckLg, Trash} from "react-bootstrap-icons";
import {apiService} from '@/app/services/api';
import {UpdateCredentialsResponse} from "@/app/services/types";
import Error from "@/app/components/error/Error";

type InputState = "loading" | "sync" | "updated" | "just_sync" | "failed" | "wrong";

const cleanupLater = (updater: Dispatch<"sync">) => setTimeout(() => updater("sync"), 3000);

export default function SettingsPage() {
    const {data, error, isLoading, mutate} = useSettings();

    const [wanikaniToken, setWanikaniToken] = useState<string | undefined>(undefined);
    const [bunproEmail, setBunproEmail] = useState<string | undefined>(undefined);
    const [bunproPassword, setBunproPassword] = useState<string | undefined>(undefined);

    const [wanikaniInputState, setWanikaniInputState] = useState<InputState>("loading");
    const [bunproInputState, setBunproInputState] = useState<InputState>("loading");

    const [wanikaniLogin, setWanikaniLogin] = useState<string | undefined>(undefined);
    const [bunproLogin, setBunproLogin] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setWanikaniInputState("sync");
            setBunproInputState("sync");
            if (data.wanikaniApiToken) setWanikaniToken(data.wanikaniApiToken);
            if (data.bunproEmail) setBunproEmail(data.bunproEmail);
        }
    }, [data]);

    const handleSave = async (
        valueUpdater: Dispatch<string>,
        inputUpdater: Dispatch<InputState>,
        saveFunction: () => Promise<UpdateCredentialsResponse>,
    ) => {
        inputUpdater("loading");
        try {
            const response = await saveFunction();
            if (!response.login) {
                inputUpdater("wrong");
                return;
            }
            await mutate();
            inputUpdater("just_sync");
            valueUpdater(response.login);
            cleanupLater(inputUpdater);
        } catch (error) {
            console.error('Failed to save settings:', error);
            inputUpdater("failed");
        }
    }

    const handleWanikaniSave = async () =>
        handleSave(setWanikaniLogin, setWanikaniInputState,
            () => apiService.updateWanikaniSettings({apiToken: wanikaniToken!}));

    const handleBunproSave = async () =>
        handleSave(setBunproLogin, setBunproInputState,
            () => apiService.updateBunproSettings({email: bunproEmail!, password: bunproPassword!}));

    const handleWanikaniSubmit = async (event: FormEvent) => {
        event.preventDefault();
        return handleWanikaniSave();
    }
    const handleBunproSubmit = async (event: FormEvent) => {
        event.preventDefault();
        return handleBunproSave();
    }

    const handleDelete = async (
        valueUpdater: Dispatch<undefined>,
        inputUpdater: Dispatch<InputState>,
        deleteFunction: () => Promise<void>,
    ) => {
        inputUpdater("loading");
        try {
            await deleteFunction();
            await mutate();
            valueUpdater(undefined);
            inputUpdater("sync");
        } catch (error) {
            console.error('Failed to delete settings:', error);
            inputUpdater("failed");
        }
    }

    const handleWanikaniDelete = async () =>
        handleDelete(setWanikaniToken, setWanikaniInputState, apiService.deleteWanikaniSettings);

    const handleBunproDelete = async () =>
        handleDelete(value => {
            setBunproEmail(value);
            setBunproPassword(value);
        }, setBunproInputState, apiService.deleteBunproSettings);

    const onInputChange = (
        valueUpdater: Dispatch<string | undefined>,
        inputUpdater: Dispatch<InputState>,
    ): Dispatch<ChangeEvent<HTMLInputElement>> =>
        event => {
            valueUpdater(event.target.value);
            inputUpdater("updated");
        };

    const isDisabledInput = (state: InputState): boolean => {
        switch (state) {
            case "loading":
            case "sync":
            case "just_sync":
                return true;
            case "updated":
            case "failed":
            case "wrong":
                return false;
        }
    }

    const getWanikaniInputSubtitle = () => {
        const {text, type} = (() => {
            switch (wanikaniInputState) {
                case "failed":
                    return {text: "Failed to update Wanikani settings. Please try again.", type: "text-danger"}
                case "wrong":
                    return {
                        text: "Failed to verify Wanikani token. Please check it and try again.",
                        type: "text-danger"
                    }
                case "just_sync":
                    return {text: `Successfully logged in as ${wanikaniLogin}.`, type: "text-success"}
                case "loading":
                case "updated":
                case "sync":
                    return {text: "API Token should have all the permissions.", type: "text-body-secondary"}
            }
        })();
        return <Form.Text className={`${type} mt-2`}>{text}</Form.Text>
    };

    const getBunproInputSubtitle = () => {
        const {text, type} = (() => {
            switch (bunproInputState) {
                case "failed":
                    return {text: "Failed to save Bunpro settings. Please try again.", type: "text-danger"}
                case "wrong":
                    return {
                        text: "Failed to login with given Bunpro credentials. Please check it and try again.",
                        type: "text-danger"
                    }
                case "just_sync":
                    return {text: `Successfully logged in as ${bunproLogin}.`, type: "text-success"}
                case "loading":
                case "updated":
                case "sync":
                    return {text: "Password need to be re-entered on e-mail update.", type: "text-body-secondary"}
            }
        })();
        return <Form.Text className={`${type} mt-2`}>{text}</Form.Text>
    };

    const getLoadingFragment = () =>
        <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>;

    const getSettingsFragment = () =>
        <Container className="py-4">
            <h1 className="mb-3">Settings</h1>
            <Row md={2}>
                <Col>
                    <Form onSubmit={handleWanikaniSubmit}>
                        <h4 className="my-3">WaniKani</h4>
                        <InputGroup>
                            <FloatingLabel controlId="waniKaniApiKey" label="API Token">
                                <Form.Control
                                    type="text"
                                    placeholder="API Token"
                                    value={wanikaniToken || ""}
                                    onChange={onInputChange(setWanikaniToken, setWanikaniInputState)}
                                />
                            </FloatingLabel>
                            {wanikaniToken && (
                                <Button
                                    variant="outline-danger"
                                    onClick={handleWanikaniDelete}
                                    disabled={wanikaniInputState == "loading"}
                                    type="reset"
                                >
                                    {wanikaniInputState == "loading" ?
                                        <Spinner animation="border" size="sm" className="m-2"/> :
                                        <Trash className="m-2"/>}
                                </Button>
                            )}
                            <Button
                                variant="success"
                                onClick={handleWanikaniSave}
                                disabled={!wanikaniToken || isDisabledInput(wanikaniInputState)}
                                type="submit"
                            >
                                {wanikaniInputState == "loading" ?
                                    <Spinner animation="border" size="sm" className="m-2"/> :
                                    <CheckLg className="m-2"/>}
                            </Button>
                        </InputGroup>
                        {getWanikaniInputSubtitle()}
                    </Form>

                    <Form onSubmit={handleBunproSubmit}>
                        <h4 className="my-3">Bunpro</h4>
                        <InputGroup>
                            <FloatingLabel controlId="bunproEmail" label="E-mail">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Bunpro email"
                                    value={bunproEmail || ""}
                                    onChange={onInputChange(setBunproEmail, setBunproInputState)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="bunproPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your Bunpro password"
                                    value={bunproPassword || ""}
                                    onChange={onInputChange(setBunproPassword, setBunproInputState)}
                                />
                            </FloatingLabel>
                            {bunproEmail && (
                                <Button
                                    variant="outline-danger"
                                    onClick={handleBunproDelete}
                                    disabled={bunproInputState == "loading"}
                                    type="reset"
                                >
                                    {bunproInputState == "loading" ?
                                        <Spinner animation="border" size="sm" className="m-2"/> :
                                        <Trash className="m-2"/>}
                                </Button>
                            )}
                            <Button
                                variant="success"
                                onClick={handleBunproSave}
                                disabled={!bunproEmail || !bunproPassword || isDisabledInput(bunproInputState)}
                                type="submit"
                            >
                                {bunproInputState == "loading" ?
                                    <Spinner animation="border" size="sm" className="m-2"/> :
                                    <CheckLg className="m-2"/>}
                            </Button>
                        </InputGroup>
                        {getBunproInputSubtitle()}
                    </Form>
                </Col>
            </Row>
        </Container>;

    return (
        <>
            <Navbar/>
            {isLoading && getLoadingFragment()}
            {error && <Error text="Failed to load settings. Please try refreshing the page."/>}
            {!isLoading && !error && getSettingsFragment()}
        </>
    );
}
