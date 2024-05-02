import React from 'react';
import { useState } from 'react';
import { postProvince } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';
import Select from '../Input/Select';

function FormUpsertProvince(props) {
    const {data, showAlert} = props;
    const [messageValidationField, setMessageValidationField] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();

        let provinsiVal = e.target.provinsiName.value || null;
        console.log(provinsiVal);

        const dataProvince = {
            name: provinsiVal,
        };

        postProvince(
            (resMessage) => {
                console.log(resMessage);
                showAlert(resMessage);
            },
            (errors) => {
                setMessageValidationField(errors);
            },
            dataProvince
        );
    };
  return (
    <div>
        <form 
        id="form-upsert-province"
        onSubmit={handleSubmit}
        className='flex flex-col gap-2'
        >
            <div>
                <Input
                    placeholder="Masukkan Nama Provinsi"
                    name="provinsiName"
                    defaultValue={data?.provinsiName}
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