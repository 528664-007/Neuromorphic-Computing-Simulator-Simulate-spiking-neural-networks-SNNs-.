let pyodide;
const loadingDiv = document.getElementById("loading");
const runBtn = document.getElementById("runBtn");
const pythonCodeElement = document.getElementById("pythonCode");

async function loadPyodideAndPackages() {
    loadingDiv.style.display = "block";
    try {
        pyodide = await loadPyodide();
        const pythonCode = pythonCodeElement.textContent;
        await pyodide.runPythonAsync(pythonCode);
        console.log("Pyodide and Python code loaded successfully");
        runBtn.disabled = false;
    } catch (error) {
        console.error("Error loading Pyodide or Python code:", error);
    } finally {
        loadingDiv.style.display = "none";
    }
}

function drawCanvas(jsonData) {
    console.log("Drawing canvas with data:", jsonData);
    const canvas = document.getElementById("snnCanvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Canvas context not available");
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    try {
        const data = JSON.parse(jsonData);
        const mem = data.mem;
        const spk = data.spk;
        const num_steps = data.steps;

        const padding = 50;
        const plotWidth = canvas.width - 2 * padding;
        const plotHeight = canvas.height - 2 * padding;
        const maxMem = Math.max(...mem, 1.5);
        const maxSpk = 1.5;

        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = "#0ff";
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(padding, padding);
        ctx.lineTo(canvas.width - padding, padding);
        ctx.stroke();

        // Draw membrane potential
        ctx.beginPath();
        ctx.strokeStyle = "#0ff";
        ctx.lineWidth = 2;
        for (let i = 0; i < num_steps; i++) {
            const x = padding + (i / num_steps) * plotWidth;
            const y = canvas.height - padding - (mem[i] / maxMem) * plotHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw spikes
        ctx.beginPath();
        ctx.strokeStyle = "#ff0";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        for (let i = 0; i < num_steps; i++) {
            const x = padding + (i / num_steps) * plotWidth;
            const y = canvas.height - padding - (spk[i] / maxSpk) * plotHeight * 0.5;
            if (spk[i] > 0) {
                ctx.moveTo(x, canvas.height - padding);
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw labels
        ctx.fillStyle = "#0ff";
        ctx.font = "14px Orbitron";
        ctx.fillText("Time Step", canvas.width / 2, canvas.height - 10);
        ctx.fillText("Value", 10, canvas.height / 2);
        ctx.fillText("Membrane Potential", padding, padding - 10);
        ctx.fillStyle = "#ff0";
        ctx.fillText("Spikes", padding + 150, padding - 10);
    } catch (error) {
        console.error("Error rendering canvas:", error);
    }
}

async function runSimulation() {
    const weight = parseFloat(document.getElementById("weight").value);
    const beta = parseFloat(document.getElementById("beta").value);
    if (!pyodide) {
        console.error("Pyodide not loaded yet");
        return;
    }
    try {
        await pyodide.runPythonAsync(`
            import js
            simulate_snn(weight=${weight}, beta=${beta})
        `);
    } catch (error) {
        console.error("Simulation error:", error);
    }
}

// Expose drawCanvas to Python
window.drawCanvas = drawCanvas;

// Initialize Pyodide
loadPyodideAndPackages();
runBtn.addEventListener("click", runSimulation);