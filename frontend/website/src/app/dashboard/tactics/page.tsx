'use client';

import { useState } from 'react';

interface SliderValue {
  [key: string]: number;
}

interface Formation {
  name: string;
  description: string;
}

interface TacticalSlider {
  name: string;
  value: number;
  left: string;
  right: string;
}

interface PlayerInstruction {
  id: number;
  name: string;
  position: string;
}

interface SetPiece {
  type: string;
  takers: string[];
}

const formations: Formation[] = [
  { name: "4-4-2", description: "Classic & Balanced" },
  { name: "4-3-3", description: "Attacking" },
  { name: "4-2-3-1", description: "Modern & Flexible" },
  { name: "3-5-2", description: "Wing Play" },
];

const tacticalSliders: TacticalSlider[] = [
  {
    name: "Tempo",
    value: 65,
    left: "Slow",
    right: "Fast",
  },
  {
    name: "Width",
    value: 50,
    left: "Narrow",
    right: "Wide",
  },
  {
    name: "Pressing",
    value: 75,
    left: "Low",
    right: "High",
  },
];

const playerInstructions: PlayerInstruction[] = [
  {
    id: 1,
    name: "Marcus Rashford",
    position: "ST",
  },
  {
    id: 2,
    name: "Bruno Fernandes",
    position: "CAM",
  },
  // Add more players
];

const setPieces: SetPiece[] = [
  {
    type: "Free Kicks",
    takers: ["Bruno Fernandes", "Marcus Rashford", "Luke Shaw"],
  },
  {
    type: "Penalties",
    takers: ["Bruno Fernandes", "Marcus Rashford", "Casemiro"],
  },
  {
    type: "Corners (Right)",
    takers: ["Bruno Fernandes", "Luke Shaw", "Christian Eriksen"],
  },
  {
    type: "Corners (Left)",
    takers: ["Christian Eriksen", "Luke Shaw", "Bruno Fernandes"],
  },
];

export default function TacticsPage() {
  const [sliderValues, setSliderValues] = useState<SliderValue>(
    tacticalSliders.reduce((acc, slider) => ({ ...acc, [slider.name]: slider.value }), {})
  );

  const handleSliderChange = (name: string, value: string) => {
    setSliderValues(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Team Tactics</h1>

      {/* Formation Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Formation</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formations.map((formation) => (
            <button
              key={formation.name}
              className="p-4 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <div className="text-lg font-medium text-center">{formation.name}</div>
              <div className="text-sm text-gray-500 text-center mt-1">
                {formation.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tactical Style */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Playing Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mentality */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Mentality</h3>
            <select 
              defaultValue="Balanced"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => console.log('Mentality changed:', e.target.value)}
            >
              <option>Defensive</option>
              <option>Balanced</option>
              <option>Attacking</option>
              <option>All Out Attack</option>
            </select>
          </div>

          {/* Playing Style */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Build-up Play
            </h3>
            <select 
              defaultValue="Possession"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => console.log('Build-up Play changed:', e.target.value)}
            >
              <option>Possession</option>
              <option>Direct</option>
              <option>Counter-attack</option>
              <option>Long Ball</option>
            </select>
          </div>
        </div>

        {/* Style Sliders */}
        <div className="mt-6 space-y-4">
          {tacticalSliders.map((slider) => (
            <div key={slider.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {slider.name}
                </span>
                <span className="text-sm text-gray-500">{sliderValues[slider.name]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValues[slider.name]}
                onChange={(e) => handleSliderChange(slider.name, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{slider.left}</span>
                <span className="text-xs text-gray-500">{slider.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Instructions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Player Instructions
        </h2>
        <div className="space-y-4">
          {playerInstructions.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {player.name}
                </div>
                <div className="text-sm text-gray-500">{player.position}</div>
              </div>
              <div className="flex space-x-2">
                <select 
                  defaultValue="Default"
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => console.log(`${player.name} role changed:`, e.target.value)}
                >
                  <option>Default</option>
                  <option>Attack</option>
                  <option>Support</option>
                  <option>Defend</option>
                </select>
                <button 
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => console.log(`More options for ${player.name}`)}
                >
                  More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Set Pieces */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Set Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {setPieces.map((setPiece) => (
            <div key={setPiece.type}>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {setPiece.type}
              </h3>
              <select 
                defaultValue={setPiece.takers[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => console.log(`${setPiece.type} taker changed:`, e.target.value)}
              >
                {setPiece.takers.map((taker) => (
                  <option key={taker}>{taker}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
