const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function writeWav(filepath, sampleRate, samples) {
  const buffer = Buffer.alloc(44 + samples.length * 2);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(samples.length * 2, 40);

  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(val, 44 + i * 2);
  }

  fs.writeFileSync(filepath, buffer);
  console.log(`Saved ${filepath} (${(samples.length / sampleRate).toFixed(1)}s)`);
}

// True Voss-McCartney Pink Noise Generator
class PinkNoise {
  constructor() {
    this.b0 = 0; this.b1 = 0; this.b2 = 0;
    this.b3 = 0; this.b4 = 0; this.b5 = 0; this.b6 = 0;
  }

  next() {
    const white = Math.random() * 2 - 1;
    this.b0 = 0.99886 * this.b0 + white * 0.0555179;
    this.b1 = 0.99332 * this.b1 + white * 0.0750759;
    this.b2 = 0.96900 * this.b2 + white * 0.1538520;
    this.b3 = 0.86650 * this.b3 + white * 0.3104856;
    this.b4 = 0.55000 * this.b4 + white * 0.5329522;
    this.b5 = -0.7616 * this.b5 - white * 0.0168980;
    const pink = this.b0 + this.b1 + this.b2 + this.b3 + this.b4 + this.b5 + this.b6 + white * 0.5362;
    this.b6 = white * 0.115926;
    return pink * 0.11;
  }
}

// High-Pass Filter
function applyHighPassFilter(samples, sampleRate, cutoff = 150) {
  const RC = 1.0 / (2 * Math.PI * cutoff);
  const dt = 1.0 / sampleRate;
  const alpha = RC / (RC + dt);

  let lastIn = samples[0];
  let lastOut = samples[0];

  for (let i = 0; i < samples.length; i++) {
    const currentIn = samples[i];
    const currentOut = alpha * (lastOut + currentIn - lastIn);
    samples[i] = currentOut;
    lastIn = currentIn;
    lastOut = currentOut;
  }
}

// Seamless Equal-Power Crossfade at Buffer Boundaries
function makeGaplessLoop(samples, sampleRate, fadeDuration = 0.8) {
  const numSamples = samples.length;
  const fadeLen = Math.floor(sampleRate * fadeDuration);

  for (let i = 0; i < fadeLen; i++) {
    const ratio = i / fadeLen;
    const fadeIn = Math.sin(ratio * Math.PI * 0.5);
    const fadeOut = Math.cos(ratio * Math.PI * 0.5);

    const startIdx = i;
    const endIdx = numSamples - fadeLen + i;

    samples[endIdx] = samples[endIdx] * fadeOut + samples[startIdx] * fadeIn;
  }
}

// Clean Peak Normalization to 0.98 Peak (No Clipping Distortion)
function normalizePeak(samples, targetPeak = 0.98) {
  let maxVal = 0;
  for (let i = 0; i < samples.length; i++) {
    const absVal = Math.abs(samples[i]);
    if (absVal > maxVal) maxVal = absVal;
  }
  if (maxVal > 0) {
    const scale = targetPeak / maxVal;
    for (let i = 0; i < samples.length; i++) {
      samples[i] *= scale;
    }
  }
  return samples;
}

const sampleRate = 44100;
const duration = 8.0;
const numSamples = Math.floor(sampleRate * duration);

// 1. Dryer (드라이기 - 묵직한 120Hz/240Hz 모터 웅웅 소리 + 따뜻한 바람 소리)
console.log('Generating DISTINCT Hair Dryer sound...');
const dryerSamples = new Float32Array(numSamples);
const pinkDryer = new PinkNoise();
let d1 = 0, d2 = 0;

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const noise = Math.random() * 2 - 1;
  const pink = pinkDryer.next();

  // Strong Motor Hum (120Hz fundamental + 240Hz harmonic)
  const motorHum = 0.25 * Math.sin(2 * Math.PI * 120 * t) + 0.12 * Math.sin(2 * Math.PI * 240 * t);

  // Warm Mid Airflow (Bandpass ~900Hz)
  d1 += 0.18 * (noise - d1);
  d2 += 0.18 * (d1 - d2);
  const airFlow = d1 - d2 * 0.4;

  dryerSamples[i] = airFlow * 0.65 + motorHum + pink * 0.1;
}

applyHighPassFilter(dryerSamples, sampleRate, 100);
makeGaplessLoop(dryerSamples, sampleRate, 0.8);
normalizePeak(dryerSamples, 0.98);
writeWav(path.join(assetsDir, 'dryer.wav'), sampleRate, dryerSamples);

// 2. Power Shower (강력 샤워기 - 촤아아아 날카롭고 쨍한 고압 미세 물줄기)
console.log('Generating DISTINCT Power Shower sound...');
const showerSamples = new Float32Array(numSamples);
const pinkShower = new PinkNoise();
let s1 = 0, s2 = 0;

for (let i = 0; i < numSamples; i++) {
  const noise = Math.random() * 2 - 1;
  const pink = pinkShower.next();

  // High-pressure spray filter (Highpass at ~2.5kHz)
  s1 += 0.42 * (noise - s1);
  s2 += 0.42 * (s1 - s2);
  const hpSpray = s1 - s2 * 0.25;

  showerSamples[i] = hpSpray * 0.8 + pink * 0.2;
}

applyHighPassFilter(showerSamples, sampleRate, 300);
makeGaplessLoop(showerSamples, sampleRate, 0.8);
normalizePeak(showerSamples, 0.98);
writeWav(path.join(assetsDir, 'power_shower.wav'), sampleRate, showerSamples);

// 3. Heavy Downpour (장대비 - 묵직한 저음 빗소리 + 후두둑 빗물 스플래시)
console.log('Generating DISTINCT Heavy Downpour sound...');
const downpourSamples = new Float32Array(numSamples);
const pinkDownpour = new PinkNoise();

let lpIn = 0, lpOut = 0;

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const white = Math.random() * 2 - 1;
  const pink = pinkDownpour.next();

  // Deep Rain Lowpass Layer (~900Hz)
  lpIn = pink * 0.7 + white * 0.3;
  lpOut += 0.12 * (lpIn - lpOut);

  // Natural Rain Surges (1.2Hz)
  const rainSurge = 0.80 + 0.20 * Math.sin(2 * Math.PI * 0.5 * t);

  // Organic raindrop splashes
  let dropSplash = 0;
  if (Math.random() < 0.015) {
    dropSplash = (Math.random() * 0.4 + 0.1) * (Math.random() * 2 - 1);
  }

  downpourSamples[i] = (lpOut * 0.7 + dropSplash * 0.3) * rainSurge;
}

// 4. Toilet Flush (리얼 도기 변기 물내림 + 회오리 수류 + 도기 공명 음향)
console.log('Generating HYPER-REALISTIC Toilet Bowl Flush sound...');
const flushSamples = new Float32Array(numSamples);
const pinkFlush = new PinkNoise();

// Filters for Ceramic Bowl Resonance (Low Churn, Mid Swirl, High Spray)
let b1_in = 0, b1_out = 0;
let b2_in = 0, b2_out = 0;
let b3_in = 0, b3_out = 0;

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const white = Math.random() * 2 - 1;
  const pink = pinkFlush.next();

  // 1. Initial Mechanical Handle/Button Click (t < 0.14s)
  let buttonClick = 0;
  if (t < 0.14) {
    const clickEnv = Math.exp(-t * 35);
    buttonClick = (Math.sin(2 * Math.PI * 1400 * t) * 0.5 + Math.sin(2 * Math.PI * 650 * t) * 0.5) * clickEnv;
  }

  // 2. Deep Low Ceramic Bowl Resonant Water Churning (180Hz ~ 320Hz)
  b1_in = pink * 0.8 + white * 0.2;
  b1_out += 0.04 * (b1_in - b1_out); // Deep low pass for bowl mass

  // 3. Swirling Vortex Gush (450Hz ~ 950Hz)
  b2_in = white * 0.6 + pink * 0.4;
  b2_out += 0.14 * (b2_in - b2_out); // Mid-range water swirl

  // 4. High Water Spray (~2200Hz)
  b3_in = white;
  b3_out += 0.35 * (b3_in - b3_out);
  const highSpray = b3_in - b3_out;

  // Periodic Water Vortex Swirl Modulation (1.4Hz swirl rhythm)
  const swirlRhythm = 0.82 + 0.18 * Math.sin(2 * Math.PI * 1.4 * t);

  // Gurgling siphon bubbles
  let gurgleBubble = 0;
  if (Math.random() < 0.03) {
    gurgleBubble = Math.sin(2 * Math.PI * (250 + Math.random() * 200) * t) * (Math.random() * 0.3);
  }

  const waterFlow = (b1_out * 0.5 + b2_out * 0.35 + highSpray * 0.15 + gurgleBubble * 0.1) * swirlRhythm;

  flushSamples[i] = buttonClick * 0.5 + waterFlow * 0.85;
}

applyHighPassFilter(flushSamples, sampleRate, 80);
makeGaplessLoop(flushSamples, sampleRate, 0.8);
normalizePeak(flushSamples, 0.98);
writeWav(path.join(assetsDir, 'flush.wav'), sampleRate, flushSamples);

console.log('SoundCover distinct audio assets generation complete!');
