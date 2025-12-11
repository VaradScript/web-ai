"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Link from 'next/link';
import Sidebar from './Sidebar';
import ModeBanner from './ModeBanner';
import BottomNav from './BottomNav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <div className="app-layout">
                <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} onClose={() => { setIsMobile(true); setIsSidebarOpen(false); }} />

                <main
                    className="main-content"
                    style={{
                        marginLeft: isMobile ? 0 : (isSidebarOpen ? '240px' : '0'),
                        width: '100%',
                        transition: 'margin-left 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 'calc(100vh - 64px)' // Ensure full height logic
                    }}
                >
                    <div style={{ flex: 1 }}>
                        {children}
                    </div>

                    {/* LEGAL COMPLIANCE FOOTER */}
                    <footer style={{
                        padding: '40px 20px',
                        background: '#0a0a0a',
                        borderTop: '1px solid #222',
                        marginTop: '40px',
                        color: '#666',
                        fontSize: '0.75rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#888' }}>
                                18+ WARNING: This site contains sexually explicit material.
                            </p>
                            <p style={{ marginBottom: '20px', lineHeight: '1.5' }}>
                                Please read our <a href="#" className="hover:text-white underline">Terms of Service</a> and <a href="#" className="hover:text-white underline">Privacy Policy</a>.
                                By entering this site, you certify that you are at least 18 years old (or the age of majority in your jurisdiction)
                                and that you wish to view such content.
                            </p>

                            <div style={{ borderTop: '1px solid #222', paddingTop: '20px', marginTop: '20px' }}>
                                <p style={{ fontStyle: 'italic' }}>
                                    18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
                                </p>
                                <p style={{ marginTop: '5px' }}>
                                    All models, actors, actresses and other persons that appear in any visual depiction of actual or simulated sexually explicit conduct
                                    appearing on or otherwise contained in this website were over the age of eighteen (18) years at the time of the creation of such depictions.
                                    Records required for all content items are kept by the custodian of records at the corporate office.
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                                <a href="#" className="hover:text-white">DMCA / Copyright</a>
                                <a href="#" className="hover:text-white">2257 Exemptions</a>
                                <a href="#" className="hover:text-white">Parental Controls</a>
                                <a href="#" className="hover:text-white">Contact Support</a>
                            </div>

                            <p style={{ marginTop: '30px', opacity: 0.5 }}>
                                © 2024 LustraX Premium Network. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </main>
            </div>

            <BottomNav />
        </>
    );
}
