import { useEffect, useState } from "react";
import Select from "../Input/Select";
import { postEmployeeBranchOffice } from "../../services/data-master-kantor-cabang";

function FormUpsertKaryawanCabang(props) {
    const { data, showAlert, id } = props;
    console.log(id);
    const [messageValidationField, setMessageValidationField] = useState({});
  
    const handleSubmit = (e) =>{
        e.preventDefault()
        let namaKaryawan = e.target.karyawan.value || null
        const newBranchOfficeEmployee = {
            userId: namaKaryawan,
            branchOfficeId: id
        }
        postEmployeeBranchOffice(
            (ressMessage) => {
                console.log(ressMessage)
                showAlert(ressMessage)
            },
        (error) => {
                setMessageValidationField(error)
            },
            newBranchOfficeEmployee
        )
    };

    const mapKaryawan = ()=>{
        let result = [];
        result.push({name: "Pilih Karyawan", id: ""})
        data.map((user) => {
            if(user.role != "Nasabah"){
                result.push({name: user.fullName, id: user.id})
            }
        })

        return result;
    }
    return (
        <div>
            
            <form id="form-upsert-karyawan-cabang"
            onSubmit={(e)=>handleSubmit(e)}
            className="flex flex-col gap-2">
                <div>
                   <Select
                    name="karyawan"
                    grow
                    message={messageValidationField?.UserId}
                    options={
                        mapKaryawan()
                    }
                    handleChange = {() => {}}
                    
                   >
                    Nama Karyawan
                   </Select>
                </div>
            </form>
        </div>
    );
}

export default FormUpsertKaryawanCabang;