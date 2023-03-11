import React, { useState } from "react";
import styled from "styled-components";
import { HOME_URL, LOGIN_URL, REGISTER_URL } from "../../constants/urls";
import { Link } from "react-router-dom";
import BurgerButton from "../BurgerButtom/BurgerButtom";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <NavContenedor>
        <h2>
          Cartelera <span>Caracas</span>
        </h2>
        <div className={`links ${clicked ? "active" : ""}`}>
          <Link className="link" to={HOME_URL}>
            <span>HOME</span>
          </Link>
          <Link className="link" Link to={LOGIN_URL}>
            <span>Iniciar sesión</span>
          </Link>
          
          
          <Link className="link" to={REGISTER_URL}>
            <span>Registrarse</span>
          </Link>
        </div>
        <div className="burger">
          <BurgerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? " active" : ""}`}></BgDiv>
      </NavContenedor>
    </>
  );
}


//styles del componente navbar
const NavContenedor = styled.nav`
  h2 {
    color: white;
    font-weight: 400px;
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  span {
    font-weight: bold;
    color: #ffffff;
    /* font-size: 20px; */
  }
  padding: 0.4rem;
  background-color: #3333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;

  .link {
    color: white;
    text-decoration: none;
    margin-right: 5rem;
  }
  .link :hover {
    color: #5a0253;
  }

  .burger {
    @media (min-width: 768px) {
      display: none;
    }
  }

  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all 0.5s ease;
    .link {
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media (min-width: 768px) {
      position: initial;
      margin: 0;
      .link {
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }

  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    .link {
      font-size: 2rem;
      margin-top: 1rem;
      color: #ffffff;
    }
  }
`;

const BgDiv = styled.div`
  
  background-color: #3333;
  position: absolute;
  top: -700px;
  left: -2000px;
  width: 100%;
  height: 100%;
  z-index: -1;

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
  }
`;
