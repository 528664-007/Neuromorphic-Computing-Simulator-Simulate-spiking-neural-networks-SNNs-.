import unittest
import json
from src.python.simulator import leaky_integrate_and_fire, simulate_snn

class TestSimulator(unittest.TestCase):
    def test_leaky_integrate_and_fire(self):
        mem = 0.0
        x = 0.5
        w = 0.4
        beta = 0.819
        spk, new_mem = leaky_integrate_and_fire(mem, x, w, beta)
        self.assertEqual(spk, 0)  # Should not spike initially
        self.assertAlmostEqual(new_mem, 0.4 * 0.5, places=5)

    def test_simulate_snn_output(self):
        data = json.loads(simulate_snn(weight=0.4, beta=0.819))
        self.assertEqual(len(data["mem"]), 200)
        self.assertEqual(len(data["spk"]), 200)
        self.assertEqual(data["steps"], 200)

if __name__ == "__main__":
    unittest.main()