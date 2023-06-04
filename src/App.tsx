import { useAppSelector } from './store/hooks';
import Main from './modules/main/main';
import ErrorPage from './modules/error-page/error-page';
import Entry from './modules/entry/entry';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';

function App() {
  const { idInstance } = useAppSelector((state) => state.auth);

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route
              path="/"
              errorElement={<ErrorPage />}
              element={idInstance ? <Main /> : <Navigate to={'/entry'} />}
            />
            <Route
              path="/entry"
              errorElement={<ErrorPage />}
              element={!idInstance ? <Entry /> : <Navigate to={'/'} />}
            />
          </>
        )
      )}
    />
  );
}
export default App;
