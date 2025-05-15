import React from 'react'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { Aside } from '../components/Aside'
import { Header } from '../components/Header'

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 antialiased">
            {/* <Header /> */}
            <div className="flex flex-1 pt-14">
                <Aside />
                <main className="flex-1 ml-0 md:ml-64 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
