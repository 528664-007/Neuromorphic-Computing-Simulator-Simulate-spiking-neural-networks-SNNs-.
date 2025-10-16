# Architecture Notes

## Overview
The Neuromorphic Computing Simulator is a single-page web application that simulates a Leaky Integrate-and-Fire (LIF) neuron using Pyodide to execute Python code in the browser.

## File Structure
- `/src/index.html`: Main entry point with HTML structure and links to CSS/JS.
- `/src/css/styles.css`: Contains all styling, maintaining a futuristic aesthetic.
- `/src/js/script.js`: Handles JavaScript logic, including Pyodide initialization and canvas rendering.
- `/src/python/simulator.py`: Standalone Python code for the SNN simulation, also embedded in `index.html`.
- `/src/assets/`: Stores images and icons for UI enhancement.
- `/docs/`: Contains project documentation.
- `/tests/`: Reserved for future unit tests.

## Workflow
1. **Initialization**: Pyodide loads and executes the embedded Python code.
2. **Interaction**: User adjusts parameters and clicks "Run Simulation."
3. **Simulation**: Python code runs the LIF neuron model and passes data to JavaScript via JSON.
4. **Rendering**: JavaScript plots the membrane potential and spikes on the canvas.

## Future Improvements
- Add support for multiple neurons or network simulations.
- Integrate a backend for saving simulation results.
- Expand tests in `/tests/`.