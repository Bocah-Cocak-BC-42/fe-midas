import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";

export const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <LayoutUmum> 
            <LandingPage/>
        </LayoutUmum>,
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
]);