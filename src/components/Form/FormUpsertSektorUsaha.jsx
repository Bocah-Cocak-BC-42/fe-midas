import { useState } from 'react'
import Input from '../Input/Input';
import { insertSektor, updateSektor } from '../../services/data-master-sektor-usaha';

function FormUpsertSektorUsaha(props) {
    
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let sektorUsahaVal = e.target.sektorName.value || null;

    if(data === undefined)
    {
      const dataSektorInsert = {
        name: sektorUsahaVal
      }
      
      insertSektor(
        (resMessage) => {
          showAlert(resMessage);
        },
        (error) => {
          setMessageValidationField(error);
        },
        dataSektorInsert
      )
    } else {
      const dataSektorUpdate = {
        id: data.id,
        name: sektorUsahaVal
      }

      updateSektor(
        (resMessage) => {
          showAlert(resMessage);
        },
        data.id,
        dataSektorUpdate,
        (error) => {
          setMessageValidationField(error)
        }
      )
    }
  }

  return (
    <div>
        <form 
            id="form-upsert-sektor-usaha"
            onSubmit={handleSubmit}
            className="flex flex-col gap-2">

              <Input
                name="sektorName"
                defaultValue={data?.name}
                message={messageValidationField?.Name}
                required>
                  Nama Sektor Usaha
              </Input>
        </form>
    </div>
  )
}

export default FormUpsertSektorUsaha