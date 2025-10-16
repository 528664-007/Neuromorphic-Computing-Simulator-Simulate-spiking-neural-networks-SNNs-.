import json

def leaky_integrate_and_fire(mem, x, w, beta, threshold=1):
    """
    Leaky Integrate-and-Fire (LIF) neuron model.
    - mem: Current membrane potential
    - x: Input current
    - w: Weight
    - beta: Decay rate
    - threshold: Firing threshold
    Returns: (spike (0 or 1), updated membrane potential)
    """
    spk = 1 if mem > threshold else 0
    mem = beta * mem + w * x - spk * threshold
    return spk, mem

def simulate_snn(weight=0.4, beta=0.819):
    """
    Simulate the SNN for a fixed number of steps.
    - weight: Synaptic weight
    - beta: Membrane decay rate
    Outputs JSON data with membrane potentials and spikes.
    """
    num_steps = 200
    x = [0] * 10 + [0.5] * 190  # Input signal: zeros then constant 0.5
    mem = 0.0
    mem_rec = []
    spk_rec = []

    for step in range(num_steps):
        spk, mem = leaky_integrate_and_fire(mem, x[step], w=weight, beta=beta)
        mem_rec.append(mem)
        spk_rec.append(spk)

    data = {"mem": mem_rec, "spk": spk_rec, "steps": num_steps}
    print(json.dumps(data))  # For local testing; in browser, this would call js.drawCanvas

if __name__ == "__main__":
    simulate_snn()