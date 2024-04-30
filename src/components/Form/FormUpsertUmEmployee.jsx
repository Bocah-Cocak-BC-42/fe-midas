import Button from "../Button";
import Input from "../Input/Input"
import Select from "../Input/Select"
import { PostNewEmployee } from "../../services/user-management.service";
import { useState } from "react";

function FormUpsertUmEmployee(props) {
    const { data, showAlert } = props;
    const [messageValidationField, setMessageValidationField]= useState({});
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      let emailEmployee = e.target.email.value || null;
      let nameEmployee = e.target.name.value || null;
      let nicknameEmployee = e.target.nickname.value || null;
      let branchEmployee = e.target.branch.value || null;
      let nipEmployee = e.target.nip.value || null;
      let roleEmployee = e.target.role.value || null;

      let data = {email: emailEmployee, name: nameEmployee, nickname: nicknameEmployee, branch: branchEmployee, nip: nipEmployee, role: roleEmployee}
      
      PostNewEmployee(
        (resMessage) => {
          console.log(resMessage);
          showAlert(resMessage);
        },
        (errors) => {
          setMessageValidationField(errors);
        },
        data
      );
    };

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
            defaultValue={data?.name}
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
            defaultValue={data?.nickname}
            message={messageValidationField?.nickname}
            required
            grow
          >
            Nama Panggilan*
          </Input>
        </div>
        <div className="">
        <Input
            placeholder="Masukkan NIP Karyawan Baru"
            name="nip"
            defaultValue={data?.nip}
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
            options={[
              { text: "Pilih Jabatan Karyawan Baru", value: "" },
              { text: "Manager", value: "Manager" },
              { text: "Admin", value: "Admin" },
              { text: "Mantri", value: "Mantri" },
            ]}
          >
            Jabatan*
          </Select>
        </div>
        <div className="self-end">
          <Button type="submit">Tambah</Button>
        </div>
      </form>
    </div>
  )
}

export default FormUpsertUmEmployee
