import React, {useState, useEffect} from "react";
import FormUpsertUmEmployee from "../../components/Form/FormUpsertUmEmployee";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpsertUserManagementEmployee() {
  const [employee, setEmployee] = useState();
  const { employeeId } = useParams();

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModal(false);
    setShowModalAlert(true);
  };

  let navigate = useNavigate();
  return (
    <>
    <div className="my-5">
        <Button
          variant="danger"
          onClick={() => navigate(-1)}
          icon= "arrow-left"
        >
          Kembali
        </Button> 
      </div>
      <div className="my-5">
        <h1 className="text-2xl font-bold">Tambah Karyawan</h1>
      </div>
      <FormUpsertUmEmployee 
        data={employee} showAlert={handleShowAlert}/>
    </>
  )
}

export default UpsertUserManagementEmployee
