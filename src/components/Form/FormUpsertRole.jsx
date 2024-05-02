import { useState } from "react";
import { postRole } from "../../services/data-master-role.service"
import Input from "../Input/Input";
// import Select from "../Input/Select";

function FormUpsertRole(props) {
    const { data, showAlert } = props;
    // const [message, setMessage] = useState("");
    const [messageValidationField, setMessageValidationField] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let roleNameVal = e.target.roleName.value || null;
        console.log(roleNameVal);

        const dataRole = {
            name : roleNameVal,
        };
    
        postRole(
            (resMessage) => {
                console.log(resMessage);
                showAlert(resMessage);
                // setMessage(resMessage);
                // setShowModalAlert(true);
                // location.reload();
                // setBanks(data.data);
                // setPagination(data.pagination);
            },
            (errors) => {
                setMessageValidationField(errors);
            },
            dataRole
        );
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
                        defaultValue={data?.roleName}
                        message={messageValidationField?.Name}
                        required
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