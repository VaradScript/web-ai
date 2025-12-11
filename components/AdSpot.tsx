"use client";
import React from 'react';

interface AdSpotProps {
    position: 'header' | 'sidebar' | 'interstitial' | 'footer';
    className?: string;
}

export default function AdSpot({ position, className = '' }: AdSpotProps) {
    // In a real app, you would insert script tags from ExoClick / TrafficJunky here.
    // For now, we simulate a responsive banner space.

    const getDimensions = () => {
        switch (position) {
            case 'header': return { width: '728px', height: '90px', label: 'Leaderboard 728x90' };
            case 'sidebar': return { width: '300px', height: '250px', label: 'Medium Rect 300x250' };
            case 'interstitial': return { width: '100%', height: '100px', label: 'Mobile Banner' };
            case 'footer': return { width: '100%', height: '250px', label: 'Footer Promo' };
            default: return { width: '100%', height: '100px', label: 'Ad Space' };
        }
    };

    const dims = getDimensions();

    return (
        <div
            className={`ad-container ${className}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1a1a1a',
                border: '1px dashed #333',
                margin: '20px auto',
                color: '#444',
                fontSize: '0.8rem',
                maxWidth: '100%',
                ...dims
            }}
        >
            <div className="text-center">
                <p className="font-bold">AD SPACE</p>
                <p className="text-xs text-gray-600">{dims.label}</p>
                <p className="text-[10px] text-gray-700 mt-2">Targeted Adult Traffic</p>
            </div>
        </div>
    );
}
