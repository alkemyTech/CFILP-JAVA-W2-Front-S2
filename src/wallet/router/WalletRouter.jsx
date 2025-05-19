import { Navigate, Route, Routes } from 'react-router';
import { Dashboard } from "../pages/Dashboard";
import { Layout } from "../layout/Layout";

export const WalletRouter = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/*" element={<Navigate to={"/"} />} />
                </Routes>
            </Layout>
        </>
    )
}
