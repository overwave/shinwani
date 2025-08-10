"use client";

import Image from "next/image";
import Link from "next/link";
import { Dropdown, Navbar as BootstrapNavbar, Nav, Form, FormControl } from "react-bootstrap";
import "./Navbar.scss";

interface User {
    login: string;
    avatar: string;
}

interface NavbarProps {
    user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
    const handleLogout = () => {
        console.log("logout");
    };

    return (
        <BootstrapNavbar bg="light" expand="lg" className="px-3">
            <BootstrapNavbar.Brand href="#" className="fw-bold">Shin Wani</BootstrapNavbar.Brand>
            <Form className="d-flex ms-auto me-3">
                <FormControl type="search" placeholder="Search" aria-label="Search" className="me-2" />
            </Form>
            {user && (
                <Dropdown align="end">
                    <Dropdown.Toggle 
                        variant="light" 
                        id="user-dropdown"
                        className="p-0 border-0 bg-transparent shadow-none dropdown-toggle-custom"
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
                        <Dropdown.Item as={Link} href="/profile">
                            <i className="bi bi-person me-2"></i>Profile
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} href="/settings">
                            <i className="bi bi-gear me-2"></i>Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </BootstrapNavbar>
    );
}
