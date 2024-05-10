import { useState } from "react";
import Button from "../../components/Button";
import FormDataDiri from "../../components/Form/FormPengajuanKreditPerseorangan";
import StepNavigation from "../../components/StepNavigation";


function PengajuanKreditPerseorangan(){

    return (
        <>
            <div>
                <StepNavigation/>
            </div>
            <div>
                <FormDataDiri/>
            </div>  
        </>
    )


}


export default PengajuanKreditPerseorangan;