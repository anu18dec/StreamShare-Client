import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout/Layout.jsx";
import Home from "./routes/Home/Home.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
