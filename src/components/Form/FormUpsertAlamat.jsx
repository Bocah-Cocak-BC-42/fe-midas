import React from 'react'
import Input from '../Input/Input';
import Select from '../Input/Select';

function FormUpsertAlamat(props) {
    const {data} = props;
    const handleSubmit = (e) => {
        e.preventDefault();

        let provinsiVal = e.target.provinsiName.value || null;
        console.log(provinsiVal);
    };
  return (
    <div>
        <form 
        id="form-upsert-bank"
        onSubmit={handleSubmit}
        className='flex flex-col gap-2'
        >
            <div>
                <Input
                    placeholder="Masukkan Nama Provinsi"
                    name="provinceName"
                    defaultValue={data?.provinsiName}
                    message={"Provinsi Required"}
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