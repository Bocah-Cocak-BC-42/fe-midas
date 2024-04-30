import { useState } from "react";
import { postBank } from "../../services/data-master-bank.service";
import Input from "../Input/Input";
import Select from "../Input/Select";

function FormUpsertBank(props) {
  const { data, showAlert } = props;
  // const [message, setMessage] = useState("");
  const [messageValidationField, setMessageValidationField] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let bankNameVal = e.target.bankName.value || null;
    console.log(bankNameVal);

    const dataBank = {
      name: bankNameVal,
    };

    postBank(
      (resMessage) => {
        console.log(resMessage);
        showAlert(resMessage);
        // setMessage(resMessage);
        // setShowModalAlert(true);
        // location.reload();
        // setBanks(data.data);
        // setPagination(data.pagination);
      },
      (errors) => {
        setMessageValidationField(errors);
      },
      dataBank
    );
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
            message={messageValidationField?.Name}
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
