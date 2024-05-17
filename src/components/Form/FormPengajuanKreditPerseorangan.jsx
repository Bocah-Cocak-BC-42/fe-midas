import Input from "../Input/Input";
import { useState} from "react";

function FormPengajuanKreditPerseorangan({page}) {
    const [totalContact, setTotalContact] = useState(1);
    return (
        <div>
            <form 
                id="formPengajuanKreditPerseorangan"
            >
                <div className={`${page !== 1 && "hidden"}`}>
                    <div>Data Diri</div>
                </div>

                <div className={`${page !== 2 && "hidden"}`}>
                    <div>Berkas Diri</div>
                </div>

                <div className={`${page !== 3 && "hidden"}`}>
                    <div>Data Usaha</div>
                </div>

                <div className={`${page !== 4 && "hidden"}`}>
                    <div>Data Usaha 2</div>
                </div>

                <div className={`${page !== 5 && "hidden"}`}>
                    <div>Pengajuan</div>
                </div>
            </form>
        </div>
    )
}

export default FormPengajuanKreditPerseorangan