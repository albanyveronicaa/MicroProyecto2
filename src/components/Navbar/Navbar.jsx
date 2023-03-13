import React, { useState } from "react";
import styled from "styled-components";
import {
  HOME_URL,
  LOGIN_URL,
  REGISTER_URL,
  PROFILE_URL,
} from "../../constants/urls";
import { Link, useNavigate } from "react-router-dom";
import BurgerButton from "../BurgerButtom/BurgerButtom";
import { logout } from "../../firebase/auth/auth-service";
import { useUserContext } from "../../contexts/UserContext";

export function Navbar() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { usuario, isLoadingUser } = useUserContext();

  const handleLogout = async () => {
    await logout(() => navigate(HOME_URL));
  };

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
          {!isLoadingUser && (
            <ul className="menuList">
              {!!usuario ? (
                <>
                  <li>
                    <Link to={HOME_URL} className="link">
                      <span>Inicio</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={PROFILE_URL}>
                      
                      <span>{usuario.name}</span>
                    </Link>
                  </li>

                  <li className="menuItem">
                    <button
                      type="button"
                      
                      onClick={handleLogout}
                    >
                      <span className="logoutBtn">Salir</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={HOME_URL} className="link">
                      <span>Inicio</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={LOGIN_URL} className="link">
                      <span>Iniciar sesión</span>
                    </Link>
                  </li>

                  <li>
                    <Link to={REGISTER_URL} className="link">
                      <span>Registrarse</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        <div className="burger">
          <BurgerButton clicked={clicked} handleClick={handleClick} />
        </div>

        <BgDiv className={`initial ${clicked ? " active" : ""}`}></BgDiv>
      </NavContenedor>
    </>
  );
}

const NavContenedor = styled.nav`
  h2 {
    color: white;
    font-weight: 400;
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 5px;
  }

  span {
    font-weight: bold;
    color: #ffffff;
  }
  padding: 20px;
  background-color: #781d1c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  .link {
    color: white;
    text-decoration: none;
    margin-right: 40px;
  }

  .link :hover {
    color: #ffd33a;
  }

  .burger {
    @media (min-width: 700px) {
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
    /* transition: all .5s ease; */
    .link {
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media (min-width: 700px) {
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

  .menuList {
    display: flex;
    align-items: center;
    list-style: none;
    justify-content: center;
  }

  .menuItem {
    border-radius: 6px;
    border: 1px solid transparent;
  }

  .logoutBtn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    text-decoration: none;
    color: #ffd33a;
    background: none;
    outline: none;
    border: none;
    font-weight: 500;
    cursor: pointer;
  }
`;

const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* transition: all .6s ease ; */

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
