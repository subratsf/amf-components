import { fixture, assert, html, aTimeout } from '@open-wc/testing';
import { AmfLoader } from '../AmfLoader.js';
import '../../api-security-document.js';
import { securityValue } from '../../src/elements/ApiSecurityDocumentElement.js';

/** @typedef {import('../../').ApiSecurityDocumentElement} ApiSecurityDocumentElement */
/** @typedef {import('../../').ApiParameterDocumentElement} ApiParameterDocumentElement */
/** @typedef {import('../../src/helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../../src/helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../../src/helpers/amf').SecurityRequirement} SecurityRequirement */

describe('ApiSecurityDocumentElement', () => {
  const loader = new AmfLoader();

  /**
   * @param {AmfDocument} amf
   * @param {DomainElement=} shape
   * @returns {Promise<ApiSecurityDocumentElement>}
   */
  async function amfModelFixture(amf, shape) {
    const element = await fixture(html`<api-security-document 
      .queryDebouncerTimeout="${0}" 
      .amf="${amf}" 
      .domainModel="${shape}"
    ></api-security-document>`);
    await aTimeout(0);
    return /** @type ApiSecurityDocumentElement */ (element);
  }

  /**
   * @param {AmfDocument} amf
   * @param {string=} domainId
   * @returns {Promise<ApiSecurityDocumentElement>}
   */
  async function domainIdFixture(amf, domainId) {
    const element = await fixture(html`<api-security-document 
      .queryDebouncerTimeout="${0}" 
      .amf="${amf}" 
      .domainId="${domainId}"
    ></api-security-document>`);
    await aTimeout(0);
    return /** @type ApiSecurityDocumentElement */ (element);
  }

  [false].forEach((compact) => {
    describe(compact ? 'Compact model' : 'Full model', () => {
      describe('Basic auth', () => {
        /** @type AmfDocument */
        let model;
        /** @type SecurityRequirement */
        let security;
        before(async () => {
          model = await loader.getGraph(compact, 'security-api');
          security = loader.lookupSecurity(model, 'basic');
          assert.ok(security, 'has the basic security');
        });

        describe('Schema rendering', () => {
          it('computes the [securityValue] from the passed AMF model', async () => {
            const element = await amfModelFixture(model, security);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('computes the [securityValue] from the passed domain id', async () => {
            const element = await domainIdFixture(model, security['@id']);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('renders the title', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .label');
            assert.dom.equal(node, '<span class="label">basic</span>');
          });

          it('renders the sub-header', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .sub-header');
            assert.dom.equal(node, '<p class="sub-header">Basic Authentication</p>');
          });

          it('renders the description', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.api-description arc-marked');
            assert.ok(node, 'has the documentation node');
          });

          it('renders the header', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-parameter-document');
            assert.lengthOf(nodes, 1, 'has a single header');
            assert.equal(nodes[0].parameter.name, 'Authorization', 'has the parameter definition');
          });

          it('has no responses', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-response-document');
            assert.lengthOf(nodes, 0, 'has no elements');
          });

          it('has no settings', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-controlled-by="settingsOpened"]');
            assert.notOk(node, 'has no settings section');
          });
        });

        describe('a11y', () => {
          it('is accessible', async () => {
            const element = await amfModelFixture(model, security);
            await assert.isAccessible(element, { ignoredRules: ['color-contrast'] });
          });
        });
      });

      describe('RAML custom auth', () => {
        /** @type AmfDocument */
        let model;
        /** @type SecurityRequirement */
        let security;
        before(async () => {
          model = await loader.getGraph(compact, 'security-api');
          security = loader.lookupSecurity(model, 'x-custom');
          assert.ok(security, 'has the custom security');
        });

        describe('Schema rendering', () => {
          it('computes the [securityValue] from the passed AMF model', async () => {
            const element = await amfModelFixture(model, security);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('computes the [securityValue] from the passed domain id', async () => {
            const element = await domainIdFixture(model, security['@id']);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('renders the title', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .label');
            assert.dom.equal(node, '<span class="label">x-custom</span>');
          });

          it('renders the sub-header', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .sub-header');
            assert.dom.equal(node, '<p class="sub-header">x-custom</p>');
          });

          it('renders the description', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.api-description arc-marked');
            assert.ok(node, 'has the documentation node');
          });

          it('renders the header parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="header"]'));
            assert.lengthOf(nodes, 1, 'has a single header');
            assert.equal(nodes[0].parameter.name, 'SpecialToken', 'has the parameter definition');
          });

          it('renders the query parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="query"]'));
            assert.lengthOf(nodes, 2, 'has both parameters');
            assert.equal(nodes[0].parameter.name, 'debugToken', 'has a parameter definition');
          });

          it('has the responses section', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-response-document');
            assert.lengthOf(nodes, 1, 'has a single response');

            const section = element.shadowRoot.querySelector('.status-codes-selector');
            assert.ok(section, 'has the status codes section');

            const tabs = section.querySelectorAll('anypoint-tab');
            assert.lengthOf(tabs, 2, 'has 2 defined responses')
            assert.equal(tabs[0].dataset.status, '401');
            assert.equal(tabs[1].dataset.status, '403');
          });

          it('has no settings', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-controlled-by="settingsOpened"]');
            assert.notOk(node, 'has no settings section');
          });
        });

        describe('a11y', () => {
          it('is accessible', async () => {
            const element = await amfModelFixture(model, security);
            await assert.isAccessible(element, { ignoredRules: ['color-contrast'] });
          });
        });
      });

      describe('Digest auth', () => {
        /** @type AmfDocument */
        let model;
        /** @type SecurityRequirement */
        let security;
        before(async () => {
          model = await loader.getGraph(compact, 'security-api');
          security = loader.lookupSecurity(model, 'digest');
          assert.ok(security, 'has the digest security');
        });

        describe('Schema rendering', () => {
          it('computes the [securityValue] from the passed AMF model', async () => {
            const element = await amfModelFixture(model, security);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('computes the [securityValue] from the passed domain id', async () => {
            const element = await domainIdFixture(model, security['@id']);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('renders the title', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .label');
            assert.dom.equal(node, '<span class="label">digest</span>');
          });

          it('renders the sub-header', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .sub-header');
            assert.dom.equal(node, '<p class="sub-header">Digest Authentication</p>');
          });

          it('renders the description', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.api-description arc-marked');
            assert.ok(node, 'has the documentation node');
          });

          it('has no parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-parameter-document');
            assert.lengthOf(nodes, 0);
          });

          it('has no responses', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-response-document');
            assert.lengthOf(nodes, 0, 'has no elements');
          });

          it('has no settings', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-controlled-by="settingsOpened"]');
            assert.notOk(node, 'has no settings section');
          });
        });

        describe('a11y', () => {
          it('is accessible', async () => {
            const element = await amfModelFixture(model, security);
            await assert.isAccessible(element, { ignoredRules: ['color-contrast'] });
          });
        });
      });

      describe('RAML custom auth', () => {
        /** @type AmfDocument */
        let model;
        /** @type SecurityRequirement */
        let security;
        before(async () => {
          model = await loader.getGraph(compact, 'security-api');
          security = loader.lookupSecurity(model, 'pass_through');
          assert.ok(security, 'has the custom security');
        });

        describe('Schema rendering', () => {
          it('computes the [securityValue] from the passed AMF model', async () => {
            const element = await amfModelFixture(model, security);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('computes the [securityValue] from the passed domain id', async () => {
            const element = await domainIdFixture(model, security['@id']);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('renders the title', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .label');
            assert.dom.equal(node, '<span class="label">pass_through</span>');
          });

          it('renders the sub-header', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .sub-header');
            assert.dom.equal(node, '<p class="sub-header">Pass Through</p>');
          });

          it('renders the description', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.api-description arc-marked');
            assert.ok(node, 'has the documentation node');
          });

          it('renders the header parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="header"]'));
            assert.lengthOf(nodes, 1, 'has a single header');
            assert.equal(nodes[0].parameter.name, 'api_key_pass_through', 'has the parameter definition');
          });

          it('renders the query parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="query"]'));
            assert.lengthOf(nodes, 1, 'has a single parameter');
            assert.equal(nodes[0].parameter.name, 'api-key-pass-through', 'has a parameter definition');
          });

          it('has no responses', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-response-document');
            assert.lengthOf(nodes, 0, 'has no elements');
          });

          it('has no settings', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-controlled-by="settingsOpened"]');
            assert.notOk(node, 'has no settings section');
          });
        });

        describe('a11y', () => {
          it('is accessible', async () => {
            const element = await amfModelFixture(model, security);
            await assert.isAccessible(element, { ignoredRules: ['color-contrast'] });
          });
        });
      });

      describe('OAuth 1 auth', () => {
        /** @type AmfDocument */
        let model;
        /** @type SecurityRequirement */
        let security;
        before(async () => {
          model = await loader.getGraph(compact, 'security-api');
          security = loader.lookupSecurity(model, 'oauth_1_0');
          assert.ok(security, 'has the custom security');
        });

        describe('Schema rendering', () => {
          it('computes the [securityValue] from the passed AMF model', async () => {
            const element = await amfModelFixture(model, security);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('computes the [securityValue] from the passed domain id', async () => {
            const element = await domainIdFixture(model, security['@id']);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('renders the title', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .label');
            assert.dom.equal(node, '<span class="label">oauth_1_0</span>');
          });

          it('renders the sub-header', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .sub-header');
            assert.dom.equal(node, '<p class="sub-header">OAuth 1.0</p>');
          });

          it('renders the description', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.api-description arc-marked');
            assert.ok(node, 'has the documentation node');
          });

          it('renders the header parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="header"]'));
            assert.lengthOf(nodes, 1, 'has a single header');
            assert.equal(nodes[0].parameter.name, 'Authorization', 'has the parameter definition');
          });

          it('renders the query parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="query"]'));
            assert.lengthOf(nodes, 1, 'has a single parameter');
            assert.equal(nodes[0].parameter.name, 'token', 'has a parameter definition');
          });

          it('has the responses section', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-response-document');
            assert.lengthOf(nodes, 1, 'has a single response');

            const section = element.shadowRoot.querySelector('.status-codes-selector');
            assert.ok(section, 'has the status codes section');

            const tabs = section.querySelectorAll('anypoint-tab');
            assert.lengthOf(tabs, 1, 'has 1 defined responses');
            assert.equal(tabs[0].dataset.status, '403');
          });

          it('has the settings section', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-controlled-by="settingsOpened"]');
            assert.ok(node, 'has the section');
          });

          it('has the authorization URI setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="authorization-uri"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Authorization URI', 'has the section title');
            assert.equal(node.nextElementSibling.textContent.trim(), 'http://api.domain.com/oauth1/authorize', 'has the URI value');
          });

          it('has the access token URI setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="token-uri"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Access token URI', 'has the section title');
            assert.equal(node.nextElementSibling.textContent.trim(), 'http://api.domain.com/oauth1/request_token', 'has the URI value');
          });

          it('has the token credentials URI setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="token-credentials-uri"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Token credentials URI', 'has the section title');
            assert.equal(node.nextElementSibling.textContent.trim(), 'http://api.domain.com/oauth1/access_token', 'has the URI value');
          });

          it('has the signatures setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="signatures"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Supported signatures', 'has the section title');
            const list = /** @type HTMLUListElement */ (node.nextElementSibling);
            const items = list.querySelectorAll('li');
            assert.equal(items[0].textContent.trim(), 'RSA-SHA1');
            assert.equal(items[1].textContent.trim(), 'HMAC-SHA1');
          });
        });

        describe('a11y', () => {
          it('is accessible', async () => {
            const element = await amfModelFixture(model, security);
            await assert.isAccessible(element, { ignoredRules: ['color-contrast'] });
          });
        });
      });

      describe('OAuth 2 auth', () => {
        /** @type AmfDocument */
        let model;
        /** @type SecurityRequirement */
        let security;

        describe('Basic schema rendering', () => {
          before(async () => {
            model = await loader.getGraph(compact, 'secured-api');
            security = loader.lookupSecurity(model, 'Regular OAuth 2.0 definition');
            assert.ok(security, 'has the custom security');
          });

          it('computes the [securityValue] from the passed AMF model', async () => {
            const element = await amfModelFixture(model, security);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('computes the [securityValue] from the passed domain id', async () => {
            const element = await domainIdFixture(model, security['@id']);
            assert.typeOf(element[securityValue], 'object', 'has the serialized object');
            assert.equal(element[securityValue].id, security['@id'], 'has the security value');
          });

          it('renders the title', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .label');
            assert.dom.equal(node, '<span class="label">Regular OAuth 2.0 definition</span>');
          });

          it('renders the sub-header', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.security-header .sub-header');
            assert.dom.equal(node, '<p class="sub-header">OAuth 2.0</p>');
          });

          it('renders the description', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('.api-description arc-marked');
            assert.notOk(node, 'has no documentation node');
          });

          it('renders the header parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="header"]'));
            assert.lengthOf(nodes, 1, 'has a single header');
            assert.equal(nodes[0].parameter.name, 'Authorization', 'has the parameter definition');
          });

          it('renders the query parameters', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = /** @type NodeListOf<ApiParameterDocumentElement> */ (element.shadowRoot.querySelectorAll('api-parameter-document[data-name="query"]'));
            assert.lengthOf(nodes, 1, 'has a single parameter');
            assert.equal(nodes[0].parameter.name, 'access_token', 'has a parameter definition');
          });

          it('has no responses section', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('api-response-document');
            assert.lengthOf(nodes, 0, 'has no responses');
          });

          it('has the settings section', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-controlled-by="settingsOpened"]');
            assert.ok(node, 'has the section');
          });

          it('has the access token URI setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="token-uri"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Access token URI', 'has the section title');
            assert.equal(node.nextElementSibling.textContent.trim(), 'https://token.com', 'has the URI value');
          });

          it('has the authorization URI setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="authorization-uri"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Authorization URI', 'has the section title');
            assert.equal(node.nextElementSibling.textContent.trim(), 'https://auth.com', 'has the URI value');
          });

          it('has the authorization scopes setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="authorization-scopes"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Authorization scopes', 'has the section title');
            const list = /** @type HTMLUListElement */ (node.nextElementSibling);
            const items = list.querySelectorAll('li');
            assert.equal(items[0].textContent.trim(), 'profile');
            assert.equal(items[1].textContent.trim(), 'email');
          });
        });

        describe('Authorization grants rendering', () => {
          before(async () => {
            model = await loader.getGraph(compact, 'secured-api');
            security = loader.lookupSecurity(model, 'OAuth 2 grants security');
            assert.ok(security, 'has the custom security');
          });

          it('has the authorization grants setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="authorization-grants"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Authorization grants', 'has the section title');
            const list = /** @type HTMLUListElement */ (node.nextElementSibling);
            const items = list.querySelectorAll('li');
            assert.lengthOf(items, 1, 'has a single grant type');
            assert.equal(items[0].textContent.trim(), 'authorization_code');
          });
        });

        describe('No authorization scopes', () => {
          before(async () => {
            model = await loader.getGraph(compact, 'security-api');
            security = loader.lookupSecurity(model, 'OAuth2 (no scopes)');
            assert.ok(security, 'has the custom security');
          });

          it('has np authorization scopes setting', async () => {
            const element = await amfModelFixture(model, security);
            const node = element.shadowRoot.querySelector('[data-type="authorization-scopes"]');
            assert.notOk(node, 'has no title');
          });
        });

        describe('Multiple flows', () => {
          before(async () => {
            model = await loader.getGraph(compact, 'oauth-flows');
            security = loader.lookupSecurity(model, 'oAuthSample');
            assert.ok(security, 'has the custom security');
          });

          it('has multiple flows', async () => {
            const element = await amfModelFixture(model, security);
            const nodes = element.shadowRoot.querySelectorAll('.flow-description');
            assert.lengthOf(nodes, 4, 'has 4 flows sections');
          });

          it('renders a flow title', async () => {
            const element = await amfModelFixture(model, security);
            const section = element.shadowRoot.querySelector('.flow-description');
            const title = section.querySelector('.grant-title');
            assert.dom.equal(title, '<h4 class="grant-title">Implicit</h4>');
          });

          it('has the authorization URI setting', async () => {
            const element = await amfModelFixture(model, security);
            const section = element.shadowRoot.querySelector('.flow-description');
            const node = section.querySelector('[data-type="authorization-uri"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Authorization URI', 'has the section title');
            assert.equal(node.nextElementSibling.textContent.trim(), 'https://api.example.com/oauth2/authorize', 'has the URI value');
          });

          it('has the authorization scopes setting', async () => {
            const element = await amfModelFixture(model, security);
            const section = element.shadowRoot.querySelector('.flow-description');
            const node = section.querySelector('[data-type="authorization-scopes"]');
            assert.ok(node, 'has the title');
            assert.equal(node.textContent.trim(), 'Authorization scopes', 'has the section title');
            const list = /** @type HTMLUListElement */ (node.nextElementSibling);
            const items = list.querySelectorAll('li');
            const readScope = items[0];
            assert.dom.equal(
              readScope.querySelector('.scope-name'),
              '<span class="scope-name">read_pets</span>'
            );
            assert.dom.equal(
              readScope.querySelector('.scope-description'),
              '<span class="scope-description">read your pets</span>'
            );
          });
        });

        describe('a11y', () => {
          before(async () => {
            model = await loader.getGraph(compact, 'secured-api');
          });

          it('is accessible', async () => {
            security = loader.lookupSecurity(model, 'Regular OAuth 2.0 definition');
            const element = await amfModelFixture(model, security);
            await assert.isAccessible(element, { ignoredRules: ['color-contrast'] });
          });
        });
      });
    });
  });
});
