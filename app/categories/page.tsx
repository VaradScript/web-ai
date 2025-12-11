"use client";
import React from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
    const categories = [
        { name: 'Anal', gradient: 'linear-gradient(135deg, #ff0055, #bd00ff)' },
        { name: 'Teen', gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)' },
        { name: 'Milf', gradient: 'linear-gradient(135deg, #f85032, #e73827)' },
        { name: 'Asian', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
        { name: 'Public', gradient: 'linear-gradient(135deg, #e1eec3, #f05053)' },
        { name: 'Lesbian', gradient: 'linear-gradient(135deg, #cc2b5e, #753a88)' },
        { name: 'Hardcore', gradient: 'linear-gradient(135deg, #000000, #434343)' },
        { name: 'POV', gradient: 'linear-gradient(135deg, #1f4037, #99f2c8)' },
        { name: 'Gangbang', gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' },
        { name: 'Booty', gradient: 'linear-gradient(135deg, #FDC830, #F37335)' },
        { name: 'Trending', gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)' },
        { name: 'Recommended', gradient: 'linear-gradient(135deg, #00B4DB, #0083B0)' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>Browse Categories</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px'
            }}>
                {categories.map((cat) => (
                    <Link href={`/?category=${cat.name}`} key={cat.name} style={{ textDecoration: 'none' }}>
                        <div style={{
                            height: '150px',
                            borderRadius: '16px',
                            background: cat.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                zIndex: 2
                            }}>
                                {cat.name}
                            </span>

                            {/* Abstract Pattern Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                                opacity: 0.3
                            }}></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
