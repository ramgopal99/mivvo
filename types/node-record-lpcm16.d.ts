declare module 'node-record-lpcm16' {
  interface RecordOptions {
    channels?: number;
    sampleRate?: number;
    audioType?: string;
    threshold?: number;
    silence?: string;
    device?: string | null;
  }

  interface Recording {
    stream(): NodeJS.ReadableStream;
    stop(): void;
  }

  interface RecorderModule {
    record(options?: RecordOptions): Recording;
  }

  const recorder: RecorderModule;
  export = recorder;
}
