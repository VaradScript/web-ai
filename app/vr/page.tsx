import Link from 'next/link';

export default function VRPage() {
    return (
        <main className="container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="section-title" style={{ margin: 0, textAlign: 'left' }}>VR Experiences</h1>
                <Link href="/" className="btn btn-outline">Back to Home</Link>
            </div>

            <p style={{ color: '#ccc', marginBottom: '40px', fontSize: '1.2rem' }}>
                Immerse yourself in our exclusive Virtual Reality content. Compatible with all major headsets.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '30px'
            }}>
                {[1, 2, 3].map((i) => (
                    <div key={i} style={{
                        background: 'var(--surface)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{
                            height: '200px',
                            background: 'linear-gradient(45deg, #2d0a31, #000)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: 'var(--secondary)',
                                color: '#fff',
                                padding: '4px 8px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                borderRadius: '4px',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>VR 180°</span>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '2rem' }}>🥽</span>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ color: 'var(--primary)', margin: '0 0 10px 0' }}>VR Experience {i}</h3>
                            <p style={{ margin: '0 0 15px 0', color: '#888', fontSize: '0.9rem' }}>Immersive • 8K • Binaural Audio</p>
                            <button className="btn btn-primary" style={{ width: '100%' }}>Enter VR</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
