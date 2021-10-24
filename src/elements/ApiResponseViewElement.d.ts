import { TemplateResult } from 'lit-element';
import { ResponseViewElement } from '@advanced-rest-client/app';
import { ArcExportFilesystemEvent } from '@advanced-rest-client/events';

export declare const saveFileHandler: unique symbol;

export declare class ApiResponseViewElement extends ResponseViewElement {
  /** 
   * Whether the response details view is opened.
   * @attribute
   */
  details: boolean;
  /** 
   * Whether the source ("raw") view is opened.
   * @attribute
   */
  source: boolean;
  /**
   * Enables Anypoint platform styles.
   * @attribute
   */
  anypoint: boolean;

  constructor();

  connectedCallback(): void;

  disconnectedCallback(): void;

  [saveFileHandler](e: ArcExportFilesystemEvent): void;

  /**
   * @param data The exported data 
   * @param mime The data content type
   * @param file The export file name
   */
  downloadFile(data: BlobPart, mime: string, file: string): void;

  render(): TemplateResult;
}
