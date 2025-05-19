import { useState } from 'react';

export const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);

    // Alterna la clase para mostrar/ocultar el aside
    const toggleAside = () => {
        setOpen(!open);
        const aside = document.getElementById("drawer-navigation");
        if (aside) {
            aside.classList.toggle("-translate-x-full");
        }
    };


    return (
        <button
            className="fixed top-4 left-4 z-50 p-2 rounded bg-gray-200 dark:bg-gray-700 md:hidden"
            onClick={toggleAside}
            aria-label="Abrir menú"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    );
}
