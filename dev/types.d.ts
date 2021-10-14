import { AmfParser } from './amf-server/AmfParser.mjs';

export interface AmfProcessItem {
  parser: AmfParser;
}

export type ProcessingStatus = 'initialized' | 'running' | 'finished' | 'failed';

export interface ParserProcessMessage {
  action: string;
  command: ContentParseCommand | unknown;
}

export interface ContentParseCommand {
  vendor: string;
  mime: string;
  content: string;
}

export interface ParserProcessResult {
  status: 'finished' | 'failed';
  result: unknown;
}
