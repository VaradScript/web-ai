"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Modern SVG Icons for Mobile
const Icons = {
    Home: ({ active }: { active: boolean }) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    Shorts: ({ active }: { active: boolean }) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            <path d="M10 8v8l6-4-6-4z" fill={active ? "#000" : "currentColor"} stroke="none"></path>
        </svg>
    ),
    Live: ({ active }: { active: boolean }) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z"></path>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
    ),
    Premium: ({ active }: { active: boolean }) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
        </svg>
    )
};

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0 25px 0', // Extra padding at bottom for iOS home indicator
            zIndex: 1000,
            boxShadow: '0 -10px 40px rgba(0,0,0,0.8)'
        }} className="mobile-nav">
            <Link href="/" style={{
                color: isActive('/') ? 'var(--primary)' : '#666',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.7rem',
                flex: 1,
                gap: '4px'
            }}>
                <Icons.Home active={isActive('/')} />
                <span style={{ fontWeight: isActive('/') ? '600' : '400' }}>Home</span>
            </Link>

            <Link href="/reels" style={{
                color: isActive('/reels') ? 'var(--primary)' : '#666',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.7rem',
                flex: 1,
                gap: '4px'
            }}>
                <Icons.Shorts active={isActive('/reels')} />
                <span style={{ fontWeight: isActive('/reels') ? '600' : '400' }}>Shorts</span>
            </Link>

            <div style={{ position: 'relative', top: '-25px' }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, var(--primary), #ff00cc)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(255, 0, 85, 0.5)',
                    border: '3px solid #0f0f0f',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
            </div>

            <Link href="/live" style={{
                color: isActive('/live') ? 'var(--primary)' : '#666',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.7rem',
                flex: 1,
                gap: '4px'
            }}>
                <Icons.Live active={isActive('/live')} />
                <span style={{ fontWeight: isActive('/live') ? '600' : '400' }}>Live</span>
            </Link>

            <Link href="/premium" style={{
                color: isActive('/premium') ? 'var(--primary)' : '#666',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.7rem',
                flex: 1,
                gap: '4px'
            }}>
                <Icons.Premium active={isActive('/premium')} />
                <span style={{ fontWeight: isActive('/premium') ? '600' : '400' }}>Premium</span>
            </Link>
        </div>
    );
}
