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

// 2. Heavy Downpour (장대비 - 묵직한 저음 빗소리 + 후두둑 빗물 스플래시)
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

applyHighPassFilter(downpourSamples, sampleRate, 150);
makeGaplessLoop(downpourSamples, sampleRate, 0.8);
normalizePeak(downpourSamples, 0.98);
writeWav(path.join(assetsDir, 'heavy_downpour.wav'), sampleRate, downpourSamples);

// 3. Birds (시끄러운 새소리 - 계곡 물소리 마스킹 포함)
console.log('Generating DISTINCT Birds sound with stream water masking...');
const birdsSamples = new Float32Array(numSamples);
const pinkBirds = new PinkNoise();

// 3가지 타입의 새소리 합성 내부 함수들 정의
function getChirpA(t, start, dur) {
  if (t < start || t > start + dur) return 0;
  const u = (t - start) / dur;
  const tLocal = t - start;
  const phase = 2 * Math.PI * (3800 * tLocal - (1600 / dur) * tLocal * tLocal * 0.5);
  const amp = Math.sin(u * Math.PI) * Math.exp(-u * 2.0);
  return Math.sin(phase) * amp * 0.45;
}

function getChirpB(t, start, dur) {
  if (t < start || t > start + dur) return 0;
  const u = (t - start) / dur;
  const tLocal = t - start;
  const phase = 2 * Math.PI * (2800 * tLocal + 2000 * (dur / Math.PI) * (1 - Math.cos(u * Math.PI)));
  const amp = Math.sin(u * Math.PI) * 0.4;
  return Math.sin(phase) * amp;
}

function getChirpC(t, start, dur) {
  if (t < start || t > start + dur) return 0;
  const u = (t - start) / dur;
  const tLocal = t - start;
  const phase = 2 * Math.PI * 4500 * tLocal - (600 / 75) * Math.cos(2 * Math.PI * 75 * tLocal);
  const amp = Math.sin(u * Math.PI) * 0.3;
  return Math.sin(phase) * amp;
}

const birdSchedule = [
  { type: 'A', start: 0.3, dur: 0.15 },
  { type: 'A', start: 0.6, dur: 0.15 },
  { type: 'A', start: 2.1, dur: 0.18 },
  { type: 'A', start: 2.4, dur: 0.15 },
  { type: 'A', start: 4.8, dur: 0.15 },
  { type: 'A', start: 5.1, dur: 0.18 },
  { type: 'A', start: 7.2, dur: 0.15 },
  
  { type: 'B', start: 1.1, dur: 0.45 },
  { type: 'B', start: 3.4, dur: 0.50 },
  { type: 'B', start: 5.7, dur: 0.42 },
  
  { type: 'C', start: 1.7, dur: 0.60 },
  { type: 'C', start: 4.1, dur: 0.70 },
  { type: 'C', start: 6.4, dur: 0.65 }
];

let bLpIn = 0, bLpOut = 0;
let waterIn = 0, waterOut = 0;

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const white = Math.random() * 2 - 1;
  const pink = pinkBirds.next();

  // 1. 끊김 없는 계곡 물소리 마스킹 레이어 (물소리 볼륨 배율 0.53 적용)
  waterIn = pink * 0.7 + white * 0.3;
  waterOut += 0.22 * (waterIn - waterOut);
  const streamWater = (waterIn - waterOut) * 0.53;

  // 2. 부드러운 숲속 나뭇잎 바람 소리
  bLpIn = pink * 0.8 + white * 0.2;
  bLpOut += 0.04 * (bLpIn - bLpOut);
  const forestWind = bLpOut * 0.08;

  // 3. 스케줄된 새소리 합성 및 누적
  let birdsSignal = 0;
  for (const item of birdSchedule) {
    if (item.type === 'A') {
      birdsSignal += getChirpA(t, item.start, item.dur);
    } else if (item.type === 'B') {
      birdsSignal += getChirpB(t, item.start, item.dur);
    } else if (item.type === 'C') {
      birdsSignal += getChirpC(t, item.start, item.dur);
    }
  }

  birdsSamples[i] = streamWater + forestWind + birdsSignal * 0.88;
}

applyHighPassFilter(birdsSamples, sampleRate, 700);
makeGaplessLoop(birdsSamples, sampleRate, 0.8);
normalizePeak(birdsSamples, 0.98);
writeWav(path.join(assetsDir, 'birds.wav'), sampleRate, birdsSamples);

console.log('SoundCover distinct audio assets generation complete!');
