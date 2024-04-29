import Input from "../Input/Input";
import Select from "../Input/Select";

function FormUpsertBank(props) {
  const { data } = props;
  const handleSubmit = (e) => {
    e.preventDefault();

    let bankNameVal = e.target.bankName.value || null;
    console.log(bankNameVal);
  };

  return (
    <div>
      <form
        id="form-upsert-bank"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <div>
          <Input
            placeholder="Masukkan Nama Bank"
            name="bankName"
            defaultValue={data?.bankName}
            message={"Provinsi Required"}
            required
            grow
          >
            Nama Bank
          </Input>
        </div>
        <div>
          <Select
            name="provinsi"
            grow
            message={"Provinsi Required"}
            options={[
              { text: "Pilih Provinsi", value: "" },
              { text: "Sumatera Utara", value: "SU" },
              { text: "Jawa Barat", value: "JB" },
              { text: "Sulawesi Selatan", value: "SL" },
            ]}
          >
            Nama Provinsi
          </Select>
        </div>
      </form>
    </div>
  );
}

export default FormUpsertBank;
