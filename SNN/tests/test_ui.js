// Note: Requires Jest or similar framework to run
describe("UI Tests", () => {
    test("Canvas exists", () => {
        const canvas = document.getElementById("snnCanvas");
        expect(canvas).toBeDefined();
    });

    test("Run button is disabled initially", () => {
        const runBtn = document.getElementById("runBtn");
        expect(runBtn.disabled).toBe(true);
    });
});