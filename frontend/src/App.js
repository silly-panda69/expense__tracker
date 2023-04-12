import React, { useContext } from 'react';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Navbar from './components/Navbar';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const {user}=useContext(AuthContext);
  return (
    <div className="vh-100">
      <Router>
        <Navbar></Navbar>
            <Routes>
              <Route exact path='/' element={user?<HomePage></HomePage>:<Navigate to={'/login'}></Navigate>}></Route>
              <Route exact path='/transactions' element={user?<Transactions></Transactions>:<Navigate to={'/login'}></Navigate>}></Route>
              <Route exact path='/login'element={!user?<Login></Login>:<Navigate to={'/'}></Navigate>}></Route>
              <Route exact path='/signin' element={!user?<Signin></Signin>:<Navigate to={'/'}></Navigate>}></Route>
            </Routes>
      </Router>
    </div>
  );
}

export default App;
