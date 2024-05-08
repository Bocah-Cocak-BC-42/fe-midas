import { Link } from "react-router-dom";
import TableActions from "./TableActions";
import Button from "./Button";

function Table(props) {
  const {
    tableHeaders,
    data,
    messageErrorEmptyData,
    pagination,
    getDataByPagination,
    actions,
  } = props;

  return (
    <table className="border-collapse border-slate-500 w-full p-2 overflow-x-auto">
      <thead className="bg-[#C07F00] text-white">
        <tr>
          {tableHeaders.map((header) => {
            if (header.code != "id") {
              return <th key={header.code}>{header.name}</th>;
            }
          })}
          {actions && <th className="text-center">Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {data.length == 0 ? (
          <tr>
            <td colSpan={tableHeaders.length} className="text-center">
              {messageErrorEmptyData}
            </td>
          </tr>
        ) : (
          data.map((row) => (
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
              {actions && (
                <td className="p-2 flex gap-2 justify-center">
                  <TableActions>
                    {actions.map((action, index) => {
                      return (
                        <Button
                          variant={action.variant}
                          onClick={() => action.function(row)}
                          key={index}
                        >
                          {action.name}
                        </Button>
                      );
                    })}
                  </TableActions>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
      {data.length != 0 && (
        <tfoot>
          <tr>
            <td colSpan={tableHeaders.length}>
              {/* <Pagination pagination={pagination} getData={getData} /> */}
              <div className="flex justify-between items-center">
                <span>
                  Page {pagination?.page} of {pagination?.totalPage}
                </span>
                <span className="flex gap-2">
                  {[...Array(pagination?.totalPage)].map((_, index) => (
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
      )}
    </table>
  );
}

export default Table;
