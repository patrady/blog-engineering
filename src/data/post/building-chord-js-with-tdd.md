---
publishDate: 2026-01-05T00:00:00Z
author: Patrick Brady
title: Building a Music Theory Library with Test-Driven Development
excerpt: How I used TDD to build @patrady/chord-js, a TypeScript library for chord recognition, and discovered a better API along the way.
image: https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
category: Software Engineering
tags:
  - typescript
  - tdd
  - testing
  - open-source
  - music-theory
---

## The Journey to Chord-JS

I recently built [@patrady/chord-js](https://github.com/patrady/chord-js), a TypeScript library that identifies musical chords, notes, and key signatures on an 88-key piano. What made this project special wasn't just what I built, but _how_ I built it: using Test-Driven Development (TDD) from the very first line of code.

The result? An intuitive API, excellent test coverage, and one of the most enjoyable development experiences I've had. Let me share what I learned.

## What is Test-Driven Development?

If you're not familiar with TDD, here's the core idea: **you write tests before you write the implementation code.**

The TDD cycle follows three simple steps, often called "Red-Green-Refactor":

1. **Red** - Write a failing test that describes what you want your code to do
2. **Green** - Write just enough code to make the test pass
3. **Refactor** - Clean up the code while keeping tests green

This might seem backwards at first. Why write tests for code that doesn't exist? But this approach has profound effects on your design process, as I discovered while building chord-js.

## The Problem: Recognizing Musical Chords

Before diving into the TDD experience, let me explain what chord-js does. In music theory, a chord is a combination of notes played together. For example:

- **C Major chord**: C, E, G
- **D Minor chord**: D, F, A
- **G7 chord**: G, B, D, F

The goal of chord-js was to take a set of notes as input and identify what chord they form. Simple concept, but with lots of complexity:

- Multiple chord types (major, minor, diminished, augmented, seventh chords, etc.)
- Chord inversions (same notes, different bass note)
- Enharmonic equivalents (C# and Db are the same pitch)
- MIDI value integration
- Frequency calculations

This complexity made it the perfect candidate for TDD.

## How TDD Shaped the API Design

Here's where TDD really shined: **writing tests first forced me to think like a user of my library, not just its creator.**

### Discovery 1: Simplified Interface

My initial instinct was to create a complex API with separate methods for different input types:

```typescript
// What I almost built (without TDD)
const chord1 = Chord.fromNoteNames(['C', 'E', 'G']);
const chord2 = Chord.fromMidiValues([60, 64, 67]);
const chord3 = Chord.fromNoteObjects([note1, note2, note3]);
const chord4 = Chord.fromString('C E G');
```

But when I started writing tests first, I kept repeating the same patterns. The tests were tedious. That pain was a signal.

I realized I could simplify to a single, flexible method:

```typescript
// What I actually built (with TDD)
const chord1 = Chord.for('C E G');
const chord2 = Chord.for(['C', 'E', 'G']);
const chord3 = Chord.for([note1, note2, note3]);
```

**TDD insight**: If your tests feel repetitive or awkward, your API probably is too. The tests guided me toward a more intuitive, unified interface.

### Discovery 2: Better Error Handling

Writing tests first meant thinking about edge cases before implementation:

```typescript
it('should return null for unrecognized chord patterns', () => {
  expect(Chord.for('C D E')).toBeNull(); // Not a valid chord
});

it('should handle enharmonic equivalents', () => {
  const chord1 = Chord.for('C# E# G#');
  const chord2 = Chord.for('Db F Ab');
  expect(chord1?.getName()).toBe(chord2?.getName());
});

it('should recognize inverted chords', () => {
  const chord = Chord.for('E G C'); // C Major, first inversion
  expect(chord?.getName()).toBe('C');
});
```

These tests revealed edge cases I would have missed if I'd written the implementation first. Instead of cryptic errors or unexpected behavior, the library now gracefully handles:

- Invalid note combinations
- Enharmonic note names (C# vs Db)
- Chord inversions
- Out-of-range MIDI values

### Discovery 3: Clearer Naming

The test descriptions literally became my API documentation:

```typescript
describe('Note', () => {
  it('should get the note name', () => {
    expect(new Note('Eb4').getName()).toBe('Eb');
  });

  it('should get the scientific name with octave', () => {
    expect(new Note('Eb4').getScientificName()).toBe('Eb4');
  });

  it('should calculate frequency in Hz', () => {
    expect(new Note('A4').getFrequency()).toBeCloseTo(440);
  });
});
```

Reading these tests out loud revealed which method names felt natural and which felt clunky. `getName()` is obvious. `getScientificName()` is descriptive. `getFrequency()` is clear.

Without TDD, I might have ended up with something like `name()`, `fullName()`, and `freq()` - shorter, but less discoverable.

### Discovery 4: Composability

TDD encouraged small, focused methods that compose well:

```typescript
it('should work with key signatures', () => {
  const key = new KeySignatureOfD();
  const note = new Note('F#4');

  expect(key.isInKey(note)).toBe(true);
  expect(key.normalize(note).getName()).toBe('F#');
});

it('should convert MIDI to notes to chords', () => {
  const notes = [60, 64, 67].map((midi) => Note.fromMidi(midi));
  const chord = Chord.for(notes);

  expect(chord?.getName()).toBe('C');
});
```

These tests showed me how different parts of the API would be used together. The result was an API where everything composes naturally - Notes work with Chords, Chords work with KeySignatures, and MIDI values convert smoothly to Notes.

## The Coverage Benefit

One of TDD's best side effects: **you end up with excellent test coverage without trying.**

Because every feature starts as a test, my coverage looked like this from day one:

- **Statements**: 100%
- **Branches**: 98%
- **Functions**: 100%
- **Lines**: 100%

This wasn't because I obsessed over coverage metrics. It was a natural outcome of the TDD process. Every function, every branch, every edge case was written to satisfy a test.

This coverage gave me incredible confidence to refactor. I could reshape entire classes knowing that if I broke something, a test would catch it immediately.

## The Development Experience

Here's what surprised me most: **TDD made development faster, not slower.**

Yes, writing tests first adds upfront time. But I saved far more time by:

1. **Catching bugs immediately** - No debugging sessions trying to figure out why something broke three commits ago
2. **Clear next steps** - The failing test tells you exactly what to implement next
3. **Fearless refactoring** - Change anything with confidence that tests will catch regressions
4. **Living documentation** - The test suite documents every feature and edge case

The development flow felt like a game: write a failing test, make it pass, celebrate, repeat. There's something deeply satisfying about watching a test suite go from red to green.

## See It In Action

Here's a quick demo of what chord-js can do:

```typescript
import { Chord, Note, KeySignatureOfD } from '@patrady/chord-js';

// Recognize a chord from note names
const chord = Chord.for('C E G');
console.log(chord?.getName()); // Output: "C"

// Work with individual notes
const note = new Note('Eb4');
console.log(note.getFrequency()); // Output: 311.12698 Hz
console.log(note.getMidiValue()); // Output: 63

// Handle chord inversions
const inverted = Chord.for('E G C'); // C Major, first inversion
console.log(inverted?.getName()); // Output: "C"

// Convert MIDI to chords
const notes = [60, 64, 67].map((midi) => Note.fromMidi(midi));
const midiChord = Chord.for(notes);
console.log(midiChord?.getName()); // Output: "C"

// Work with key signatures
const key = new KeySignatureOfD();
console.log(key.getNotes()); // Output: D, E, F#, G, A, B, C#, D
console.log(key.isInKey(new Note('F#'))); // Output: true
```

The library supports 18+ chord types including major, minor, augmented, diminished, seventh chords, and more complex variations.

## Lessons Learned

If you're considering TDD for your next project, here's what I'd recommend:

### Start with TDD-friendly projects

TDD works best when:

- Requirements are clear (I knew what chords should be recognized)
- The domain is well-understood (music theory is well-defined)
- The code has minimal external dependencies

It's harder to apply strict TDD to:

- Exploratory prototypes where you're still figuring out what to build
- UI/UX work where visual design drives decisions
- Code with lots of external dependencies (databases, APIs, file systems)

### Write the test you wish you could write

Don't let implementation details leak into your tests. Write the test that describes the behavior you want, even if you're not sure how to implement it yet. The test will guide you toward a clean implementation.

### Test behavior, not implementation

Bad test:

```typescript
it('should call parseNotes() and then identifyChordType()', () => {
  // Testing implementation details
});
```

Good test:

```typescript
it('should recognize C Major chord from note names', () => {
  expect(Chord.for('C E G')?.getName()).toBe('C');
});
```

### Embrace the red-green-refactor cycle

Don't skip the refactor step. Once your test passes, take time to clean up the code. Remove duplication, improve names, simplify logic. The tests give you safety to make bold changes.

## The Results

After a few weeks of development, [@patrady/chord-js](https://www.npmjs.com/package/@patrady/chord-js) was ready for publication:

- Clean, intuitive API
- 100% test coverage
- Zero runtime bugs found so far (tests caught everything)
- Easy to extend with new chord types
- Comprehensive documentation generated from tests

The project is [open source on GitHub](https://github.com/patrady/chord-js), so you can see the full test suite and implementation.

## Final Thoughts

TDD fundamentally changed how I think about writing code. Instead of:

1. Write implementation
2. Manually test it
3. Write tests to lock in behavior
4. Debug when something breaks

I now do:

1. Write test describing desired behavior
2. Implement just enough to pass
3. Refactor with confidence
4. Repeat

The result is code that's more robust, more maintainable, and honestly, more fun to write.

If you're building a library, especially one with clear requirements and well-defined behavior, I can't recommend TDD enough. The upfront investment in tests pays dividends in code quality, development speed, and peace of mind.

Try it on your next project. You might be surprised how much better the experience is.

---

Want to try chord-js yourself? Install it with:

```bash
npm install @patrady/chord-js
```

Check out the [GitHub repository](https://github.com/patrady/chord-js) for full documentation and more examples. And if you have questions about TDD or chord-js, feel free to reach out!
