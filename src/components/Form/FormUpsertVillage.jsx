import React from 'react';
import { useState } from 'react';
import { postVillage, putVillage } from '../../services/data-master-alamat.service';
import Input from '../Input/Input';

function FormUpsertVillage(props) {
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    let villageVal = e.target.villageName.value || null;
    let postalCode = e.target.postalCode.value || null;

    if(!data) {
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
    } else {
      const dataVillage = {
        id: data?.id,
        name: villageVal,
        postalCode : postalCode
      };
      putVillage(
        (resMessage) => {
          showAlert(resMessage);
        },
        data.id,
        dataVillage,
        (errors) => {
          setMessageValidationField(errors);
        }
      );
    }

  };
  return (
    <div>
      <form
        id="form-upsert-village"
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-2'
      >
        <div>
          <Input
            placeholder="Masukkan Nama Desa"
            name="villageName"
            defaultValue={data?.name}
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