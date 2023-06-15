import StarSigns from "./pages/StarSigns.tsx";
import Result from './pages/Result.tsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

function App() {
    return (
        <RouterProvider
            router={
                createBrowserRouter([
                    {
                        path: "/",
                        element: <StarSigns />,
                    },
                    {
                        path: "/result",
                        element: <Result />,
                    },
                ])
            }
        />
    )
}

export default App
