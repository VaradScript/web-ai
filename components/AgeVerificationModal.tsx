"use client";
import { useState, useEffect } from 'react';

export default function AgeVerificationModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasVerified = localStorage.getItem('age-verified');
        if (!hasVerified) {
            setIsVisible(true);
        }
    }, []);

    const handleYes = () => {
        localStorage.setItem('age-verified', 'true');
        setIsVisible(false);
    };

    const handleNo = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{
                background: '#1a1a1a',
                padding: '40px',
                borderRadius: '16px',
                maxWidth: '500px',
                width: '90%',
                textAlign: 'center',
                border: '1px solid #333',
                boxShadow: '0 0 50px rgba(255, 0, 85, 0.2)'
            }}>
                <h1 style={{ color: '#fff', marginBottom: '20px', fontSize: '2rem' }}>
                    <span style={{ color: 'var(--primary)' }}>LUSTRA</span>X
                </h1>
                <h2 style={{ color: '#fff', marginBottom: '15px' }}>Age Verification</h2>
                <p style={{ color: '#ccc', marginBottom: '30px', lineHeight: '1.6' }}>
                    This website contains age-restricted materials including nudity and explicit depictions of sexual activity.
                    By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from.
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={handleYes}
                        style={{
                            background: 'var(--primary)',
                            color: '#fff',
                            border: 'none',
                            padding: '15px 40px',
                            borderRadius: '30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        I am 18+ - Enter
                    </button>
                    <button
                        onClick={handleNo}
                        style={{
                            background: 'transparent',
                            color: '#888',
                            border: '1px solid #444',
                            padding: '15px 30px',
                            borderRadius: '30px',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}
