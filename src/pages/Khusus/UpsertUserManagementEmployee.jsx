import React, {useState, useEffect} from "react";
import FormUpsertUmEmployee from "../../components/Form/FormUpsertUmEmployee";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetAllRoles } from "../../services/data-master-role.service";
import { getEmployeeById } from "../../services/user-management.service";

function UpsertUserManagementEmployee() {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const [roles, setRoles] = useState([]);

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModal(false);
    setShowModalAlert(true);
  };


  useEffect(() => {
    GetAllRoles(
        (data) => {
          setRoles(data.data);
        }
      )

      if(id != null){
        getEmployeeById(
          (data) => {
            setEmployee(data.data);
          },
          {id: id}
        )
      }
  }, [])
  
  let navigate = useNavigate();
  return (
    <>
    <div className="my-5">
        <Button
          variant="danger"
          onClick={() => navigate("/admin/user-management/karyawan")}
          icon= "arrow-left"
        >
          Kembali
        </Button> 
      </div>
      <div className="my-5">
        <h1 className="text-2xl font-bold">Tambah Karyawan</h1>
      </div>
      <FormUpsertUmEmployee 
        data={employee} showAlert={handleShowAlert} roles={roles}/>
    </>
  )
}

export default UpsertUserManagementEmployee
