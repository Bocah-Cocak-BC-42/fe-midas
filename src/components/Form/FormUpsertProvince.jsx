import React from 'react';
import { useState } from 'react';
import { postProvince, putProvince } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';

function FormUpsertProvince(props) {
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    let provinceNameVal = e.target.provinsiName.value || null;

    if (!data) {
      const dataProvince = {
        name: provinceNameVal,
      };
      postProvince(
        (resMessage) => {
          showAlert(resMessage);
        },
        (errors) => {
          setMessageValidationField(errors);
        },
        dataProvince
      );

    } else {
      const dataProvince = {
        id: data?.id,
        name: provinceNameVal,
      };
      putProvince(
        (resMessage) => {
          showAlert(resMessage);
        },
        data.id,
        dataProvince,
        (errors) => {
          setMessageValidationField(errors);
        }
      );
    }
  };
  return (
    <div>
      <form
        id="form-upsert-province"
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-2'
      >
        <div>
          <Input
            placeholder="Masukkan Nama Provinsi"
            name="provinsiName"
            defaultValue={data?.name}
            message={messageValidationField?.Name}
            required
            grow
          >
            Nama Provinsi*
          </Input>
        </div>
      </form>
    </div>
  );
}

export default FormUpsertProvince