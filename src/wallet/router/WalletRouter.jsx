import { Navigate, Route, Routes } from 'react-router';
import { Layout } from "../layout/Layout";
import { Accounts, Dashboard } from '../pages';


export const WalletRouter = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/*" element={<Navigate to={"/"} />} />
                </Routes>
            </Layout>
        </>
    )
}
