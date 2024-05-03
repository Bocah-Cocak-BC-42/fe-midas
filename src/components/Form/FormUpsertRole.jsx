import { useState } from "react";
import { postRole, putRole } from "../../services/data-master-role.service"
import Input from "../Input/Input";
// import Select from "../Input/Select";

function FormUpsertRole(props) {
    const { data, showAlert } = props;
    // const [message, setMessage] = useState("");
    const [messageValidationField, setMessageValidationField] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let roleNameVal = e.target.roleName.value || null;

        // const dataRole = {
        //     name : roleNameVal,
        // };
        
        if (!data) {
            const dataRole = {
                name: roleNameVal,
            };
            postRole(
                (resMessage) => {
                    console.log(resMessage);
                    showAlert(resMessage);
                },
                (errors) => {
                    console.log(errors);
                    setMessageValidationField(errors);
                },
                dataRole
            );
        }else {
            const dataRole = {
                id: data?.id,
                name: roleNameVal,
            };
            putRole(
                (resMessage) => {
                    showAlert(resMessage);
                },
                data.id,
                dataRole,
                (errors) => {
                    setMessageValidationField(errors)
                }
            );
        }
    };

    return(
        <div>
            <form 
                id="form-upsert-role"
                onSubmit={handleSubmit}
                className="flex flex-col gap-2"
            >
                <div>
                    <Input
                        placeholder="Masukkan Nama Role"
                        name="roleName"
                        defaultValue={data?.name}
                        message={messageValidationField?.Name}
                        // required
                        grow
                    >
                        Nama Role
                    </Input>
                </div>
            </form>
        </div>
    );
  };
  
  export default FormUpsertRole;