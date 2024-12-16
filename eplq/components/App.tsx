import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { log } from './utils/logger';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import Header from './components/Header';
import Home from './components/Home';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import UserDashboard from './components/UserDashboard';
import './App.css';

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (user) {
      log('info', 'Auth state changed', { userId: user.uid });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="container mx-auto mt-8 text-center">Error: {error.message}</div>;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />
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
    </ErrorBoundary>
  );
}

export default App;

