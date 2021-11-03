import { Authorization, OAuth2AuthorizeEvent, OidcAuthorizeEvent } from '@advanced-rest-client/events';
import { ReactiveMixin } from './mixins/ReactiveMixin.js';
import { RenderableMixin } from './mixins/RenderableMixin.js';

/**
 * A base class for pages build outside the LitElement. It uses `lit-html` 
 * as the template renderer.
 * 
 * The implementation (extending this class) should override the `appTemplate()`
 * function that returns the `TemplateResult` from the `lit-html` library.
 * 
 * To reflect the changed state call the `render()` function. The function schedules
 * a micro task (through `requestAnimationFrame`) to call the render function on the template.
 * 
 * More useful option is to use the `initObservableProperties()` function that accepts a list 
 * of properties set on the base class that once set triggers the render function. The setter checks
 * whether the a value actually changed. It works well for primitives but it won't work as expected
 * for complex types.
 */
export declare class ApplicationPage extends RenderableMixin(ReactiveMixin(EventTarget)) {
  /** 
   * True when the app should render mobile friendly view.
   */
  isMobile: boolean;
  redirectUri: string;
  /**
   * Initializes media queries and observers.
   */
  initMediaQueries(): void;

  oauth2authorizeHandler(e: OAuth2AuthorizeEvent): void;

  /**
   * Authorize the user using provided settings.
   *
   * @param settings The authorization configuration.
   */
  authorizeOauth2(settings: Authorization.OAuth2Authorization): Promise<Authorization.TokenInfo>;

  oidcAuthorizeHandler(e: OidcAuthorizeEvent): void;

  /**
   * Authorize the user using provided settings.
   *
   * @param settings The authorization configuration.
   */
  authorizeOidc(settings: Authorization.OAuth2Authorization): Promise<(Authorization.OidcTokenInfo|Authorization.OidcTokenError)[]>;
}
