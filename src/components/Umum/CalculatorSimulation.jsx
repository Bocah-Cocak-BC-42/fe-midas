import Slider from "../Input/Slider";
import { useState } from "react";
import Button from "../Button";

function CalculatorSimulation({onSubmit}) {

    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }
      const [nominal, setNominal] = useState(rupiah(1_000_000));
      const [duration, setDuration] = useState("6 Bulan");
      const [interestrate, setInterestRate] = useState("0 %");
    
    
      const handleNominal = (e)=>{
        let nominalValue = document.querySelector('input[name="nominal"]').value || null;
        setNominal(rupiah(nominalValue));
      }
    
      const handleDuration = ()=>{
        let durationVal = document.querySelector('input[name="timeduration"]').value || null;
        setDuration(durationVal + " Bulan")
      }
    
      const handleInterestRate =()=>{
        let interestRate = document.querySelector('input[name="interestrate"]').value;
        setInterestRate(interestRate + " %")
      }


      const handleSubmit = (e)=>{
        e.preventDefault();
        let nominalVal = document.querySelector('input[name="nominal"]').value;
        let durationVal = document.querySelector('input[name="timeduration"]').value;
        let interestRateVal = document.querySelector('input[name="interestrate"]').value;

        onSubmit(nominalVal, durationVal, interestRateVal);
      }
  return (
    <>
      <div className="text-center">
        <img srcSet="/Pict_4.png" width={700} height={400} />
      </div>
      <div className="flex flex-col justify-center item-center gap-4 p-5 mr-[300px]">
            <h3 className="text-3xl font-bold text-left">
                Simulasi Kredit
            </h3>
            <form action="" onSubmit={handleSubmit}>
            <div className="w-96 text-lg mb-5 leading-relaxed">
              <Slider name="nominal" max="1000000000" step="100000" min="1000000" defaultValue="1000000" onChange={handleNominal} change={nominal}>Jumlah Pinjaman</Slider>
            </div>
            <div className="w-96 text-lg mb-5 leading-relaxed">
              <Slider name="timeduration" max="60" step="1" min="6" onChange={handleDuration} change={duration} defaultValue="6">Jangka Waktu</Slider>
            </div>
            <div className="w-96 text-lg mb-5 leading-relaxed">
              <Slider name="interestrate" max="20" step="0.01" min="0" onChange={handleInterestRate} change={interestrate} defaultValue="0">Suku Bunga</Slider>
            </div>
            <Button type="submit">Hitung</Button>
            </form>
            
      </div>
    </>
  )
}

export default CalculatorSimulation
