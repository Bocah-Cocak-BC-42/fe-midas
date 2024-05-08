import Input from "../Input/Input";
import Select from "../Input/Select";

function FormUpsertKaryawanCabang(props) {
    const { data } = props;
    const handleSubmit = (e) =>{
        e.prventDefault();

        let namaKaryawanVal = e.target.namaKaryawan.value || null;
        console.log(namaKaryawanVal);
    };

    return (
        <div>
            <form id="form-upsert-karyawan-cabang"
            onSubmit={handleSubmit}
            className="flex flex-col gap-2">
                <div>
                   <Select
                    name="namaKaryawan"
                    grow
                    message={"Nama Karyawan Required"}
                    options={[
                        {text: "Pilih Karyawan", value: ""},
                        {text: "Faisal", value: "ksjadhkjsa"},
                        {text: "Agusto", value: "jhadsghsad"},
                        {text: "Kevin", value: "skdjkasjdhka"},
                        {text: "Wisnu", value: "ksdjgfkjsjk"}
                    ]}
                   >
                    Nama Karyawan
                   </Select>
                </div>
            </form>
        </div>
    );
}

export default FormUpsertKaryawanCabang;