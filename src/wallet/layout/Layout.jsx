import { Aside } from '../components/Aside'
import { HamburgerMenu } from '../components/HamburgerMenu'

//FIXME: queda un borde blanco en la parte inferior del contenido del layout
export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-red-50 dark:bg-gray-900 antialiased">
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
