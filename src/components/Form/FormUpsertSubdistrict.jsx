import React from 'react';
import { useState } from 'react';
import { postSubdistrict, putCity, putSubdistrict } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';

function FormUpsertSubdistrict(props) {
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    let subdistrictVal = e.target.subdistrictName.value || null;
    
    if(!data) {
      const dataSubdistrict = {
        id: data[1].id,
        name: subdistrictVal,
      };
      postSubdistrict(
        (resMessage) => {
          showAlert(resMessage);
        },
        (errors) => {
          setMessageValidationField(errors);
        },
        dataSubdistrict
      );
    } else {
      const dataSubdistrict = {
        id: data?.id,
        name: subdistrictVal,
      };
      putSubdistrict(
        (resMessage) => {
          showAlert(resMessage);
        },
        data.id,
        dataSubdistrict,
        (errors) => {
          setMessageValidationField(errors);
        }
      );
    }

  };
  return (
    <div>
      <form
        id="form-upsert-subdistrict"
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-2'
      >
        <div>
          <Input
            placeholder="Masukkan Nama Kecamatan"
            name="subdistrictName"
            defaultValue={data?.name}
            message={messageValidationField?.Name}
            required
            grow
          >
            Nama Kecamatan*
          </Input>
        </div>
      </form>
    </div>
  );
}

export default FormUpsertSubdistrict