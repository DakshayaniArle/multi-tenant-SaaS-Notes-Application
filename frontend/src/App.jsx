import Login from "./pages/Login"
import Notes from "./pages/Notes"
import Upgrade from "./pages/Upgrade"
import ProtectedRoute from "./Components/Protected"
import {Routes,Route} from "react-router-dom"
import { Fragment } from "react"
import InviteUserPage from "./pages/InviteUserPage"

function App() {

  return (
    <Fragment>
       <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upgrade"
        element={
          <ProtectedRoute>
            <Upgrade />
          </ProtectedRoute>
        }
      />
       <Route
          path="/invite"
          element={
            <ProtectedRoute role="Admin">
              <InviteUserPage />
            </ProtectedRoute>
          }
        />
    </Routes> 

    </Fragment>
  )
}

export default App
