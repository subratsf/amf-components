/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { AuthUiDataHelper } from '@advanced-rest-client/base/api.js';
import CustomAuth from './auth-ui/CustomAuth.js';
import ApiKeyAuth from './auth-ui/ApiKeyAuth.js';
import PassThroughAuth from './auth-ui/PassThroughAuth.js';
import OAuth2Auth from './auth-ui/OAuth2Auth.js';
import OAuth1Auth from './auth-ui/OAuth1Auth.js';

/** @typedef {import('@advanced-rest-client/base').AuthUiInit} AuthUiInit */
/** @typedef {import('../elements/ApiAuthorizationMethodElement').default} ApiAuthorizationElement */

export class ApiAuthDataHelper extends AuthUiDataHelper {
  /**
   * @param {ApiAuthorizationElement} element
   * @param {AuthUiInit} init
   */
  static setupCustom(element, init) {
    const i = new CustomAuth(init);
    i.security = element.security;
    i.descriptionOpened = element.descriptionOpened;
    i.globalCache = element.globalCache;
    i.anypoint = element.anypoint;
    return i;
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {CustomAuth} ui
   */
  static populateCustom(element, ui) {
    // ...
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {AuthUiInit} init
   */
  static setupApiKey(element, init) {
    const i = new ApiKeyAuth(init);
    i.security = element.security;
    i.globalCache = element.globalCache;
    return i;
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {ApiKeyAuth} ui
   */
  static populateApiKey(element, ui) {
    // ...
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {AuthUiInit} init
   */
  static setupPassThrough(element, init) {
    const i = new PassThroughAuth(init);
    i.security = element.security;
    i.descriptionOpened = element.descriptionOpened;
    i.globalCache = element.globalCache;
    i.anypoint = element.anypoint;
    return i;
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {PassThroughAuth} ui
   */
  static populatePassThrough(element, ui) {
    // ...
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {AuthUiInit} init
   */
  static setupOauth2(element, init) {
    const i = new OAuth2Auth(init);
    i.security = element.security;
    i.globalCache = element.globalCache;
    // @ts-ignore
    AuthUiDataHelper.setOAuth2Values(element, init);
    return i;
  }

  /**
   * @param {ApiAuthorizationElement} element
   * @param {AuthUiInit} init
   * @returns {any}
   */
  static setupOauth1(element, init) {
    // @ts-ignore
    const i = new OAuth1Auth(init);
    i.security = element.security;
    // @ts-ignore
    AuthUiDataHelper.setupOauth1(element, init);
    return i;
  }
}
