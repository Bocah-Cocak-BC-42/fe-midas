import React from 'react';
import { useState } from 'react';
import { postProvince } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';
import Select from '../Input/Select';

function FormUpsertAlamat(props) {
    const {data, showAltert} = props;
    const [messageValidationField, setMessageValidationField] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();

        let provinsiVal = e.target.provinsiName.value || null;
        console.log(provinsiVal);

        const dataAlamat = {
            name: provinsiVal,
        };

        postProvince(
            (resMessage) => {
                console.log(resMessage);
                showAltert(resMessage);
            },
            (errors) => {
                setMessageValidationField(errors);
            },
            dataAlamat
        );
    };
  return (
    <div>
        <form 
        id="form-upsert-alamat"
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

export default FormUpsertAlamat