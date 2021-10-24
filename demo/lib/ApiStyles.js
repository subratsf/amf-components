/* eslint-disable max-len */
import { css } from 'lit-element';

const style = css`
[role="main"].centered {
  max-width: 1100px;
}

api-navigation {
  width: 320px;
  min-width: 320px;
  overflow: auto;
  --method-display-selected-color: #000;
}

body.styled.api header {
  background-color: #C5E1A5;
}

h1.api-title {
  margin-right: 12px;
}

body.styled.api header anypoint-item {
  color: #000;
}

body.styled.api header anypoint-dropdown-menu {
  color: #000;
  background-color: white;
  --anypoint-dropdown-menu-label-color: #000;
  --anypoint-dropdown-menu-background-color: #fff;
}

.header-link {
  margin: 0 8px;
  color: var(--link-color);
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

@media (prefers-color-scheme: dark) {
  body.styled.api header {
    background-color: var(--secondary-background-color);
  }
}
`;
try {
  // @ts-ignore
  document.adoptedStyleSheets = document.adoptedStyleSheets.concat(style.styleSheet);
} catch (_) {
  /* istanbul ignore next */
  const s = document.createElement('style');
  s.innerHTML = style.cssText;
  document.getElementsByTagName('head')[0].appendChild(s);
}
