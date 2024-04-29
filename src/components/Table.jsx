import { Link } from "react-router-dom";
import TableActions from "./TableActions";
import Button from "./Button";

function Table(props) {
  const { tableHeaders, data, pagination, getDataByPagination, action } = props;

  return (
    <table className="border-collapse border-slate-500 w-full p-2">
      <thead className="bg-[#C07F00] text-white">
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-slate-300">
            {Object.keys(row).map((key) => {
              if (key != "id") {
                return (
                  <td className="text-center p-1" key={key}>
                    {row[key]}
                  </td>
                );
              }
            })}
            {action && (
              <td className="p-2 flex gap-2 justify-center">
                <TableActions>
                  <Button variant="warning" onClick={() => action[0].function(row.id)}>{action[0].name}</Button>
                  {/* <Button variant="info" onClick={() => console.log("delete")}>Delete</Button>
                  <Button variant="danger" onClick={() => console.log("detail")}>Detail</Button> */}
                </TableActions>
              </td>
            )}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={tableHeaders.length}>
            {/* <Pagination pagination={pagination} getData={getData} /> */}
            <div className="flex justify-between items-center">
              <span>
                Page {pagination?.pageNumber} of {pagination?.totalPages}
              </span>
              <span className="flex gap-2">
                {[...Array(pagination?.totalPages)].map((_, index) => (
                  <Link
                    key={index + 1}
                    onClick={() => getDataByPagination(index + 1)}
                    className="hover:underline hover:font-bold"
                  >
                    {index + 1}
                  </Link>
                ))}
              </span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
