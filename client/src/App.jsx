import {Route,Routes} from "react-router-dom";
import { Login } from './components/screens/login';
import { Register } from './components/screens/register';
import { ForgotPassword } from './components/screens/forgot_password';
import { ResetPassword } from './components/screens/reset_password';
import { AuthorizedRoutes } from "./components/routes/authorized.route";
import { Profile } from "./components/screens/authorized_screens/user.profile";
import { NotFound } from "./components/screens/not_found";

function App() {
  return (
    <Routes>
      <Route element={<AuthorizedRoutes/>} >
        <Route path="/profile" element={Profile}/>
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:reset_token" element={<ResetPassword/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;