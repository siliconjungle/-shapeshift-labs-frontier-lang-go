import {
  GoLanguagePackage,
  createGoNativeImporterAdapter,
  importGoSource,
  createGoSemanticImportSidecar
} from '../src/index.js';
import type {
  GoSourceImportInput,
  GoSourceImportOptions,
  GoSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createGoNativeImporterAdapter();
const input: GoSourceImportInput = { sourceText: '', ast: {} };
const options: GoSourceImportOptions = { adapterOptions: {} };
const sidecarOptions: GoSemanticImportSidecarOptions = { id: 'sidecar', regionPrefix: 'src' };
const packageName: '@shapeshift-labs/frontier-lang-go' = GoLanguagePackage.packageName;

void adapter;
void input;
void options;
void sidecarOptions;
void packageName;
void importGoSource(input, options);
void createGoSemanticImportSidecar(input, sidecarOptions);
