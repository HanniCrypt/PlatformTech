import { useState } from "react";

export default function MiniOS() {
  const [stage, setStage] = useState("menu");
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [error, setError] = useState("");

  const handleOperationClick = (op) => {
    setOperation(op);
    setStartTime(performance.now());
    setStage("input");
    setError("");
  };

  const validateInputs = () => {
    if (num1 === "" || num2 === "") {
      setError("Please enter both numbers");
      return false;
    }
    if (operation === "division" && parseFloat(num2) === 0) {
      setError("Cannot divide by zero");
      return false;
    }
    return true;
  };

  const performOperation = () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    setError("");
    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);
    let res;

    switch (operation) {
      case "addition":
        res = parsedNum1 + parsedNum2;
        break;
      case "subtraction":
        res = parsedNum1 - parsedNum2;
        break;
      case "multiplication":
        res = parsedNum1 * parsedNum2;
        break;
      case "division":
        res = parsedNum2 !== 0 ? parsedNum1 / parsedNum2 : "Error: Division by zero";
        break;
      default:
        res = "Invalid operation";
    }

    const end = performance.now();
    setResult(res);
    setTimeTaken(((end - startTime) / 1000).toFixed(3));
    setStage("result");
    setLoading(false);
  };

  const resetToMenu = () => {
    setStage("menu");
    setOperation(null);
    setResult(null);
    setTimeTaken(null);
    setStartTime(null);
    setNum1("");
    setNum2("");
    setError("");
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center min-h-screen p-4">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[580px] py-12 px-8 text-center shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-purple-500/10 blur-3xl -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-1/2 w-1/2 h-1/2 bg-indigo-500/10 blur-3xl translate-x-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {stage === "menu" && (
            <>
              <h1 className="text-4xl font-bold mb-8 text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Mini Operating System
              </h1>
              <p className="text-center text-gray-300 mb-8 text-lg">Choose an operation:</p>
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => handleOperationClick("addition")} 
                  className="group bg-indigo-600/80 hover:bg-indigo-700/90 text-white py-8 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-indigo-500/30 text-5xl font-bold relative overflow-hidden"
                  title="Addition"
                >
                  <span className="relative z-10">+</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-white/10 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
                <button 
                  onClick={() => handleOperationClick("subtraction")} 
                  className="group bg-violet-600/80 hover:bg-violet-700/90 text-white py-8 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-violet-500/30 text-5xl font-bold relative overflow-hidden"
                  title="Subtraction"
                >
                  <span className="relative z-10">−</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-white/10 to-violet-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
                <button 
                  onClick={() => handleOperationClick("multiplication")} 
                  className="group bg-fuchsia-600/80 hover:bg-fuchsia-700/90 text-white py-8 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-fuchsia-500/30 text-5xl font-bold relative overflow-hidden"
                  title="Multiplication"
                >
                  <span className="relative z-10">×</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/0 via-white/10 to-fuchsia-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
                <button 
                  onClick={() => handleOperationClick("division")} 
                  className="group bg-purple-600/80 hover:bg-purple-700/90 text-white py-8 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-purple-500/30 text-5xl font-bold relative overflow-hidden"
                  title="Division"
                >
                  <span className="relative z-10">÷</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </>
          )}

          {stage === "input" && (
            <div className="flex flex-col items-center space-y-8">
              <h2 className="text-3xl font-semibold text-white tracking-wide mb-2">{`Performing ${operation}`}</h2>
              <div className="flex items-center justify-center space-x-4 w-full max-w-md">
                <input
                  type="number"
                  placeholder="Enter first number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 text-lg"
                />
                <div className="text-5xl font-bold text-white/90 w-12 flex justify-center items-center">
                  {operation === "addition" && "+"}
                  {operation === "subtraction" && "−"}
                  {operation === "multiplication" && "×"}
                  {operation === "division" && "÷"}
                </div>
                <input
                  type="number"
                  placeholder="Enter second number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 text-lg"
                />
              </div>
              {error && (
                <p className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg">
                  {error}
                </p>
              )}
              <div className="flex gap-4">
                <button 
                  onClick={performOperation} 
                  className="group bg-emerald-600/80 hover:bg-emerald-700/90 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-emerald-500/30 relative overflow-hidden"
                >
                  <span className="relative z-10">Perform Operation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-white/10 to-emerald-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
                <button 
                  onClick={resetToMenu} 
                  className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl border border-white/20 transition-all duration-300"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}

          {stage === "result" && (
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-semibold text-white tracking-wide">Operation Result</h2>
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <p className="text-white text-2xl mb-4">
                  Result: <span className="text-emerald-400 font-semibold">{result}</span>
                </p>
                <p className="text-gray-400">
                  Runtime: <span className="text-indigo-400">{timeTaken}</span> seconds
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setStage("input")} 
                  className="group bg-emerald-600/80 hover:bg-emerald-700/90 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-emerald-500/30 relative overflow-hidden"
                >
                  <span className="relative z-10">Repeat Operation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-white/10 to-emerald-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
                <button 
                  onClick={resetToMenu} 
                  className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl border border-white/20 transition-all duration-300"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <div className="text-white text-xl">Processing...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}