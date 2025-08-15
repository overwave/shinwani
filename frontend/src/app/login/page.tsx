'use client'

import { FormEvent, useState, useEffect } from "react";
import { ArrowLeft } from 'react-bootstrap-icons';
import { apiService } from '@/app/services';
import { useCheckUserExists } from '../services/hooks';
import styles from './Login.module.scss';

type Stage = "Login" | "Registration" | "Password";
type LoginStage = "Idle" | "Loading" | "Next" | "ServerError" | "EmptyLoginError";
type RegistrationStage = "Idle" | "Loading" | "ServerError" | "EmptyPasswordError";
type PasswordStage = "Idle" | "Loading" | "ServerError" | "WrongPasswordError" | "EmptyPasswordError";

type AuthenticateResponse = { result: "SUCCESS" | "FAILED" }

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [input, setInput] = useState("");

    const [stage, setStage] = useState<Stage>("Login");
    const [subStage, setSubStage] = useState<LoginStage | RegistrationStage | PasswordStage>("Idle");

    // Use SWR hook for checking user existence
    const { exists, loading: checkLoading, error: checkError } = useCheckUserExists(login);

    // Handle user existence check result
    useEffect(() => {
        if (login && exists !== undefined) {
            setSubStage("Idle");
            exists ? setStage("Password") : setStage("Registration");
            setInput("");
        }
    }, [login, exists]);

    const handleLoginInput = (loginInput: string) => {
        if (!loginInput) {
            setSubStage("EmptyLoginError");
            return;
        }
        setSubStage("Loading");
        setLogin(loginInput);
    }

    // Update loading state based on SWR
    useEffect(() => {
        if (checkLoading) {
            setSubStage("Loading");
        } else if (checkError) {
            setSubStage("ServerError");
        }
    }, [checkLoading, checkError]);

    const handleRegistrationInput = (password: string) => {
        if (!password) {
            setSubStage("EmptyPasswordError");
            return;
        }
        setSubStage("Loading");
        apiService.registerUser(login, password)
            .then(() => apiService.loginUser(login, password))
            .then(() => { window.location.href = "/"; })
            .catch(() => setSubStage("ServerError"));
    }

    const handlePasswordInput = (password: string) => {
        if (!password) {
            setSubStage("EmptyPasswordError");
            return;
        }
        setSubStage("Loading");
        apiService.loginUser(login, password, true)
            .then(({result}: AuthenticateResponse) => {
                if (result == "SUCCESS") {
                    // Redirect to home page - SWR will automatically fetch user data
                    window.location.href = "/";
                } else {
                    setSubStage("WrongPasswordError");
                }
            })
            .catch(() => setSubStage("ServerError"));
    }

    const handleInput = async (event: FormEvent) => {
        event.preventDefault();
        switch (stage) {
            case "Login":
                return handleLoginInput(input);
            case "Registration":
                return handleRegistrationInput(input);
            case "Password":
                return handlePasswordInput(input);
        }
    }

    const getError = () => {
        switch (subStage) {
            case "ServerError":
                return "Произошла ошибка, попробуйте позднее"
            case "EmptyLoginError":
                return "Введите логин"
            case "EmptyPasswordError":
                return "Введите пароль"
            case "WrongPasswordError":
                return "Пароль неверный"
            default:
                return undefined;
        }
    }

    return (
        <div className={styles.formContainer}>
            <main className="border border-success rounded-3">
                <form onSubmit={handleInput}>
                    <h1 className="h1 mb-3">📚</h1>
                    <div className={styles.promptLabel}>
                        <div
                            className={`${styles.promptText} ${stage == 'Login' ? 'opacity-100' : 'opacity-0'}`}>
                            Введите логин
                        </div>
                        <div className={`${styles.promptText} ${stage == 'Password' ? 'opacity-100' : 'opacity-0'}`}>
                            Введите пароль
                        </div>
                        <div className={`${styles.promptText} ${stage == 'Registration' ? 'opacity-100' : 'opacity-0'}`}>
                            Придумайте пароль
                        </div>
                    </div>

                    <div className="form-floating mb-4">
                        <input 
                            type={stage == 'Login' ? "text" : "password"} 
                            id="input" 
                            placeholder="overwave"
                            className={`form-control ${getError() ? 'is-invalid' : ''}`}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setSubStage("Idle");
                            }}
                        />
                        <label htmlFor="input">{stage == 'Login' ? 'Логин' : 'Пароль'}</label>
                        <div className="invalid-feedback">{getError()}</div>
                    </div>

                    <div className="btn-group w-100" role="group" aria-label="Login form controls">
                        {stage !== 'Login' &&
                            <button 
                                type="button" 
                                className="btn btn-lg btn-outline-success"
                                onClick={(e) => {
                                    setStage('Login');
                                    setSubStage('Idle');
                                    setInput(login);
                                }}>
                                <ArrowLeft aria-hidden="true"/>
                            </button>
                        }
                        <button
                            disabled={subStage == "Loading"}
                            className={`${styles.mainButton} w-100 btn btn-lg btn-success`}
                            type="submit">
                            {subStage !== "Loading" ? "Далее" :
                                <div className={`${styles.spinnerBorder} spinner-border`} role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </div>
                            }
                        </button>
                    </div>
                </form>
            </main>
            <footer className="fixed-bottom">
                <a href="https://unsplash.com/photos/brown-tree-with-white-flowers-during-daytime-Ml8WeLdCnRU"
                   className="text-secondary">Unsplash</a>
            </footer>
        </div>
    );
}
