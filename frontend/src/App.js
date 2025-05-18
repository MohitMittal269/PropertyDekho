import React from 'react' 
import './App.css';
import Loginform from './Component/Loginform'
import Newaccount from './Component/Newaccount';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Postproperty from './Component/Postproperty';
import Details from './Component/Details';
import Propertylist from './Component/Propertylist';
import PropertyListBySearch from './Component/PropertyListBySearch';
import WhisList from './Component/WhisList';
import RegisteredUser from './Component/RegisteredUser';
import { ThemeProvider } from './Component/Themecontext';
import Logout from './Component/Logout';
function App() {
  
  return (
    <ThemeProvider>
      <div className="App">
      <Routes>
        <Route path='/' element={<Navbar></Navbar>}>
        <Route index element={<Propertylist />} />
        <Route path='property/:id' element={<Details></Details>}></Route>
        <Route path='property' element={<PropertyListBySearch></PropertyListBySearch>}></Route>
        </Route>
        <Route path='whislist/:id' element={<WhisList></WhisList>}></Route>
        <Route path='postproperty' element={<Postproperty></Postproperty>}></Route>
        <Route path='newaccount' element={<Newaccount></Newaccount>}></Route>
        <Route path='login' element={<Loginform></Loginform>}></Route>
        <Route path='registered' element={<RegisteredUser></RegisteredUser>}></Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
      </Routes>
    </div>
    </ThemeProvider>

    
  );
}

export default App;
