import { useState } from "react";
import Button from "../../components/Button";
import FormPengajuanKreditBadanUsaha from "../../components/Form/FormPengajuanKreditBadanUsaha";
import StepNavigation from "../../components/StepNavigation";

function PengajuanKreditBadanUsaha() {
  const [step, setStep] = useState(1);
  // const [stepOptions, setStepOptions] = useState([
  //   { label: "Data Badan Usaha" },
  //   { label: "Data Pemilik / Pengurus Badan Usaha" },
  //   { label: "Aset Perusahaan" },
  //   { label: "Pengajuan" },
  // ]);
  const [stepOptions, setStepOptions] = useState([
    "Data Badan Usaha",
    "Data Pemilik / Pengurus Badan Usaha",
    "Aset Perusahaan",
    "Pengajuan",
  ]);

  return (
    <>
      <StepNavigation stepOptions={stepOptions} tab={step} />
      <div>
        <FormPengajuanKreditBadanUsaha page={step} />
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
            Ajukan
          </Button>
        )}
      </div>
    </>
  );
}

export default PengajuanKreditBadanUsaha;
