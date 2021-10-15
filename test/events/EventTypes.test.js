import { assert } from '@open-wc/testing';
import { EventTypes } from  '../../index.js';
import { ensureUnique } from './EventHelper.js';

describe('EventTypes', () => {
  describe('Api', () => {
    it('has Api namespace', () => {
      assert.typeOf(EventTypes.Api, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Api = { read: '' };
      });
    });

    [
      ['summary', 'amfstoreapisummary'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Api[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Api', EventTypes.Api);
    });
  });

  describe('Endpoint', () => {
    it('has Endpoint namespace', () => {
      assert.typeOf(EventTypes.Endpoint, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Endpoint = { read: '' };
      });
    });

    [
      ['get', 'amfstoreendpointget'],
      ['byPath', 'amfstoreendpointbypath'],
      ['list', 'amfstoreendpointlist'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Endpoint[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Endpoint', EventTypes.Endpoint);
    });
  });

  describe('Navigation', () => {
    it('has Navigation namespace', () => {
      assert.typeOf(EventTypes.Navigation, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Navigation = { read: '' };
      });
    });

    [
      ['apiNavigate', 'apinavigate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Navigation[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Navigation', EventTypes.Navigation);
    });
  });

  describe('Server', () => {
    it('has Server namespace', () => {
      assert.typeOf(EventTypes.Server, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Server = { read: '' };
      });
    });

    [
      ['serverChange', 'apiserverchanged'],
      ['serverCountChange', 'serverscountchanged'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Server[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Server', EventTypes.Server);
    });
  });

  describe('Security', () => {
    it('has Security namespace', () => {
      assert.typeOf(EventTypes.Security, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Security = { read: '' };
      });
    });

    [
      ['settingsChanged', 'securitysettingsinfochanged'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Security[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Security', EventTypes.Security);
    });
  });

  describe('Request', () => {
    it('has Request namespace', () => {
      assert.typeOf(EventTypes.Request, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Request = { read: '' };
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
        assert.equal(EventTypes.Request[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Request', EventTypes.Request);
    });
  });

  describe('Reporting', () => {
    it('has Reporting namespace', () => {
      assert.typeOf(EventTypes.Reporting, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Reporting = { read: '' };
      });
    });

    [
      ['error', 'apierror'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Reporting[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Reporting', EventTypes.Reporting);
    });
  });

  describe('Telemetry', () => {
    it('has Telemetry namespace', () => {
      assert.typeOf(EventTypes.Telemetry, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Telemetry = { read: '' };
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
        assert.equal(EventTypes.Telemetry[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Telemetry', EventTypes.Telemetry);
    });
  });

  describe('Store', () => {
    it('has Store namespace', () => {
      assert.typeOf(EventTypes.Store, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        EventTypes.Store = { read: '' };
      });
    });

    [
      ['graphChange', 'apistoregraphchange'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(EventTypes.Store[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('EventTypes.Store', EventTypes.Store);
    });
  });
});
