import { Aside } from '../components/Aside'
import { HamburgerMenu } from '../components/HamburgerMenu'

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#E9F1F7] dark:bg-gray-900 antialiased">
            {/* <Header /> */}
            <div className="flex flex-1 pt-14">
                <HamburgerMenu />
                <Aside />
                <main className="flex-1 ml-0 md:ml-64 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
