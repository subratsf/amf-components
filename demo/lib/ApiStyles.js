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

body.styled.api.dark {
  --code-background-color: #f5f7f9;
  --code-type-boolean-value-color: #F07178;
  --code-type-number-value-color: #F78C6A;
  --code-type-text-value-color: #C3E88D;
  --code-property-value-color: #F07178;
  --code-operator-value-background-color: transparent;
}

body.styled.api.dark api-navigation {
  --http-method-label-get-background-color: rgb(0, 128, 0);
  --http-method-label-get-color: #fff;
  --http-method-label-post-background-color: rgb(33, 150, 243);
  --http-method-label-post-color: #fff;
  --http-method-label-put-background-color: rgb(255, 165, 0);
  --http-method-label-put-color: fff;
  --http-method-label-delete-background-color: rgb(244, 67, 54);
  --http-method-label-delete-color: fff;
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
