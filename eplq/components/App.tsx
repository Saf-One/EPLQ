import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { log } from './utils/logger';
import Header from './components/Header';
import Home from './components/Home';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      log('info', 'Auth state changed', { userId: user?.uid });
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin/register" component={AdminRegister} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route 
            path="/admin/dashboard" 
            render={() => user ? <AdminDashboard /> : <Redirect to="/admin/login" />} 
          />
          <Route path="/user/register" component={UserRegister} />
          <Route path="/user/login" component={UserLogin} />
          <Route 
            path="/user/dashboard" 
            render={() => user ? <UserDashboard /> : <Redirect to="/user/login" />} 
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

