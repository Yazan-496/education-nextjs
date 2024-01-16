import 'styles/globals.css'
import Layout from "components/Layout";
import {Inter} from "next/font/google";
import "styles/form.css";
import "react-image-crop/dist/ReactCrop.css";
import App from "./app";
import {cookies} from "next/headers";
import React from "react";

const inter = Inter({subsets: ['latin']})
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextNProgressClient from "helpers/NextNProgressClient";

export const metadata = {
    title: 'Education V1',
    description: 'Education V1',
    icon: "../favicon.ico"
}

export default function RootLayout({children}) {
    const cookieStore = cookies()
    let user
    user = cookieStore.get('user')?.value && JSON.parse(cookieStore.get('user')?.value)?.user
    return (
        <html lang="en">
        <body className={inter.className}>
        <App user={user}>
        <Layout user={user}>{children}
        </Layout>
        </App>
        <NextNProgressClient/>
        </body>
        </html>
    )
}
