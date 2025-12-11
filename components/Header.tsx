"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                    onClick={toggleSidebar}
                    style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                    ☰
                </button>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
                    <span style={{ color: '#fff' }}>LUSTRA</span><span style={{ color: 'var(--primary)' }}>X</span>
                </Link>
            </div>

            <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem' }}>🔔</button>
                <button className="btn-primary">UPGRADE</button>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#555' }}></div>
            </div>
        </header>
    );
}
