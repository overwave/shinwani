"use client";

import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <a className="navbar-brand fw-bold" href="#">Shin Wani</a>
            <form className="d-flex ms-auto me-3">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
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
        </nav>
    );
}
