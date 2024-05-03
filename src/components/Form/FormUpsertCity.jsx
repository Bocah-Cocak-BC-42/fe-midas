import React from 'react';
import { useState } from 'react';
import { postCity, putCity } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';

function FormUpsertCity(props) {
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    let cityVal = e.target.cityName.value || null;

    if (!data) {
      const dataCity = {
        id: data[0].id,
        name: cityVal,
      };
      postCity(
        (resMessage) => {
          showAlert(resMessage);
        },
        (errors) => {
          setMessageValidationField(errors);
        },
        dataCity
      );
    } else {
      const dataCity = {
        id: data?.id,
        name: cityVal,
      };
      putCity(
        (resMessage) => {
          showAlert(resMessage);
        },
        data.id,
        dataCity,
        (errors) => {
          setMessageValidationField(errors);
        }
      );
    }
  };
  return (
    <div>
      <form
        id="form-upsert-city"
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-2'
      >
        <div>
          <Input
            placeholder="Masukkan Nama Kota/Kabupaten"
            name="cityName"
            defaultValue={data?.name}
            message={messageValidationField?.Name}
            required
            grow
          >
            Nama Kota/Kabupaten*
          </Input>
        </div>
      </form>
    </div>
  );
}

export default FormUpsertCity