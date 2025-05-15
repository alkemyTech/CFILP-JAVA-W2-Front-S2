import { Route, Routes } from 'react-router'
import { Layout } from '../layout/Layout'
import { Dashboard } from "../pages/Dashboard";

export const AppRouter = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/about" element={<h1>About</h1>} />
                </Routes>
            </Layout>
        </>
    )
}
