/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import Oauth1, { defaultSignatureMethods } from '@advanced-rest-client/app/src/elements/authorization/ui/OAuth1.js';
import { ns } from '../../helpers/Namespace.js';

const securityValue = Symbol("securityValue");
const apiValue = Symbol("apiValue");

/** @typedef {import('../../helpers/api').ApiSecurityOAuth1Settings} ApiSecurityOAuth1Settings */
/** @typedef {import('../../helpers/api').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('../../helpers/amf').DomainElement} DomainElement */

export default class OAuth1Auth extends Oauth1 {
  /**
   * @returns {ApiParametrizedSecurityScheme}
   */
  get security() {
    return this[securityValue];
  }

  /**
   * @param {ApiParametrizedSecurityScheme} value
   */
  set security(value) {
    const old = this[securityValue];
    if (old === value) {
      return;
    }
    this[securityValue] = value;
    this.initializeApiModel();
  }

  /**
   * @returns {DomainElement}
   */
  get amf() {
    return this[apiValue];
  }

  /**
   * @param {DomainElement} value
   */
  set amf(value) {
    const old = this[apiValue];
    if (old === value) {
      return;
    }
    this[apiValue] = value;
    this.initializeApiModel();
  }

  reset() {
    this.signatureMethods = defaultSignatureMethods;
    // @ts-ignore
    this.requestUpdate();
    // @ts-ignore
    this.notifyChange();
  }

  initializeApiModel() {
    const { amf, security } = this;
    if (!amf || !security) {
      this.reset();
      return;
    }
    if (!security.types.includes(ns.aml.vocabularies.security.ParametrizedSecurityScheme)) {
      this.reset();
      return;
    }
    const { scheme } = security;
    if (!scheme) {
      this.reset();
      return;
    }
    const { type } = scheme;
    if (!type || type !== 'OAuth 1.0') {
      this.reset();
      return;
    }
    const config = /** @type ApiSecurityOAuth1Settings */ (scheme.settings);
    if (!config) {
      this.reset();
      return;
    }
    
    this.requestTokenUri = config.requestTokenUri;
    this.authorizationUri = config.authorizationUri;
    this.accessTokenUri = config.tokenCredentialsUri;
    const { signatures } = config;
    if (!signatures || !signatures.length) {
      this.reset();
    } else {
      this.signatureMethods = signatures;
    }
    // @ts-ignore
    this.requestUpdate();
    // @ts-ignore
    this.notifyChange();
  }
}
