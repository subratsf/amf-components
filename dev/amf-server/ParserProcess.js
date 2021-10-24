const amf = require('amf-client-js');
// import amf from 'amf-client-js';
amf.plugins.document.WebApi.register();
amf.plugins.document.Vocabularies.register();
amf.plugins.features.AMFValidation.register();

/** @typedef {import('../types').ParserProcessMessage} ParserProcessMessage */
/** @typedef {import('../types').ContentParseCommand} ContentParseCommand */
/** @typedef {import('../types').ParserProcessResult} ParserProcessResult */

class AmfParserProcess {
  /**
   * Handles the message from the main process.
   * @param {ParserProcessMessage} data
   */
  handleMessage(data) {
    const { action, command } = data;
    if (action === 'parse-content') {
      this.parseContent(/** @type ContentParseCommand */ (command));
      return;
    }
    process.send(/** @type  ParserProcessResult */ ({
      status: 'failed',
      result: `Unknown action: ${action}`,
    }));
  }

  /**
   * @param {ContentParseCommand} command
   */
  async parseContent(command) {
    const { content, mime, vendor } = command;
    try {
      const result = await this.doParseContent(content, mime, vendor);
      process.send(/** @type ParserProcessResult */ ({
        status: 'finished',
        result,
      }));
    } catch (e) {
      process.send(/** @type  ParserProcessResult */ ({
        status: 'failed',
        result: e.message,
      }));
    }
  }

  /**
   * @param {string} content
   * @param {string} mime
   * @param {string} vendor
   */
  async doParseContent(content, mime, vendor) {
    await amf.Core.init();
    
    const parser = amf.Core.parser(vendor, mime);
    const doc = await parser.parseStringAsync(content);
    const resolver = amf.Core.resolver(vendor);
    const resolved = resolver.resolve(doc, 'editing');
    const generator = amf.Core.generator('AMF Graph', 'application/ld+json');
    const opts = new amf.render.RenderOptions().withSourceMaps.withCompactUris;
    return generator.generateString(resolved, opts);
  }
}

const parser = new AmfParserProcess();

process.on('message', (data) => parser.handleMessage(/** @type ParserProcessMessage */ (data)));
