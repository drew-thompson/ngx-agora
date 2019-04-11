export interface Schema {
  /** Name of the project. */
  project: string;

  /** Agora application ID. */
  appId: string;

  /** Version of the Agora SDK to be used. */
  version: 'latest' | '2.6.1' | '2.5.2' | '2.4.1';
}
