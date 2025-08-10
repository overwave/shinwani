import "./globals.scss";
import {ReactNode} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    icons: {
        icon: [
            {url: '/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
            {url: '/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
        ],
        apple: [
            {url: '/icon/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
        ],
        other: [
            {rel: 'manifest', url: '/icon/site.webmanifest'},
        ],
    },
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
