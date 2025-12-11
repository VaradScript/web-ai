"use client";
import { useState, useEffect, useRef } from 'react';

type Gender = 'female' | 'male';
type Language = 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'ja-JP' | 'hi-IN';
type Tone = 'romantic' | 'dominant' | 'playful' | 'strict';
type Accent = 'US' | 'UK' | 'AU' | 'Native';

interface UserPreferences {
    gender: Gender;
    language: Language;
    tone: Tone;
    accent: Accent;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'French', flag: '🇫🇷' },
    { code: 'de-DE', label: 'German', flag: '🇩🇪' },
    { code: 'ja-JP', label: 'Japanese', flag: '🇯🇵' },
    { code: 'hi-IN', label: 'Hindi', flag: '🇮🇳' },
];

const TONES: { id: Tone; label: string; emoji: string; desc: string }[] = [
    { id: 'romantic', label: 'Romantic & Lusty', emoji: '💋', desc: 'Soft, breathy, and intimate.' },
    { id: 'dominant', label: 'Dominant', emoji: '😈', desc: 'Commanding, confident, and firm.' },
    { id: 'playful', label: 'Playful', emoji: '🎉', desc: 'Fun, energetic, and teasing.' },
    { id: 'strict', label: 'Strict', emoji: '📏', desc: 'Cold, precise, and disciplinarian.' },
];

export default function VoiceAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const [setupStep, setSetupStep] = useState(0); // 0: Gender, 1: Language, 2: Tone, 3: Accent, 4: Active
    const [prefs, setPrefs] = useState<UserPreferences>({
        gender: 'female',
        language: 'en-US',
        tone: 'romantic',
        accent: 'US'
    });

    const [status, setStatus] = useState<'idle' | 'listening' | 'speaking' | 'connecting'>('idle');
    const [transcript, setTranscript] = useState('');
    const [generatedPersona, setGeneratedPersona] = useState({ name: '', avatar: '', color: '' });

    // Reset setup when closed
    useEffect(() => {
        if (!isOpen) {
            setSetupStep(0);
            setStatus('idle');
        }
    }, [isOpen]);

    // Generate Persona based on prefs
    useEffect(() => {
        if (setupStep === 4) {
            let name = '';
            let avatar = '';
            let color = '';

            if (prefs.gender === 'female') {
                avatar = '/assets/thumb3.png'; // Red lingerie
                color = '#ff0055';
                if (prefs.tone === 'romantic') name = 'Mistress Rose';
                if (prefs.tone === 'dominant') name = 'Goddess V';
                if (prefs.tone === 'playful') name = 'Bunny';
                if (prefs.tone === 'strict') name = 'Ms. Stone';
            } else {
                avatar = '/assets/thumb4.png'; // Gym guy placeholder
                color = '#00ccff';
                if (prefs.tone === 'romantic') name = 'Romeo';
                if (prefs.tone === 'dominant') name = 'Master X';
                if (prefs.tone === 'playful') name = 'Jax';
                if (prefs.tone === 'strict') name = 'Sir';
            }
            setGeneratedPersona({ name, avatar, color });
        }
    }, [setupStep, prefs]);

    const handleNext = () => setSetupStep(prev => prev + 1);
    const handleBack = () => setSetupStep(prev => prev - 1);

    const getResponse = (text: string) => {
        const lower = text.toLowerCase();
        // Customize response based on Tone
        if (prefs.tone === 'romantic') {
            if (lower.includes('hello')) return "Mmm, hello darling. I've been waiting for you.";
            return "Tell me what you desire... I want to hear everything.";
        }
        if (prefs.tone === 'dominant') {
            if (lower.includes('hello')) return "On your knees. Good.";
            return "Speak clearly. I don't have all day.";
        }
        return "I'm listening. Go on.";
    };

    const startListening = () => {
        setStatus('listening');
        setTranscript("Listening...");
        setTimeout(() => {
            const mockInput = "Hello";
            setTranscript(mockInput);
            setStatus('speaking');
            const response = getResponse(mockInput);
            speak(response);
        }, 2000);
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);

        // Adjust Voice Characteristics based on Tone
        if (prefs.tone === 'romantic') {
            utterance.rate = 0.8; // Slower
            utterance.pitch = prefs.gender === 'female' ? 0.9 : 0.7; // Deeper/Breathy
        } else if (prefs.tone === 'dominant') {
            utterance.rate = 0.9;
            utterance.pitch = prefs.gender === 'female' ? 0.8 : 0.6;
        } else if (prefs.tone === 'playful') {
            utterance.rate = 1.1;
            utterance.pitch = 1.2;
        }

        // Attempt to select correct voice
        const voices = window.speechSynthesis.getVoices();
        let targetVoice = null;

        // Filter by Language
        const langVoices = voices.filter(v => v.lang.startsWith(prefs.language.split('-')[0]));

        // Filter by Gender (heuristic based on name)
        const genderVoices = langVoices.filter(v => {
            if (prefs.gender === 'female') return v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira');
            return v.name.includes('Male') || v.name.includes('David') || v.name.includes('Mark');
        });

        // Filter by Accent (heuristic)
        if (prefs.accent === 'UK') targetVoice = genderVoices.find(v => v.name.includes('UK') || v.name.includes('Great Britain'));
        else if (prefs.accent === 'AU') targetVoice = genderVoices.find(v => v.name.includes('Australia'));
        else targetVoice = genderVoices[0] || langVoices[0];

        if (targetVoice) utterance.voice = targetVoice;

        utterance.onend = () => setStatus('idle');
        window.speechSynthesis.speak(utterance);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed', bottom: '90px', right: '20px', width: '60px', height: '60px',
                    borderRadius: '50%', background: 'linear-gradient(135deg, #ff0055, #ff00cc)',
                    border: 'none', boxShadow: '0 0 20px rgba(255, 0, 85, 0.6)', zIndex: 1000,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'pulse 2s infinite'
                }}
            >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                <style jsx>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 0, 85, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(255, 0, 85, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 0, 85, 0); } }`}</style>
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)', zIndex: 2000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'
        }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem' }}>✕</button>
            </div>

            {/* SETUP WIZARD */}
            {setupStep < 4 && (
                <div style={{ width: '100%', maxWidth: '400px', padding: '20px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Configure Your Companion
                    </h2>
                    <div style={{ height: '4px', width: '100%', background: '#333', marginBottom: '30px', borderRadius: '2px' }}>
                        <div style={{ height: '100%', width: `${(setupStep + 1) * 25}%`, background: 'var(--primary)', transition: 'width 0.3s' }}></div>
                    </div>

                    {/* Step 0: Gender */}
                    {setupStep === 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {['female', 'male'].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => { setPrefs({ ...prefs, gender: g as Gender }); handleNext(); }}
                                    style={{
                                        padding: '30px', borderRadius: '15px', border: '2px solid #333',
                                        background: prefs.gender === g ? 'rgba(255, 0, 85, 0.1)' : 'transparent',
                                        borderColor: prefs.gender === g ? 'var(--primary)' : '#333',
                                        color: '#fff', cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{g === 'female' ? '♀️' : '♂️'}</div>
                                    <div style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{g}</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 1: Language */}
                    {setupStep === 1 && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => { setPrefs({ ...prefs, language: lang.code }); handleNext(); }}
                                    style={{
                                        padding: '15px', borderRadius: '10px', border: '1px solid #333',
                                        background: prefs.language === lang.code ? 'rgba(255, 0, 85, 0.1)' : 'transparent',
                                        borderColor: prefs.language === lang.code ? 'var(--primary)' : '#333',
                                        color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Tone */}
                    {setupStep === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {TONES.map((tone) => (
                                <button
                                    key={tone.id}
                                    onClick={() => { setPrefs({ ...prefs, tone: tone.id }); handleNext(); }}
                                    style={{
                                        padding: '15px', borderRadius: '10px', border: '1px solid #333',
                                        background: prefs.tone === tone.id ? 'rgba(255, 0, 85, 0.1)' : 'transparent',
                                        borderColor: prefs.tone === tone.id ? 'var(--primary)' : '#333',
                                        color: '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px'
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>{tone.emoji}</span>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{tone.label}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{tone.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Accent */}
                    {setupStep === 3 && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                                {['US', 'UK', 'AU', 'Native'].map((acc) => (
                                    <button
                                        key={acc}
                                        onClick={() => setPrefs({ ...prefs, accent: acc as Accent })}
                                        style={{
                                            padding: '15px', borderRadius: '10px', border: '1px solid #333',
                                            background: prefs.accent === acc ? 'rgba(255, 0, 85, 0.1)' : 'transparent',
                                            borderColor: prefs.accent === acc ? 'var(--primary)' : '#333',
                                            color: '#fff', cursor: 'pointer'
                                        }}
                                    >
                                        {acc} Accent
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                className="btn-primary"
                                style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                            >
                                Start Experience
                            </button>
                        </div>
                    )}

                    {setupStep > 0 && (
                        <button onClick={handleBack} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                            Back
                        </button>
                    )}
                </div>
            )}

            {/* ACTIVE AGENT INTERFACE */}
            {setupStep === 4 && (
                <>
                    <div style={{
                        width: '180px', height: '180px', borderRadius: '50%',
                        border: `4px solid ${generatedPersona.color}`, padding: '5px', marginBottom: '30px', position: 'relative'
                    }}>
                        <div style={{
                            width: '100%', height: '100%', borderRadius: '50%',
                            background: `url('${generatedPersona.avatar}') center/cover`,
                            boxShadow: status === 'speaking' ? `0 0 50px ${generatedPersona.color}` : 'none',
                            transition: 'box-shadow 0.3s'
                        }}></div>
                        {status === 'speaking' && (
                            <div className="speaking-waves"><span></span><span></span><span></span></div>
                        )}
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>{generatedPersona.name}</h2>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', fontSize: '0.8rem', color: '#888' }}>
                        <span style={{ background: '#333', padding: '2px 8px', borderRadius: '4px' }}>{prefs.gender}</span>
                        <span style={{ background: '#333', padding: '2px 8px', borderRadius: '4px' }}>{prefs.tone}</span>
                        <span style={{ background: '#333', padding: '2px 8px', borderRadius: '4px' }}>{prefs.language}</span>
                    </div>

                    <div style={{ height: '60px', color: '#aaa', fontStyle: 'italic', marginBottom: '40px', textAlign: 'center', padding: '0 20px' }}>
                        "{transcript}"
                    </div>

                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                        <button onClick={() => setSetupStep(0)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', border: 'none', color: '#fff' }}>⚙️</button>
                        <button
                            onClick={startListening}
                            style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: status === 'listening' ? '#fff' : generatedPersona.color,
                                border: 'none', color: status === 'listening' ? '#000' : '#fff',
                                fontSize: '2rem', boxShadow: `0 0 30px ${generatedPersona.color}`,
                                transform: status === 'listening' ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.3s'
                            }}
                        >
                            🎤
                        </button>
                        <button style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', border: 'none', color: '#fff' }}>💬</button>
                    </div>
                </>
            )}

            <style jsx>{`
        .speaking-waves { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; border-radius: 50%; z-index: -1; }
        .speaking-waves span { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 2px solid ${generatedPersona.color}; border-radius: 50%; animation: waves 2s infinite; opacity: 0; }
        .speaking-waves span:nth-child(2) { animation-delay: 0.5s; }
        .speaking-waves span:nth-child(3) { animation-delay: 1s; }
        @keyframes waves { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
        </div>
    );
}
