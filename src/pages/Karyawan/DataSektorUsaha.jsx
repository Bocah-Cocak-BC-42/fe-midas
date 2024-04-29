import Button from "../../components/Button"
import Table from "../../components/Table"

function DataSektorUsaha() {
  return (
    <>
        <Button
            onClick={() => {

            }}>
            Tambah Sektor Usaha
        </Button>
        <div className="rounded-md border mt-4 shadow">
            <Table 
                tableHeaders={[]}
            />
        </div>
    </>
  )
}

export default DataSektorUsaha