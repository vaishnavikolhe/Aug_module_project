import LoginForm from "./components/login"
import { Routes,Route } from "react-router-dom";
import RegisterForm from "./components/register";
import DashboardPage from "./components/dashboard";
import UpdateBookForm from "./components/UpdateBookForm";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<h1>Goto /register</h1>}/> */}
        <Route path="/" element={<RegisterForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/updatebook/:id" element={<UpdateBookForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
