import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import SitePolicy from './components/home/Home'
import LogIn from './components/login/LogIn'
import NewUser from './components/newUser/NewUser'
import Department from './components/department/Department'
import Cart from './components/cart/Cart'
import Payment from './components/payments/Payment'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { FaBeer } from 'react-icons/fa';
import { IoIosCart } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { GiFruitTree } from "react-icons/gi";
import { FaCarrot } from "react-icons/fa";
import { BiFridge } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { BsFillPersonCheckFill } from "react-icons/bs";



function App() {
  const path = useLocation().pathname;
  const [effective, seteffective] = useState(path);
  const [userName, setsUserName] = useState();
  const [updateUser, setUpdateUser] = useState(false);

  function handleSignOut() {
    handleClose();
    localStorage.name = " ";
    localStorage.email = " ";
    localStorage.status = false;
  }
  useEffect(() => {
    setsUserName(localStorage.name)
  }, [updateUser])


  function showUser() {
    if (localStorage.status == "true") {
      handleShow();
    }

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Provider store={store}>
      <div className="App">
        <div><ul>
          <li>
            <li>
              <Link to='./' onClick={() => seteffective("/")} className={effective === "/" ? "active" : "notActive"}><FaHome /> Home</Link>


            </li>
            <Link to='/LogIn' onClick={() => seteffective("/LogIn")} className={effective === "/LogIn" ? "active" : "notActive"}><BsPerson /> Log in </Link>
            <Link to='/Fruit' onClick={() => seteffective("/Fruit")} className={effective === "/Fruit" ? "active" : "notActive"}><GiFruitTree /> Fruit</Link>
            <Link to='/Vegtables' onClick={() => seteffective("/Vegtables")} className={effective === "/Vegtables" ? "active" : "notActive"}><FaCarrot /> Vegtables</Link>
            <Link to='/Refrigerated' onClick={() => seteffective("/Refrigerated")} className={effective === "/Refrigerated" ? "active" : "notActive"}><BiFridge /> Refrigerated</Link>
            <Link to='/Cart' onClick={() => seteffective("/Cart")} className={effective === "/Cart" ? "active" : "notActive"}>  <IoIosCart /> Cart</Link>
            {/* <div to='/Cart' onClick={() => seteffective("/Cart")}className="sighOut" >hi</div> */}
            <div className='userNameMe' onClick={() => showUser()}> Hello {userName} <BsFillPersonCheckFill /></div>
            <>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>  {localStorage.name}</Modal.Body>
              <Modal.Body>  {localStorage.email} </Modal.Body>
              <Modal.Footer>
                <button variant="secondary" onClick={() => { handleSignOut(); setUpdateUser(!updateUser); }}>
                  sign out
          </button>
              </Modal.Footer>
            </Modal>

            </>

          </li>

        </ul></div>
        <div></div><Switch>
          <Route exact path="/">
            <SitePolicy />
          </Route>
          <Route path="/NewUser">
            <NewUser onUpdate={() => setUpdateUser(!updateUser)} />
          </Route>
          <Route path="/LogIn">
            <LogIn onUpdate={() => setUpdateUser(!updateUser)} />
          </Route>
          <Route path='/LogIn' render={(props) => (<Department {...props} title="Fruit" />)} />
          <Route path="/payments" render={(props) => (<Payment onUpdate={() => setUpdateUser(!updateUser)}{...props} />)} />
          <Route path='/Fruit' render={(props) => (<Department {...props} title="Fruit" />)} />
          <Route path='/Vegtables' render={(props) => (<Department {...props} title="Vegtables" />)} />
          <Route path='/Refrigerated' render={(props) => (<Department {...props} title="Refrigerated" />)} />
          <Route path="/Cart">
            <Cart onUpdate={() => setUpdateUser(!updateUser)} />
          </Route>
        </Switch>

      </div>

    </Provider>
  );
}

export default App;

