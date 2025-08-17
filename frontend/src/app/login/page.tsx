'use client'

import {ChangeEvent, FormEvent, KeyboardEvent, useState} from "react";
import {Button, ButtonGroup, Card, Container, Form, Spinner} from 'react-bootstrap';
import {apiService} from '@/app/services/api';
import {UserExists} from '../services/types';
import styles from './Login.module.scss';
import {API_ENDPOINTS} from "@/app/constants/api";
import {getApiUrl} from "@/app/services/config";
import {ArrowLeft} from "react-bootstrap-icons";

type Stage = "Login" | "Registration" | "Password";
type InputError = "ServerError" | "WrongFormat" | "WrongPassword" | undefined;

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState<InputError | undefined>(undefined);
    const [stage, setStage] = useState<Stage>("Login");

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        setInputError(undefined);
    }

    const handleLoginInput = async () => {
        if (isInputLoginInvalid()) return setInputError("WrongFormat");
        setLoading(true);
        setLogin(input);
        const checkResponse = await fetch(`${getApiUrl()}${API_ENDPOINTS.USER.CHECK}?login=${input}`);
        if (!checkResponse.ok) return setInputError("ServerError");
        const check: UserExists = await checkResponse.json();
        setStage(check.exists ? "Password" : "Registration");
        setInput("");
        setLoading(false);
        setInputError(undefined);
    }

    const handleRegistrationInput = async () => {
        setLoading(true);
        await apiService.registerUser(login, input)
            .then(() => apiService.loginUser(login, input))
            .then(() => window.location.href = "/")
            .catch(() => setInputError("ServerError"))
            .finally(() => setLoading(false));
    }

    const handlePasswordInput = async () => {
        setLoading(true);
        return apiService.loginUser(login, input, true)
            .then(() => window.location.href = "/")
            .catch(e => setInputError(e?.status == 401 ? "WrongPassword" : "ServerError"))
            .finally(() => setLoading(false));
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        switch (stage) {
            case "Login":
                return handleLoginInput();
            case "Registration":
                return handleRegistrationInput();
            case "Password":
                return handlePasswordInput();
        }
    }

    const handleReturn = () => {
        setInput(stage == 'Login' ? "" : login);
        setStage('Login');
        setInputError(undefined);
    }

    const handleKeyDown = (event: KeyboardEvent<never>) => {
        if (event.key == 'Escape') handleReturn();
    }

    const getError = (): string | undefined => {
        switch (inputError) {
            case "ServerError":
                return "Произошла ошибка, попробуйте позднее"
            case "WrongFormat":
                return "Логин должен содержать от 4 до 15 символов и начинаться с буквы"
            case "WrongPassword":
                return "Пароль неверный"
            default:
                return undefined;
        }
    }

    const getPromptText = () => {
        switch (stage) {
            case "Login":
                return "Введите логин";
            case "Password":
                return "Введите пароль";
            case "Registration":
                return `Регистрация ${login}`;
        }
    }

    const isInputLoginInvalid = () => !!input && !/^[A-Za-z]\w{3,14}$/.test(input);

    return (
        <div className={styles.formContainer}>
            <Container className="d-flex align-items-center justify-content-center h-100">
                <Card className="border-success" style={{maxWidth: '400px', width: '100%'}}>
                    <Card.Body className="p-4">
                        <Form onKeyDown={handleKeyDown}>
                            <div className="text-center mb-4">
                                <h1 className="h1 mb-3">神ワニ</h1>
                                {/*<div className="d-flex align-items-center justify-content-center mb-3">*/}
                                {/*    <span className="ms-2 fs-5">{getPromptText()}</span>*/}
                                {/*</div>*/}
                            </div>

                            <Form.Group className="mb-4">
                                <Form.Control
                                    type={stage == 'Login' ? "text" : "password"}
                                    placeholder={stage == 'Login' ? "Логин" : "Пароль"}
                                    value={input}
                                    onChange={handleInput}
                                    isInvalid={inputError != undefined}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {getError()}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex gap-2">
                                <ButtonGroup className="flex-grow-1">
                                    {stage != 'Login' && (
                                        <Button variant="outline-success" size="lg" onClick={handleReturn} type="reset">
                                            <ArrowLeft className="mb-1"/>
                                        </Button>
                                    )}
                                    <Button
                                        variant="success"
                                        size="lg"
                                        type="submit"
                                        disabled={!input}
                                        className="w-100"
                                        onClick={handleSubmit}
                                    >
                                        {loading ? <Spinner animation="border" size="sm"/> : "Далее"}
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <footer className="position-fixed bottom-0 w-100 text-center pb-2">
                <a href="https://unsplash.com/photos/brown-tree-with-white-flowers-during-daytime-Ml8WeLdCnRU"
                   className="text-secondary text-decoration-none">Unsplash</a>
            </footer>
        </div>
    );
}
