

import CalculatorSimulation from "./CalculatorSimulation";
import ResultSimulation from "./ResultSimulation";
import { useState } from "react";
function Simulation() {
  const [showResult, setShowResult] = useState(false);
  const [simulationResult, setSimulationResult] = useState({});

  const handleCalculate = (nominal, duration, interestRate) => {
    const result = {
      nominal: nominal,
      duration: duration,
      interestRate: interestRate
    };
    setSimulationResult(result);
    setShowResult(true);
  }

  const handleBack = (nominal, duration, interestRate)=>{
    const reset = {
      nominal: nominal,
      duration: duration,
      interestRate: interestRate
    };
    setSimulationResult(reset);
    setShowResult(false);
  }

  return (
    <div className="flex justify-between bg-[#F1EF99] text-[#C07F00]" id="aboutus"> 
      {!showResult ? 
        <CalculatorSimulation onSubmit={handleCalculate} /> :
        <ResultSimulation result={simulationResult} onBack={handleBack} />
      }
    </div>
  )
}

export default Simulation
