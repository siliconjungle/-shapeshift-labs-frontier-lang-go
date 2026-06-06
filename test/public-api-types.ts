import {
  GoLanguagePackage,
  createGoNativeImporterAdapter,
  createGoLanguageCapabilityMatrix,
  importGoSource,
  createGoSemanticImportSidecar
} from '../src/index.js';
import type {
  GoLanguageCapabilityMatrixOptions,
  GoSourceImportInput,
  GoSourceImportOptions,
  GoSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter, UniversalCapabilityMatrix } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createGoNativeImporterAdapter();
const input: GoSourceImportInput = { sourceText: '', ast: {} };
const options: GoSourceImportOptions = { adapterOptions: {} };
const capabilityOptions: GoLanguageCapabilityMatrixOptions = { targets: ['typescript'] };
const sidecarOptions: GoSemanticImportSidecarOptions = {
  id: 'sidecar',
  generatedAt: 1710000000000,
  regionPrefix: 'src',
  sidecarOptions: {
    id: 'nested-sidecar',
    generatedAt: 1710000000001
  }
};
const packageName: '@shapeshift-labs/frontier-lang-go' = GoLanguagePackage.packageName;
const capability: UniversalCapabilityMatrix = createGoLanguageCapabilityMatrix(capabilityOptions);

void adapter;
void input;
void options;
void capabilityOptions;
void capability;
void sidecarOptions;
void packageName;
void importGoSource(input, options);
void createGoSemanticImportSidecar(input, sidecarOptions);
