import Input from "../../../components/Input/Input";
import { useState} from "react";

function FormDataDiri() {

    return (
        <div>
            <form 
                id="form-data-diri"
                className="flex flex-col gap-4 p-5 shadow-xl">
                
                <div>
                    <Input
                        placeholder="Masukkan NIK"
                        name="nik"
                        required
                        grow
                    >
                    NIK*
                    </Input>
                </div>

                <div>
                    <Input
                        name="nama-lengkap"
                        required
                        grow
                    >
                    Nama Lengkap*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Nomor KK*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Alamat Rumah*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Provinsi*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Kabupaten/Kota*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Kecamatan*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Kel/Desa*
                    </Input>
                </div>

                <div>
                    <Input grow>
                    Kode Pos*
                    </Input>
                </div>
            </form>
        </div>
    )
}

export default FormDataDiri