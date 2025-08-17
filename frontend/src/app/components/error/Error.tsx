"use client";

import {Container} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";

export interface ComponentProps {
    text?: string;
}

export default function Error({text}: ComponentProps = {}) {
    return (
        <Container className="py-4">
            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <ExclamationTriangle size={64} className="text-danger mb-3"/>
                <h2 className="text-danger">Error</h2>
                <p className="text-muted">{text || "Failed to receive data. Please try refreshing the page."}</p>
            </div>
        </Container>
    );
}
