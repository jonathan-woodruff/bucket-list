import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Register from './pages/register.jsx';
import { useSelector } from 'react-redux';

const PrivateRoutes =  () => {
  const { isAuth } = useSelector(state => state.auth);
  return ( //Outlet is the respective child element of Private Routes. For example, below you nest List under PrivateRoutes, so Outlet would be List in that case.
    <>
      { isAuth ? <Outlet /> : <Navigate to='/register'/> }
    </>
  );
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);
  return (
    <>
      { !isAuth ? <Outlet /> : <Navigate to='/register'/> }
    </>
  );
};


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <PrivateRoutes /> } >
          
        </Route>

        <Route element={ <RestrictedRoutes /> } >
          <Route path='/register' element={ <Register /> } />
          <Route path='/' element={ <Register /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;