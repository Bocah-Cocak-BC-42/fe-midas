import React from 'react';
import { useState } from 'react';
import { postVillage } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';
import Select from '../Input/Select';

function FormUpsertVillage(props) {
    const {data, showAlert} = props;
    const [messageValidationField, setMessageValidationField] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();

        let villageVal = e.target.villageName.value || null;
        let postalCode = e.target.postalCode.value || null;

        const dataVillage = {
            subdistrictId: data[2].id,
            name: villageVal,
            postalCode: postalCode
            
        };

        postVillage(
            (resMessage) => {
                
                showAlert(resMessage);
            },
            (errors) => {
                setMessageValidationField(errors);
            },
            dataVillage
        );
    };
  return (
    <div>
        <form 
        id="form-upsert-village"
        onSubmit={handleSubmit}
        className='flex flex-col gap-2'
        >
            <div>
                <Input
                    placeholder="Masukkan Nama Desa"
                    name="villageName"
                    defaultValue={data?.villageName}
                    message={messageValidationField?.Name}
                    required
                    grow
                    >
                     Nama Desa*
                </Input>
                <Input
                    placeholder="Masukkan Kode Pos"
                    name="postalCode"
                    defaultValue={data?.postalCode}
                    message={messageValidationField?.Name}
                    required
                    grow
                    >
                     Kode Pos*
                </Input>
            </div>

        </form>
    </div>
  );
}

export default FormUpsertVillage