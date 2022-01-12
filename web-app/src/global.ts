import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* BODY */
  body {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.darkText};
    font-size: 0.875rem;
    height: 100vh;
    width: 100%;
    font-family: Noto Sans !important;
  }

  #root{
      height: 100%;
      overflow-x: hidden;
  }
  /* END OF BODY */

  /* FORMS */
  .ui.form .field .ui.input input, .ui.form .fields .field .ui.input input, .ui.form textarea,
  .ui.form textarea:focus{
    background: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.borderColor};
    color:  ${({ theme }) => theme.darkText};
  }

  .ui.form .field>label{
    color:  ${({ theme }) => theme.darkText};
  }

  .ui.inline.dropdown .menu {
    cursor: auto;
    margin-top: 0.21428571em;
    border-radius: 1rem;
    padding: 1rem;
  }

  .ui.dropdown .menu>.item{
    color: ${({ theme }) => theme.dropdownColor} !important;
  }

  
  .ui.dropdown .menu{
    background: ${({ theme }) => theme.dropdownBackground};
    left: unset;
    right: 0;
  }

  .ui.dropdown .menu .selected.item, .ui.dropdown.selected {
      background: unset;
      color: unset;
      border-radius: unset;
  }

  .ui.dropdown .menu>.item:hover {
    background: ${({ theme }) => theme.hoverColor};
    color: ${({ theme }) => theme.dropdownColorHover}
    border-radius: 0.8rem;
    z-index: 13;
  }

  .user-avatar.ui.dropdown .menu > .item:last-child {
      color: red !important;
      border-top: 1px solid #e0e0e0 !important;
  }
  /* END OF FORMS */

  /* CARDS */
  .ui.card>.extra, .ui.cards>.card>.extra{
    border-top: 1px solid #E0E0E0 !important;
  }



  /* END OF  CARDS */
`;
