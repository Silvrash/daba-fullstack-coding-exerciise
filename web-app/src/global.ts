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
  }

  .ui.inline.dropdown .menu {
    cursor: auto;
    margin-top: 0.21428571em;
    border-radius: 1rem;
    padding: 1rem;
  }

  .ui.dropdown .menu>.item{
    color: #4F4F4F !important;
  }

  .ui.dropdown .menu .selected.item, .ui.dropdown.selected {
      background: unset;
      color: unset;
      border-radius: unset;
  }

  .ui.dropdown .menu>.item:hover {
    background: #F2F2F2;
    color: rgba(0,0,0,.95);
    border-radius: 0.8rem;
    z-index: 13;
  }

  .ui.card>.extra, .ui.cards>.card>.extra{
    border-top: 1px solid #E0E0E0 !important;
  }

  .user-avatar.ui.dropdown .menu > .item:last-child {
      color: red !important;
      border-top: 1px solid #e0e0e0 !important;
  }
`;
