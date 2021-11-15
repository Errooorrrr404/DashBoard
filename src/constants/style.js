import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

.card, .modal-content {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  `;

  export const BackgroundStyles = createGlobalStyle`

.card, .modal-content {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  body {
    align-items: center;
    background-image: url("");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  `