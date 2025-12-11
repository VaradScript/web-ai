import Link from 'next/link';

export default function LivePage() {
    return (
        <main className="container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="section-title" style={{ margin: 0, textAlign: 'left' }}>Live Streams</h1>
                <Link href="/" className="btn btn-outline">Back to Home</Link>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '30px'
            }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} style={{
                        background: 'var(--surface)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        transition: 'transform 0.2s'
                    }}>
                        <div style={{
                            height: '200px',
                            background: '#000',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: '#ff0000',
                                color: '#fff',
                                padding: '4px 8px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                borderRadius: '4px',
                                boxShadow: '0 0 10px rgba(255,0,0,0.5)'
                            }}>LIVE</span>
                            <span style={{ color: '#555' }}>Stream Preview {i}</span>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h3 style={{ color: 'var(--primary)', margin: 0 }}>Model Name {i}</h3>
                                <span style={{ color: '#4caf50', fontSize: '0.8rem' }}>● Online</span>
                            </div>
                            <p style={{ margin: '0 0 15px 0', color: '#888', fontSize: '0.9rem' }}>Interactive Chat • 4K Ultra HD</p>
                            <button className="btn btn-outline" style={{ width: '100%' }}>Watch Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
