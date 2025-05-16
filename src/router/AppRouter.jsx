import { Navigate, Route, Routes } from 'react-router';
import { WalletRouter } from '../wallet/router/WalletRouter';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRouter = () => {

    const authStatus = 'authenticated';

    return (
        <>
            {
                <Routes>
                    {
                        (authStatus === 'authenticated') ? (

                            <Route path="/*" element={<WalletRouter />} />
                        ) :
                            (<Route path="/auth/*" element={<AuthRoutes />} />)
                    }
                    <Route path='/*' element={<Navigate to="/auth/login" />} />
                </Routes>
            }

        </>
    )
}
