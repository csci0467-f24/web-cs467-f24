---
title: "CS 467 - Lecture 13"
date: "2024-10-21"
name: "Lecture 13"
published: true
---

For the past few classes, we have been looking at different ways to add complexity to our work. We have looked at randomness and noise as a way to approximate complex systems, we have looked at simulation to mimic them, now we are just going to the source and getting some real complex, messy data. Specifically, we are finally going to make use of the fact that we have been lugging p5.sound around in our sketches and make some audio reactive visualizations.

p5.sound is essentially a thin wrapper around Tone.js that is couched in Processing friendly form. Sadly, the project could use some love. The bundle that comes with p5.js was released in 2021. The repository for the project is considerably newer, but I found that loading sound files was problematic. The documentation is spotty. Something are not documented at all, others are a mix between the old version and the new. So, it is a somewhat typical open source project...

# Sound sources

<!-- Start with sample code that plays these various things and toggles between them -->

To be able to visualize sound, we need the sound to play with. There are three basic ways that we can get sound that we can work with:

- load a sound file
  - `sound = loadsound(file)`
  - `sound.start()`
  - `sound.pause()`
  - `sound.loop()`
- listen to the mic
  - `mic = new p5.AudioIn()`
  - `mic.start()`
  - `mic.stop`
- generate it
  - `osc = new p5.Oscillator([freq],[type])`
    - `type` is "sine", "triangle", "sawtooth" or "square"
  - `osc.start()`
  - `osc.stop()`
  - `osc.freq()`
  - `osc.setType()`

The truth is, there are a couple of other tools for generating sound, but our goal is not to create music (and honestly, until this matures, there are probably better tools out there for sound production). The oscillator won't be that useful to you either (unless you want to start generating some music), but it will give us a "pure" source so we can understand the analysis tools better.

# Amplitude

Amplitude gets the current volume of the sound as a number between $[0,1]$.

In truth, this is returning the root mean square (RMS) of the sound at this point. This is the square root of the mean of the squares of the values of the sound for a sample interval. Basically the "average volume of the sound over a period". This is important because sound is a period signal that is constantly changing.

The alternative is _peak loudness_ which is just where the top of the peaks are.

For the most part this background isn't as critical to us -- we just need to know that we have a number that is approximating our sense of how loud the sound is at this moment in time.

Using this is very straightforward:

```javascript
amp = new p5.Amplitude(); // create a new analysis tool

...

source.connect(amp); // connect some sound source up to the tool

...

let level = amp.getLevel(); // level will be a value between0 and 1
```

<!-- Add amplitude to the example code -->

# Waveform

Our more serious analysis tool is `p5.FFT`. This has two main tools. The first is `waveform()`. This returns an array of values in the range $[-1, 1]$. The size is undocumented and in theory there is a way to change the window size, but I am getting 1024 samples. This is a little snapshot of the sound that is rarer than what we get with amplitude.

```javascript
fft = new p5.FFT(); // create a new FFT analyzer
...
source.connect(fft);
...
let waveform = fft.waveform();
```

# FFT

The real business of the `FFT` class is to give us insight into the frequency domain. This performs a discrete fast Fourier transform on the waveform and returns an array of length 1024. These values are in the range $[0, 255]$. You should think of this as a histogram of the frequencies. Using this in a meaningful way is tricky, but you can isolate frequency ranges of interest and look for changes in those frequencies to capture certain parts of the input sound.

```javascript
fft = new p5.FFT(); // create a new FFT analyzer
...
source.connect(fft);
...
let spectrum = fft.analyze();
```
