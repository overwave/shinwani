"use client";

import Image from "next/image";
import Link from "next/link";
import {BoxArrowRight, Gear, Person, Search, X} from 'react-bootstrap-icons';
import {Button, Container, Dropdown, Form, FormControl, Modal, Navbar as BootstrapNavbar, Placeholder} from "react-bootstrap";
import "./Navbar.scss";
import {apiService} from "../../services/api";
import {mutate} from "swr";
import {useState, useCallback} from "react";
import useSWR from "swr";
import {useUser} from "@/app/hooks/useApi";

export default function Navbar() {
    const { data: user, isLoading: userLoading } = useUser();
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Debounced search with SWR
    const { data: searchResults, isLoading: isSearching } = useSWR(
        searchQuery ? `/api/search?q=${encodeURIComponent(searchQuery)}` : null,
        async (url) => {
            // Mock backend response for now
            await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
            return [
                { id: 1, title: "Sample Result 1", type: "lesson" },
                { id: 2, title: "Sample Result 2", type: "review" },
                { id: 3, title: "Sample Result 3", type: "kanji" }
            ];
        },
        {
            dedupingInterval: 500, // Debounce requests
            revalidateOnFocus: false,
        }
    );

    const handleSearchClick = useCallback(() => {
        setShowSearchModal(true);
        setSearchQuery("");
    }, []);

    const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleCloseSearchModal = useCallback(() => {
        setShowSearchModal(false);
        setSearchQuery("");
    }, []);

    const handleLogout = async () => {
        try {
            const response = await apiService.logoutUser();
            if ((response as any)?.success ?? true) {
                // Clear SWR cache for all user-related data
                mutate('/users/me');
                mutate('/courses/counts');
                // Redirect to login
                window.location.href = "/login";
            }
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if logout fails, clear cache and redirect to login
            mutate('/users/me');
            mutate('/courses/counts');
            window.location.href = "/login";
        }
    };

    const getUserSection = () => {
        if (userLoading) {
            return <Placeholder animation="glow" className="ms-4">
                <Placeholder style={{width: "40px", height: "40px"}} className="rounded-circle border"/>
            </Placeholder>
        }
        if (user) {
            return (
                <Dropdown align="end" className="ms-4">
                    <Dropdown.Toggle
                        variant="outline-primary"
                        id="user-dropdown"
                        className="dropdown-toggle-custom"
                    >
                        <Image
                            src={user.avatar}
                            alt="User Avatar"
                            width={40}
                            height={40}
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
                <BootstrapNavbar.Brand href="/" className="fw-bold">ShinWani</BootstrapNavbar.Brand>

                <div className="position-absolute start-50 translate-middle-x">
                    <Form>
                        <div className="position-relative d-none d-md-block" style={{width: "300px"}}>
                            <FormControl
                                type="search"
                                aria-label="Search"
                                placeholder="Search..."
                                onClick={handleSearchClick}
                                readOnly
                                style={{cursor: "pointer"}}
                            />
                            <div className="position-absolute top-50 end-0 translate-middle-y pe-2 pb-1">
                                <Search/>
                            </div>
                        </div>
                        <Button variant="light" className="d-md-none rounded-circle p-2" onClick={handleSearchClick}>
                            <Search className="d-block"/>
                        </Button>
                    </Form>
                </div>

                <div className="ms-auto">
                    {getUserSection()}
                </div>
            </Container>

            {/* Search Modal */}
            <Modal
                show={showSearchModal}
                onHide={handleCloseSearchModal}
                fullscreen="md-down"
                className="search-modal"
            >
                <Modal.Header className="border-0 pb-0">
                    <div className="w-100 position-relative">
                        <FormControl
                            type="search"
                            placeholder="Search lessons, reviews, kanji..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="form-control-lg"
                            autoFocus
                        />
                        <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                            <Button variant="link" className="p-0 text-muted" onClick={handleCloseSearchModal}>
                                <X size={24} />
                            </Button>
                        </div>
                    </div>
                </Modal.Header>
                
                <Modal.Body className="pt-0">
                    {searchQuery && (
                        <div>
                            {isSearching ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : searchResults && searchResults.length > 0 ? (
                                <div className="search-results">
                                    {searchResults.map((result: any) => (
                                        <div key={result.id} className="search-result-item p-3 border-bottom">
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <span className={`badge bg-${result.type === 'lesson' ? 'primary' : result.type === 'review' ? 'success' : 'warning'}`}>
                                                        {result.type}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1">{result.title}</h6>
                                                    <small className="text-muted">Click to view details</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-muted">
                                    <Search size={48} className="mb-3" />
                                    <p>No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {!searchQuery && (
                        <div className="text-center py-5 text-muted">
                            <Search size={64} className="mb-3" />
                            <h5>Search ShinWani</h5>
                            <p>Start typing to search for lessons, reviews, and kanji</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </BootstrapNavbar>
    );
}
