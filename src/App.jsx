import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return <RouterProvider router={router} />;

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route
  //         path="/admin"
  //         element={
  //           <LayoutKhusus
  //             breadcrumbs={"Data Master Bank"}
  //             navLinkActive={"Data Master"}
  //             subNavLinkActive={"Bank"}
  //           />
  //         }
  //       >
  //         <Route index path="dashboard" element={<DashboardAdmin />} />
  //         <Route
  //           path="data-master/bank"
  //           element={
  //             <DataMasterBank
  //             // breadcrumbs={setBreadcrumbs("Data Master Bank")}
  //             // navLinkActive={setNavLinkActive("Data Master")}
  //             // subNavLinkActive={setSubNavLinkActive("Bank")}
  //             />
  //           }
  //         />
  //       </Route>

  //       <Route path="*" element={<div>Page Not Found</div>} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
