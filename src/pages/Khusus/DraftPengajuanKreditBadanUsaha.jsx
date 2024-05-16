import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormPengajuanKreditBadanUsaha from "../../components/Form/FormPengajuanKreditBadanUsaha";
import StepNavigation from "../../components/StepNavigation";
import Cookies from "js-cookie";
import { getUserDetail } from "../../services/user.service";

function DraftPengajuanKreditBadanUsaha() {
  const [step, setStep] = useState(1);
  const [stepOptions, setStepOptions] = useState([
    "Data Badan Usaha",
    "Data Pemilik / Pengurus Badan Usaha",
    "Aset Perusahaan",
    "Pengajuan",
  ]);
  const [userDetail, setUserDetail] = useState({});

  const getUserDetailCurrentLogin = (userId) => {
    getUserDetail(
      (res) => {
        setUserDetail(res.data);
      },
      (errMessage) => {
        console.log(errMessage);
      },
      { id: userId }
    );
  };

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") ?? null);
    let userId = user?.userId;
    getUserDetailCurrentLogin(userId);
  }, []);

  return (
    <>
      <StepNavigation stepOptions={stepOptions} tab={step} />
      <div>
        <FormPengajuanKreditBadanUsaha page={step} userDetail={userDetail} />
      </div>

      <div className={`flex justify-${step == 1 ? "end" : "between"}`}>
        {step !== 1 && (
          <Button
            icon="arrow-left"
            variant="danger"
            onClick={() => setStep(step - 1)}
          >
            Kembali
          </Button>
        )}

        {step <= 3 && (
          <Button
            icon="arrow-right"
            variant="info"
            onClick={() => setStep(step + 1)}
          >
            Selanjutnya
          </Button>
        )}
        {step === 4 && (
          <Button
            type="submit"
            form="formPengajuanKreditBadanUsaha"
            icon="check"
            variant="success"
          >
            Save
          </Button>
        )}
      </div>
    </>
  );
}

export default DraftPengajuanKreditBadanUsaha;
