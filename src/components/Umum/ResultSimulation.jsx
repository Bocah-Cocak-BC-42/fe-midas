import Button from "../Button"

function ResultSimulation(props) {
    const {result, onBack} = props;
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }

    function calculateEMI(nominal, rate, duration) {
        console.log(rate);
        const monthlyRate = rate / 1200;
    
        const emi = (nominal * monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
    
        return emi;
    }
    
    const handleClickBack = (e)=>{
        e.preventDefault();
        onBack(1_000_000, "6 bulan", "0 %")
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
        <div className="border border-black p-[80px] flex flex-col gap-4 shadow-lg items-center justify-center">
            <h1 className="text-3xl">Estimasi Angsuran Setiap Bulannya*</h1>
            <h1 className="text-4xl font-bold">{rupiah(calculateEMI(result.nominal, result.interestRate, result.duration))}</h1>
            <p className="text-gray">
            *belum termasuk biaya administrasi pada angsuran pertama, sebesar Rp. 250.000
            </p>
            <Button variant="danger" className="text-lg" onClick={handleClickBack} >Hitung Kembali</Button>
        </div>
        
    </div>
    </>
  )
}

export default ResultSimulation
