/*
 * A soft paper-turn sound, made in the browser with the Web Audio API
 * (filtered noise), so there's no audio file to download.
 */
let ctx: AudioContext | null = null;

export function playPageTurn() {
  if (typeof window === "undefined") return;
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();

    const duration = 0.42;
    const rate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, Math.floor(rate * duration), rate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      // A quick swish that rises and fades, with a little crinkle.
      const env = Math.sin(Math.PI * Math.pow(t, 0.6)) * (1 - t * 0.6);
      const crinkle = Math.random() < 0.004 ? 2.2 : 1;
      data[i] = (Math.random() * 2 - 1) * env * crinkle;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.8;
    band.frequency.setValueAtTime(900, ctx.currentTime);
    band.frequency.linearRampToValueAtTime(3200, ctx.currentTime + duration * 0.7);

    const high = ctx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 400;

    const gain = ctx.createGain();
    gain.gain.value = 0.16;

    src.connect(band).connect(high).connect(gain).connect(ctx.destination);
    src.start();
  } catch {
    /* sound is a nice-to-have; ignore failures */
  }
}
