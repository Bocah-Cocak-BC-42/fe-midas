import { useState } from "react";
import { postBank, putBank } from "../../services/data-master-bank.service";
import Input from "../Input/Input";

function FormUpsertBank(props) {
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let bankNameVal = e.target.bankName.value || null;

    // const dataBank = {
    //   id: data?.id,
    //   name: bankNameVal,
    // };

    if (!data) {
      const dataBank = {
        name: bankNameVal,
      };
      postBank(
        (resMessage) => {
          showAlert(resMessage);
        },
        (errors) => {
          setMessageValidationField(errors);
        },
        dataBank
      );
    } else {
      const dataBank = {
        id: data?.id,
        name: bankNameVal,
      };
      putBank(
        (resMessage) => {
          showAlert(resMessage);
        },
        data.id,
        dataBank,
        (errors) => {
          setMessageValidationField(errors);
        }
      );
    }
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
            defaultValue={data?.name}
            message={messageValidationField?.Name}
            // required
            grow
          >
            Nama Bank
          </Input>
        </div>
      </form>
    </div>
  );
}

export default FormUpsertBank;
