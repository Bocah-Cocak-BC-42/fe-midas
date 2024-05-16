import Button from "../Button";
import Input from "../Input/Input"
import Select from "../Input/Select"
import { PostNewEmployee, putEmployee } from "../../services/user-management.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormUpsertUmEmployee(props) {
    const { data, showAlert, roles } = props;
    const [messageValidationField, setMessageValidationField]= useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      let emailEmployee = e.target.email.value || null;
      let nameEmployee = e.target.name.value || null;
      let nicknameEmployee = e.target.nickname.value || null;
      let nipEmployee = e.target.nip.value || null;
      let roleEmployee = e.target.role.value || null;
      let genderEmployee = e.target.gender.value || null;

    if(data.length == 0){
        const dataNewEmployee = {
          email: emailEmployee, 
          roleId: roleEmployee, 
          fullName: nameEmployee,
          nickName: nicknameEmployee, 
          identityNumber: nipEmployee, 
          gender: genderEmployee
        }
        PostNewEmployee(
          (resMessage) => {
            showAlert(resMessage);
          },
          (errors) => {
            setMessageValidationField(errors);
          },
          dataNewEmployee
        );
  }else{
        const dataEmployee = {
          id: data?.id,
          email: emailEmployee,
          roleId: roleEmployee, 
          fullName: nameEmployee,
          nickName: nicknameEmployee, 
          identityNumber: nipEmployee, 
          gender: genderEmployee
        }
        putEmployee(
          (resMessage) => {
            showAlert(resMessage);
          },
          data.id,
          dataEmployee,
          (errors) => {
            setMessageValidationField(errors);
          }
        );
      };
      
      navigate("/admin/user-management/karyawan");
    };

  const mapRoles = ()=>{
      let result = [];
      result.push({text: "Pilih Role Karyawan Baru",value: ""})
      roles.map((role)=>{
        if(role.name != "Nasabah"){
          result.push({text: role.name,value: role.id})
        }
      })

    return result;
  };
console.log(data);
  return (
    <div>
      <form
        id="form-upsert-UserEmployee"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="">
        <Input
            placeholder="Masukkan Email Karyawan"
            name="email"
            defaultValue={data?.email}
            message={messageValidationField?.email}
            required
            grow
          >
            Email*
          </Input>
        </div>
        <div className="">
        <Input
            placeholder="Masukkan Nama Lengkap Karyawan"
            name="name"
            defaultValue={data?.fullName}
            message={messageValidationField?.fullName}
            required
            grow
          >
            Nama Lengkap*
          </Input>
        </div>
        <div className="">
        <Input
            placeholder="Masukkan Nama Panggilan Karyawan"
            name="nickname"
            defaultValue={data?.nickName}
            message={messageValidationField?.nickname}
            required
            grow
          >
            Nama Panggilan*
          </Input>
        </div>
        <div>
          <Select
            name="gender"
            grow
            message={messageValidationField?.role}
            options={
              [{text:"Pilih Jenis Kelamin Karyawan", value: ""},{text: "Laki - Laki", value: "M"},{text: "Perempuan", value: "F"}]
            }
            defaultValue={data?.gender}
          >
            Jenis Kelamin*
          </Select>
        </div>
        <div className="">
        <Input
            placeholder="Masukkan NIP Karyawan Baru"
            name="nip"
            defaultValue={data?.identityNumber}
            message={messageValidationField?.nip}
            required
            grow
          >
            NIP*
          </Input>
        </div>
        <div>
          <Select
            name="role"
            grow
            message={messageValidationField?.role}
            options={
              mapRoles()
            }
            defaultValue={data?.roleId}
          >
            Jabatan*
          </Select>
        </div>
        <div className="self-end">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  )
}

export default FormUpsertUmEmployee
