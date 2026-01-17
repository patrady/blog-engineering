import { useState, useMemo } from 'react';
import { Chord, Note } from '@patrady/chord-js';

// MIDI 48 (C3) to MIDI 83 (B5) = 36 keys
const MIDI_START = 48;
const MIDI_END = 83;

// Check if a MIDI note is a black key (sharp/flat)
const isBlackKey = (midiNote: number): boolean => {
  const noteInOctave = midiNote % 12;
  return [1, 3, 6, 8, 10].includes(noteInOctave);
};

// Get the note name for display
const getNoteName = (midiNote: number): string => {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteInOctave = midiNote % 12;
  const octave = Math.floor(midiNote / 12) - 1;
  return `${noteNames[noteInOctave]}${octave}`;
};

export default function MidiKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());

  const toggleKey = (midiNote: number) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(midiNote)) {
        next.delete(midiNote);
      } else {
        next.add(midiNote);
      }
      return next;
    });
  };

  const resetKeys = () => {
    setPressedKeys(new Set());
  };

  const chordResult = useMemo(() => {
    if (pressedKeys.size < 3) {
      return { message: 'Press 3 different keys to get started', isChord: false };
    }

    const notes = Array.from(pressedKeys).map((midi) => Note.fromMidi(midi));
    const chord = Chord.for(notes);

    if (chord) {
      return { message: chord.getName(), isChord: true };
    }

    return { message: 'Invalid chord', isChord: false };
  }, [pressedKeys]);

  // Generate array of MIDI values
  const midiKeys = useMemo(() => {
    const keys: number[] = [];
    for (let i = MIDI_START; i <= MIDI_END; i++) {
      keys.push(i);
    }
    return keys;
  }, []);

  const whiteKeys = midiKeys.filter((k) => !isBlackKey(k));
  const blackKeys = midiKeys.filter((k) => isBlackKey(k));

  // Find the white key index that a black key should be positioned after
  const getWhiteKeyIndexBefore = (midiNote: number): number => {
    // Count how many white keys come before this black key
    let count = 0;
    for (let i = MIDI_START; i < midiNote; i++) {
      if (!isBlackKey(i)) {
        count++;
      }
    }
    return count;
  };

  const whiteKeyWidth = 100 / whiteKeys.length;
  const blackKeyWidth = whiteKeyWidth * 0.6;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Chord Display */}
      <div className="mb-8 text-center">
        <div
          className={`text-3xl font-bold mb-2 ${
            chordResult.isChord ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {chordResult.message}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {pressedKeys.size > 0 && (
            <span>
              Selected notes:{' '}
              {Array.from(pressedKeys)
                .sort((a, b) => a - b)
                .map((midi) => getNoteName(midi))
                .join(', ')}
            </span>
          )}
        </div>
      </div>

      {/* Piano Keyboard */}
      <div className="relative h-48 select-none">
        {/* White Keys */}
        <div className="absolute inset-0 flex">
          {whiteKeys.map((midiNote) => (
            <button
              key={midiNote}
              onClick={() => toggleKey(midiNote)}
              className={`relative flex-1 border border-gray-300 dark:border-gray-600 rounded-b-md transition-all duration-100 ${
                pressedKeys.has(midiNote)
                  ? 'bg-blue-400 dark:bg-blue-500 border-blue-500'
                  : 'bg-white dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200'
              }`}
              aria-label={getNoteName(midiNote)}
            >
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-600">
                {getNoteName(midiNote)}
              </span>
            </button>
          ))}
        </div>

        {/* Black Keys */}
        {blackKeys.map((midiNote) => {
          // Position black key centered at the boundary between two white keys
          const whiteKeyIndex = getWhiteKeyIndexBefore(midiNote);
          const boundaryPosition = whiteKeyIndex * whiteKeyWidth;
          const leftPercent = boundaryPosition - blackKeyWidth / 2;

          return (
            <button
              key={midiNote}
              onClick={() => toggleKey(midiNote)}
              style={{
                left: `${leftPercent}%`,
                width: `${blackKeyWidth}%`,
              }}
              className={`absolute top-0 h-[60%] rounded-b-md z-10 transition-all duration-100 ${
                pressedKeys.has(midiNote)
                  ? 'bg-blue-600 dark:bg-blue-400'
                  : 'bg-gray-900 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700'
              }`}
              aria-label={getNoteName(midiNote)}
            />
          );
        })}
      </div>

      {/* Reset */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={resetKeys}
          disabled={pressedKeys.size === 0}
          className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
