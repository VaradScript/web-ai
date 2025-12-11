"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Modern SVG Icons
const Icons = {
    Home: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    Trending: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.3-1.12.5-1.68.5-2.18 0-.5-.2-1-.5-2 1.5 2 2.5 4 2.5 6z"></path>
        </svg>
    ),
    Shorts: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            <path d="M10 8v8l6-4-6-4z" fill="currentColor" stroke="none"></path>
        </svg>
    ),
    Live: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z"></path>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
    ),
    Premium: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
        </svg>
    ),
    Categories: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    ),
    Favorites: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    )
};

interface SidebarProps {
    isOpen: boolean;
    isMobile: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { icon: <Icons.Home />, label: 'Home', path: '/' },
        { icon: <Icons.Trending />, label: 'Trending', path: '/?category=Trending' },
        { icon: <Icons.Shorts />, label: 'Shorts', path: '/reels' },
        // Premium removed as requested
        { icon: <Icons.Categories />, label: 'Categories', path: '/categories' },
        { icon: <Icons.Favorites />, label: 'Favorites', path: '/favorites' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isMobile && isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 99,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            <aside
                className="sidebar"
                style={{
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    width: '240px',
                    transition: 'transform 0.3s ease'
                }}
            >
                <div style={{ padding: '20px' }}>
                    {menuItems.map((item) => (
                        <Link
                            href={item.path}
                            key={item.path}
                            onClick={() => isMobile && onClose()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px',
                                borderRadius: '12px',
                                marginBottom: '8px',
                                background: pathname === item.path ? 'linear-gradient(90deg, rgba(255, 0, 85, 0.15), transparent)' : 'transparent',
                                color: pathname === item.path ? 'var(--primary)' : '#888',
                                fontWeight: pathname === item.path ? '600' : '500',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                borderLeft: pathname === item.path ? '3px solid var(--primary)' : '3px solid transparent'
                            }}
                            className="sidebar-item"
                        >
                            <span style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                            <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Subscriptions section removed */}
            </aside>
        </>
    );
}
