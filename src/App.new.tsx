import React, { useState } from 'react';
import "./App.new.css";

type GameView = 'welcome' | 'dashboard' | 'game';

function renderGameView(view: GameView) {
    switch(view) {
        case 'welcome':
            return <Welcome />;
        case 'dashboard':
            return <PlayerDashboard />;
        case 'game':
            return <GameScreen />;
    }
}

export default function AppNew() {
    const [currentView, setCurrentView] = useState<GameView>('welcome');

    return (
        <div className="app-container">
            {renderGameView(currentView)}
        </div>
    )
}

function Welcome() {
    return (
        <div className="content-container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#3b82f6' }}>Lucide Memory</h1>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#374151' }}>Welcome to Lucide Memory!</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Test your memory skills by matching pairs of cards.</p>
            <div className="button-group" style={{ maxWidth: '200px', margin: '0 auto' }}>
                <button className="button button-primary">START</button>
            </div>
        </div>
    );
}

function PlayerDashboard() {
    return (
        <div className="content-container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#3b82f6' }}>Dashboard</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>View your progress and stats here</p>
            <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151' }}>5</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Highest Level</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151' }}>1,250</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Best Score</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151' }}>12</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Games Played</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151' }}>2m 30s</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Time</div>
                </div>
            </div>
            <div className="button-group" style={{ maxWidth: '250px', margin: '0 auto' }}>
                <button className="button button-primary">CONTINUE</button>
                <button className="button button-secondary">NEW GAME</button>
            </div>
        </div>
    );
}

function GameScreen() {
    return (
        <div className="content-container">
            {/* Game Stats */}
            <div className="stats-grid" style={{ marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>LEVEL</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>2</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>SCORE</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>0</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>MOVES</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0ea5e9' }}>0</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>TIME</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151' }}>00:02</div>
                </div>
            </div>
            
            {/* Game Controls */}
            <div className="control-row" style={{ marginBottom: '1rem' }}>
                <button style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>🏠</button>
                <div className="control-center">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>Level 2</h2>
                </div>
                <button style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>⏸️</button>
            </div>
            
            {/* Audio Controls */}
            <div className="audio-controls" style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>🔊</span>
                <div className="audio-slider">
                    <div style={{ height: '100%', background: '#3b82f6', width: '100%', borderRadius: '0.25rem' }}></div>
                    <div className="audio-handle"></div>
                </div>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>🎵</span>
            </div>
            
            {/* Game Grid */}
            <div className="game-grid" style={{ marginBottom: '2rem' }}>
                {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="game-card">
                        ●
                    </div>
                ))}
            </div>
            
            {/* Progress */}
            <div className="progress-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>Progress</span>
                    <span>0/8</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>0% Complete</div>
            </div>
        </div>
    );
}