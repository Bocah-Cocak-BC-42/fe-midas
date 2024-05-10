import { useState } from "react";
import Button from "../../components/Button";
import FormDataDiri from "../../components/Form/FormPengajuanKreditPerseorangan";


function PengajuanKreditPerseorangan(){

    <div className="flex justify-between">
        <div>
            <Button>
                Data Diri
            </Button>
        </div>
        <div>
            <Button>
                Berkas Diri & Kontak Darurat
            </Button>
        </div>
        <div>
            <Button>
                Data Usaha
            </Button>
        </div>
        <div>
            <Button>
                Data Usaha 2
            </Button>
        </div>
        <div>
            <Button>
                Pengajuan
            </Button>
        </div>
    </div>

    return (
        <>
            <FormDataDiri/>
        </>
    )


}


export default PengajuanKreditPerseorangan;