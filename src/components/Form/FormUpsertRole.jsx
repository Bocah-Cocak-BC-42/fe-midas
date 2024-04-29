import Input from "../Input/Input";
import Select from "../Input/Select";

function FormUpsertRole(props) {
    const { data } = props;
    const handleSubmit = (e) => {
        e.preventDefault();

        let roleNameVal = e.target.roleName.value || null;
        console.log(roleNameVal);
    };

    return(
        <div>
            <form 
                id="form-upsert-role"
                onSubmit={handleSubmit}
                classNmae="flex flex-col gap-2"
            >
                <div>
                    <Input
                        placeholder="Masukkan Nama Role"
                        name="roleName"
                        defaultValue={data?.roleName}
                        message={"Wajib diisi"}
                        required
                        grow
                    >
                    Nama Role
                    </Input>
                </div>
            </form>
        </div>
    )
  }
  
  export default FormUpsertRole;