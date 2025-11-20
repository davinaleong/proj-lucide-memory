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
    const [currentView, setCurrentView] = useState<GameView>('game');

    return (
        <div>
            <div>
                {renderGameView(currentView)}
            </div>
        </div>

    )
}

function Welcome() {
    return (
        <div>
            <h1>Lucide Memory</h1>
            <p>Welcome to the Lucide Memory game!</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <button>START</button>
        </div>
    );
}

function PlayerDashboard() {
    return (
        <div>
            <h1>Player Dashboard</h1>
            <p>View your progress and stats here.</p>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    Highest Level
                </div>
                <div>
                    Best Score
                </div>
                <div>
                    Games Played
                </div>
                <div>
                    Average Time
                </div>
            </div>
            <button>CONTINUE</button>
            <button>NEW GAME</button>
        </div>
    );
}

function GameScreen() {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    Level
                </div>
                <div>
                    Score
                </div>
                <div>
                    Moves
                </div>
                <div>
                    Time
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div>
                    H
                </div>
                <div>
                    Level 2
                </div>
                <div>
                    P
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div>
                    SFX
                </div>
                <div>
                    O-----
                </div>
                <div>
                    M
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
                <div>
                    [ ]
                </div>
            </div>
            <div>
                <div className="flex justify-between gap-4">
                    <div>
                    Progress
                </div>
                <div>
                    0/8
                </div>
                </div>
                <div>=======---</div>

            </div>
        </div>
    );
}