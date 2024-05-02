import React from 'react';
import { useState } from 'react';
import { postCity } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';
import Select from '../Input/Select';

function FormUpsertCity(props) {
    const {data, showAlert} = props;
    const [messageValidationField, setMessageValidationField] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();

        let cityVal = e.target.cityName.value || null;
        console.log(cityVal);

        const dataCity = {
            provinceId: data[0].id,
            name: cityVal,
        };

        postCity(
            (resMessage) => {
                console.log(resMessage);
                showAlert(resMessage);
            },
            (errors) => {
                setMessageValidationField(errors);
            },
            dataCity
        );
    };
  return (
    <div>
        <form 
        id="form-upsert-city"
        onSubmit={handleSubmit}
        className='flex flex-col gap-2'
        >
            <div>
                <Input
                    placeholder="Masukkan Nama Kota/Kabupaten"
                    name="cityName"
                    defaultValue={data?.cityName}
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