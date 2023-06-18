import StarSignsPage from "./pages/StarSignsPage.tsx";
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
                        element: <StarSignsPage />,
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
