import Button from "../Button";
import { useNavigate } from "react-router-dom";
function Tagline() {
    const navigate = useNavigate();

    const handleStart = ()=>{
        navigate("login")
    }

  return (
    <div className="flex justify-between" id="tagline">
        <div className="flex flex-col gap-4 justify-center items-center p-5 ml-[400px]">
            <h3 className="text-3xl">
                Solusi Kredit
            </h3>
            <h3 className="text-3xl">
                Untuk Investasi Anda
            </h3>
            <Button variant="info" onClick={() => handleStart}>Mulai</Button>
        </div>
        <div className="text-center">
            <img srcSet="/Pict_2.png" width={800} height={400} />
        </div>
    </div>
  )
}

export default Tagline
