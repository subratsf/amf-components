import { ArcRequest, Authorization } from '@advanced-rest-client/arc-types';
import { ApiSecurityRequirement } from '../helpers/api';
import { SecuritySelectorListItem, ApiConsoleRequest } from '../types';

export class SecurityProcessor {
  static readSecurityList(security: ApiSecurityRequirement): SecuritySelectorListItem[];
  static readSecurityListItem(item: ApiSecurityRequirement): SecuritySelectorListItem;

  /**
   * Applies authorization configuration to the API Console request object.
   */
  static applyAuthorization(request: ApiConsoleRequest, authorization: ArcRequest.RequestAuthorization): void;

  /**
   * Injects basic auth header into the request headers.
   */
  static applyBasicAuth(request: ApiConsoleRequest, config: Authorization.BasicAuthorization): void;

  /**
   * Injects oauth 2 auth header into the request headers.
   */
  static applyOAuth2(request: ApiConsoleRequest, config: Authorization.OAuth2Authorization): void;

  /**
   * Injects OpenID Connect auth header into the request headers.
   */
  static applyOpenId(request: ApiConsoleRequest, config: Authorization.OidcAuthorization): void;

  /**
   * Injects bearer auth header into the request headers.
   */
  static applyBearer(request: ApiConsoleRequest, config: Authorization.BearerAuthorization): void;

  /**
   * Injects the RAML custom configuration into the request
   */
  static applyCustomAuth(request: ApiConsoleRequest, config: Authorization.RamlCustomAuthorization): void;

  /**
   * Injects the ApiKey configuration into the request
   */
  static applyApiKeys(request: ApiConsoleRequest, config: Authorization.ApiKeyAuthorization): void;

  /**
   * Injects the PassThrough configuration into the request
   */
  static applyPassThrough(request: ApiConsoleRequest, config: Authorization.PassThroughAuthorization): void;

  /*
  @jarrodek The OAuth1 logic is enclosed in a custom element.
  I don't want to move it to a separate class and maintain to be
  able to apply here OAuth 1. So far we have no usage signs from anyone
  (and it's been years since this logic works here).
  If there's a request from a customer, in the `@advanced-rest-client/authorization`
  module create a class that extracts the logic from the oauth 1 component 
  and sign the request.
  */

  // /**
  //  * Signs the OAuth 1 request.
  //  */
  // static applyOAuth1(request: ApiConsoleRequest, config: Authorization.OAuth1Authorization): void;
}
