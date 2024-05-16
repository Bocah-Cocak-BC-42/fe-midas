import { useState } from "react";
import Button from "../../components/Button";
import FormPengajuanKreditPerseorangan from "../../components/Form/FormPengajuanKreditPerseorangan";
import StepNavigation from "../../components/StepNavigation";


function PengajuanKreditPerseorangan(){

    const [step, setStep] = useState(1);

    const [stepOptions, setStepOptions] = useState(["Data Diri", "Berkas Diri & Kontak Darurat", "Data Usaha", "Data Usaha 2", "Pengajuan"]);
    return (
        <div className="bg-white rounded-lg">
            <div>
                <StepNavigation stepOptions={stepOptions} tab={step}/>
            </div>
            <div>
                <FormPengajuanKreditPerseorangan page={step}/>
            </div>  

            <div className={`flex justify-${step==1? "end" : "between"}`}>
               {step !== 1 && (
                <Button
                    icon="arrrow-left"
                    variant="danger"
                    onClick={()=> setStep(step-1)}
                >
                    Kembali
                </Button>

               )}

               {step <= 4 && (
                <Button
                    icon="arrrow-left"
                    variant="danger"
                    onClick={()=> setStep(step+1)}
                >
                    Selanjutnya
                </Button>
               )}

               {step === 5 && (
                <Button
                    type="submit"
                    form="formPengajuanKreditPerseorangan"
                    icon="check"
                    variant="success"
                >
                    Ajukan
                </Button>
                
               )}
            </div>
        </div>
    );
    
}


export default PengajuanKreditPerseorangan;