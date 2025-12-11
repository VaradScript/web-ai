import AgeVerificationModal from '../components/AgeVerificationModal';
import ClientLayout from '../components/ClientLayout';
import VoiceAgent from '../components/VoiceAgent';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'LustraX | Premium Adult Tube',
    description: 'The best high-quality adult videos.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </head>
            <body>
                <AgeVerificationModal />
                <VoiceAgent />
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
