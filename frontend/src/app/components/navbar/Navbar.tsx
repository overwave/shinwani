"use client";

import Image from "next/image";
import Link from "next/link";
import {BoxArrowRight, Gear, Person, Search} from 'react-bootstrap-icons';
import {Button, Container, Dropdown, Form, FormControl, Navbar as BootstrapNavbar, Placeholder} from "react-bootstrap";
import "./Navbar.scss";
// import styles from './Navbar.scss';
import {User} from "../../services/types";
import {apiService} from "../../services/api";
import {mutate} from "swr";

interface NavbarProps {
    user: User | undefined;
    loading: boolean;
}

export default function Navbar({user, loading}: NavbarProps) {
    const handleLogout = async () => {
        try {
            const response = await apiService.logoutUser();
            if (response.ok) {
                // Clear SWR cache for all user-related data
                mutate('/user/me');
                mutate('/counts');
                // Redirect to login
                window.location.href = "/login";
            }
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if logout fails, clear cache and redirect to login
            mutate('/user/me');
            mutate('/counts');
            window.location.href = "/login";
        }
    };

    const getUserSection = () => {
        if (loading) {
            return <Placeholder animation="glow" className="ms-4">
                <Placeholder style={{width: "40px", height: "40px"}} className="rounded-circle border"/>
            </Placeholder>
        }
        if (user) {
            return (
                <Dropdown align="end" className="ms-4">
                    <Dropdown.Toggle
                        variant="light"
                        id="user-dropdown"
                        className="dropdown-toggle-custom"
                    >
                        <Image
                            src={user.avatar}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-circle border"
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <h5 className="mx-3 mt-2 mb-3">
                            {user.login}
                            <span className="user-level-pill text-bg-wani">{(user.levels ?? {})["wani"] || 42}</span>
                            <span className="user-level-pill text-bg-bun">{(user.levels ?? {})["bun"] || 73}</span>
                        </h5>

                        <Dropdown.Divider/>
                        <Dropdown.Item as={Link} href="/profile"><Person className="me-2"/>Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} href="/settings"><Gear className="me-2"/>Settings</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleLogout}><BoxArrowRight className="me-2"/>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        } else {
            return (
                <Link href="/login" className="btn btn-primary ms-3">
                    Login
                </Link>
            );
        }
    };

    return (
        <BootstrapNavbar bg="light" expand="lg" className="px-3">
            <Container>
                <BootstrapNavbar.Brand href="#" className="fw-bold">ShinWani</BootstrapNavbar.Brand>

                <div className="position-absolute start-50 translate-middle-x">
                    <Form>
                        <div className="position-relative d-none d-md-block" style={{width: "300px"}}>
                            <FormControl
                                type="search"
                                aria-label="Search"
                            />
                            <div className="position-absolute top-50 end-0 translate-middle-y pe-2 pb-1">
                                <Search/>
                            </div>
                        </div>
                        <Button variant="light" className="d-md-none rounded-circle p-2">
                            <Search className="d-block"/>
                        </Button>
                    </Form>
                </div>

                <div className="ms-auto">
                    {getUserSection()}
                </div>
            </Container>
        </BootstrapNavbar>
    );
}
