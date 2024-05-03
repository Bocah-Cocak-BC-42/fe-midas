import React from 'react';
import { useState } from 'react';
import { postSubdistrict } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';
import Select from '../Input/Select';

function FormUpsertSubdistrict(props) {
    const {data, showAlert} = props;
    const [messageValidationField, setMessageValidationField] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();

        let subdistrictVal = e.target.subdistrictName.value || null;
        console.log(subdistrictVal);

        const dataSubdistrict = {
            cityId: data[1].id,
            name: subdistrictVal,
        };

        postSubdistrict(
            (resMessage) => {
                console.log(resMessage);
                showAlert(resMessage);
            },
            (errors) => {
                setMessageValidationField(errors);
            },
            dataSubdistrict
        );
    };
  return (
    <div>
        <form 
        id="form-upsert-subdistrict"
        onSubmit={handleSubmit}
        className='flex flex-col gap-2'
        >
            <div>
                <Input
                    placeholder="Masukkan Nama Kecamatan"
                    name="subdistrictName"
                    defaultValue={data?.subdistrictName}
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