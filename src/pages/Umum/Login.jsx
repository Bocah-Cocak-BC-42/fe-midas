import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input/Input";
import { postLogin } from "../../services/authentication.service";
import Modal from "../../components/Modal";
import Cookies from "js-cookie";

function Login() {
  const [messageValidationField, setMessageValidationField] = useState({});
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  // console.log(JSON.parse(Cookies.get("user")));

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value || null;
    const password = e.target.password.value || null;

    const data = {
      email,
      password,
    };

    Cookies.set("user", data, { expires: 1, secure: true });

    postLogin(
      (dataAuth) => {
        console.log(dataAuth);
        setMessageAlert("Berhasil Login");
        setShowModalAlert(true);
        Cookies.set("user", JSON.stringify(dataAuth), {
          expires: 1,
          secure: true,
        });
      },
      (errors) => {
        if (typeof errors == "object") {
          setMessageValidationField(errors);
        } else if (typeof errors == "string") {
          setMessageAlert(errors);
          setShowModalAlert(true);
        }
      },
      data
    );
  };
  return (
    <div className="bg-[#FFF7D4]">
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="email"
            name="email"
            message={messageValidationField?.Email}
            placeholder="Masukkan Email"
          >
            Email
          </Input>
        </div>
        <div>
          <Input
            type="password"
            name="password"
            message={messageValidationField?.Password}
            placeholder="Masukkan Password"
          >
            Password
          </Input>
        </div>
        <Button type="submit">Login</Button>
      </form>
      <Modal
        onClose={() => {
          setShowModalAlert(false);
          location.reload();
        }}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageAlert}
      </Modal>
    </div>
  );
}

export default Login;
