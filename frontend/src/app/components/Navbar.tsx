"use client";

import Image from "next/image";
import "./Navbar.scss";

interface User {
    login: string;
    avatar: string;
}

interface NavbarProps {
    user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <a className="navbar-brand fw-bold" href="#">LangLearn</a>
            <form className="d-flex ms-auto me-3">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            {user && (
                <div className="position-relative d-inline-block">
                    <Image src={user.avatar} alt="User Avatar" width={40} height={40} className="rounded-circle border" />
                    <span className="navbar-user-badge">
                        {user.login}
                    </span>
                </div>
            )}
        </nav>
    );
}
