import Button from "../../components/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";

function UpsertKantorCabang(){
    return(
        <>
            <div className="mt-2">
                <div>
                    <Button icon="arrow-left" variant="danger">
                        Kembali
                    </Button>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Tambah Kantor Cabang</h1>
                </div>

                <div className="rounded-md border mt-4 shadow">
                    <form
                        id="form-upsert-kantor-cabang"
                        // onSubmit={handleSubmit}
                        className="flex flex-col gap-4 p-5 shadow-xl"
                    >
                        <div>
                            <Input 
                                placeholder="Masukan Nama Kantor Cabang"
                                name="namaKantorCabang"
                                // defaultValue={data?.namaKantorCabang}
                                message={"Nama Cabang Harus tidak boleh kosong"}
                                required
                                grow
                            >
                                Nama Cabang
                            </Input>
                        </div>

                        <div>
                            <Input
                                placeholder="Kode Kantor Cabang"
                                name="kodeKantorCabang"
                                // defaultValue={data?.kodeKantorCabang}
                                required
                                grow
                            >
                                Kode Kantor Cabang
                            </Input>
                        </div>

                        <div>
                            <Select
                                name="provinsi"
                                grow
                                massage={"Provinsi Tidak bolek kosong"}
                                options={[
                                    {text: "Pilih Provinsi", value: ""},
                                    {text: "DK Jakarta", value: "DKJ"},
                                    {text: "Jawa Barat", value: "JB"},
                                    {text: "Sulawesi Barat", value: "SLB"},
                                    {text: "DI Yogyakarta", value:"DIY"}
                                ]}
                            >
                                Provinsi
                            </Select>
                        </div>

                        <div>
                            <Select
                            name="kabupaten"
                            grow
                            message={"Kabupaten/Kota tidak boleh kosong"}
                            options={[
                                {text: "Pilih Kabupaten/Kota", value: ""},
                                {text: "Jakarta Barat", value: "JakBar"},
                                {text: "Jakarta Selatan", value: "JakSel"},
                                {text: "Jakarta Utara", value: "JakUt"},
                                {text: "Jakarta Timyur", value: "JakTim"}
                            ]}
                            >
                                Kabupaten/Kota
                            </Select>
                        </div>

                        <div>
                            <Select
                            name="kecamatan"
                            grow
                            message={"Kecamatan tidak boleh kosong"}
                            options={[
                                {text: "Pilih Kabupaten/Kota", value: ""},
                                {text: "Jakarta Barat", value: "JakBar"},
                                {text: "Jakarta Selatan", value: "JakSel"},
                                {text: "Jakarta Utara", value: "JakUt"},
                                {text: "Jakarta Timyur", value: "JakTim"}
                            ]}
                            >
                                Kecamatan
                            </Select>
                        </div>

                        <div>
                            <Select
                            name="kelurahan"
                            grow
                            message={"Kelurahan tidak boleh kosong"}
                            options={[
                                {text: "Pilih Kabupaten/Kota", value: ""},
                                {text: "Jakarta Barat", value: "JakBar"},
                                {text: "Jakarta Selatan", value: "JakSel"},
                                {text: "Jakarta Utara", value: "JakUt"},
                                {text: "Jakarta Timyur", value: "JakTim"}
                            ]}
                            >
                                Kelurahan
                            </Select>
                        </div>

                        <div className="self-end">
                            <Button type="sumbit">
                                Tambah
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpsertKantorCabang;