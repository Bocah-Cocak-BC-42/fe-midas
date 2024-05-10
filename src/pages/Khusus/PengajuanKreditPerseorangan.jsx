import { useState } from "react";
import Button from "../../components/Button";
import FormDataDiri from "../../components/Form/FormPengajuanKreditPerseorangan/FormDataDiri";
import StepNavigation from "../../components/StepNavigation";


function PengajuanKreditPerseorangan(){

    const [tab, setTab] = useState(1);

    const stepOptions = ["Data Diri", "Berkas Diri & Kontak Darurat", "Data Usaha", "Pengajuan"];
    return (
        <>
            <div>
                <StepNavigation stepOptions={stepOptions} tab={tab}/>
            </div>
            <div>
                <FormDataDiri/>
            </div>  
        </>
    )
    
}


export default PengajuanKreditPerseorangan;