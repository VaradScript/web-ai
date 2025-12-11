"use client";
import React, { useEffect, useState } from 'react';

export default function ModeBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if we are running with sample data
        // This is a simple client-side check if we see "TearsOfSteel" or similar in the page source
        // Ideally, we'd check an env var, but client-side is limited.
        // For now, allow the user to close it.
        setVisible(true);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-600/90 text-white z-[9999] px-4 py-3 flex items-center justify-between backdrop-blur-md border-t border-yellow-400">
            <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Demo Content Active</h3>
                    <p className="text-xs text-yellow-100">
                        Real videos are hidden. To enable <b>Full Adult Content</b>, add your <code>RAPID_API_KEY</code> to <code>.env.local</code>.
                    </p>
                </div>
            </div>
            <button
                onClick={() => setVisible(false)}
                className="px-3 py-1 bg-black/30 hover:bg-black/50 rounded text-xs font-bold transition-colors"
            >
                DISMISS
            </button>
        </div>
    );
}
