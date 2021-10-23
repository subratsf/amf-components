import { assert } from '@open-wc/testing';
import { ApiEventTypes } from  '../../index.js';
import { ensureUnique } from './EventHelper.js';

describe('ApiEventTypes', () => {
  describe('Api', () => {
    it('has Api namespace', () => {
      assert.typeOf(ApiEventTypes.Api, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Api = { read: '' };
      });
    });

    [
      ['summary', 'amfstoreapisummary'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Api[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Api', ApiEventTypes.Api);
    });
  });

  describe('Endpoint', () => {
    it('has Endpoint namespace', () => {
      assert.typeOf(ApiEventTypes.Endpoint, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Endpoint = { read: '' };
      });
    });

    [
      ['get', 'amfstoreendpointget'],
      ['byPath', 'amfstoreendpointbypath'],
      ['list', 'amfstoreendpointlist'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Endpoint[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Endpoint', ApiEventTypes.Endpoint);
    });
  });

  describe('Navigation', () => {
    it('has Navigation namespace', () => {
      assert.typeOf(ApiEventTypes.Navigation, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Navigation = { read: '' };
      });
    });

    [
      ['apiNavigate', 'apinavigate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Navigation[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Navigation', ApiEventTypes.Navigation);
    });
  });

  describe('Server', () => {
    it('has Server namespace', () => {
      assert.typeOf(ApiEventTypes.Server, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Server = { read: '' };
      });
    });

    [
      ['serverChange', 'apiserverchanged'],
      ['serverCountChange', 'serverscountchanged'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Server[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Server', ApiEventTypes.Server);
    });
  });

  describe('Security', () => {
    it('has Security namespace', () => {
      assert.typeOf(ApiEventTypes.Security, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Security = { read: '' };
      });
    });

    [
      ['settingsChanged', 'securitysettingsinfochanged'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Security[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Security', ApiEventTypes.Security);
    });
  });

  describe('Request', () => {
    it('has Request namespace', () => {
      assert.typeOf(ApiEventTypes.Request, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Request = { read: '' };
      });
    });

    [
      ['apiRequest', 'apirequest'],
      ['apiRequestLegacy', 'api-request'],
      ['abortApiRequest', 'apiabort'],
      ['abortApiRequestLegacy', 'abort-api-request'],
      ['apiResponse', 'apiresponse'],
      ['apiResponseLegacy', 'api-response'],
      ['redirectUriChange', 'oauth2redirecturichange'],
      ['redirectUriChangeLegacy', 'oauth2-redirect-uri-changed'],
      ['populateAnnotatedFields', 'populateannotatedfields'],
      ['populateAnnotatedFieldsLegacy', 'populate_annotated_fields'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Request[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Request', ApiEventTypes.Request);
    });
  });

  describe('Reporting', () => {
    it('has Reporting namespace', () => {
      assert.typeOf(ApiEventTypes.Reporting, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Reporting = { read: '' };
      });
    });

    [
      ['error', 'apierror'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Reporting[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Reporting', ApiEventTypes.Reporting);
    });
  });

  describe('Telemetry', () => {
    it('has Telemetry namespace', () => {
      assert.typeOf(ApiEventTypes.Telemetry, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Telemetry = { read: '' };
      });
    });

    [
      ['view', 'telemetryscreenview'],
      ['event', 'telemetryevent'],
      ['exception', 'telemetryexception'],
      ['social', 'telemetrysocial'],
      ['timing', 'telemetrytiming'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Telemetry[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Telemetry', ApiEventTypes.Telemetry);
    });
  });

  describe('Store', () => {
    it('has Store namespace', () => {
      assert.typeOf(ApiEventTypes.Store, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        ApiEventTypes.Store = { read: '' };
      });
    });

    [
      ['graphChange', 'apistoregraphchange'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(ApiEventTypes.Store[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('ApiEventTypes.Store', ApiEventTypes.Store);
    });
  });
});
