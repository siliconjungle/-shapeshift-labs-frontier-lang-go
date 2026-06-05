import {
  createGoAstNativeImporterAdapter,
  createSemanticImportSidecar,
  runNativeImporterAdapter
} from '@shapeshift-labs/frontier-lang-compiler';

export const GoSourceLanguage = 'go';
export const GoParser = 'go/parser';
export const GoParserAstFormat = 'go-ast';
export const GoSupportedExtensions = Object.freeze(['.go']);

export const GoLanguagePackage = Object.freeze({
  packageName: '@shapeshift-labs/frontier-lang-go',
  version: '0.1.0',
  sourceLanguage: GoSourceLanguage,
  parser: GoParser,
  parserAstFormat: GoParserAstFormat,
  supportedExtensions: GoSupportedExtensions,
  compilerPackage: '@shapeshift-labs/frontier-lang-compiler',
  compilerVersion: '0.2.31'
});

export { createGoAstNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export function createGoNativeImporterAdapter(options = {}) {
  return createGoAstNativeImporterAdapter(options);
}

function mergeAdapterOptions(input = {}, options = {}) {
  const adapterOptions = {
    ...(options.adapterOptions ?? {}),
    ...(input.adapterOptions ?? {})
  };
  for (const alias of ['ast', 'file', 'sourceFile', 'package']) {
    if (Object.prototype.hasOwnProperty.call(input, alias)) {
      adapterOptions[alias] = input[alias];
    }
  }
  return adapterOptions;
}

function pickSidecarOptions(options = {}) {
  if (options.sidecarOptions) {
    return options.sidecarOptions;
  }
  const picked = {};
  for (const key of ['id', 'generatedAt', 'regionPrefix']) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      picked[key] = options[key];
    }
  }
  return picked;
}

export async function importGoSource(input = {}, options = {}) {
  const importerOptions = {
    ...(options.importerOptions ?? {}),
    ...(input.importerOptions ?? {})
  };
  const adapter = input.adapter ?? createGoNativeImporterAdapter(importerOptions);
  return runNativeImporterAdapter(adapter, {
    sourceText: input.sourceText ?? '',
    sourcePath: input.sourcePath,
    sourceHash: input.sourceHash,
    language: input.language ?? options.language ?? GoSourceLanguage,
    parser: input.parser ?? options.parser ?? GoParser,
    parserVersion: input.parserVersion ?? options.parserVersion,
    adapterOptions: mergeAdapterOptions(input, options),
    adapterMetadata: {
      packageName: GoLanguagePackage.packageName,
      ...(options.adapterMetadata ?? {}),
      ...(input.adapterMetadata ?? {})
    },
    evidence: input.evidence,
    metadata: input.metadata
  });
}

export async function createGoSemanticImportSidecar(input = {}, options = {}) {
  const importResult = await importGoSource(input, options);
  return createSemanticImportSidecar(importResult, pickSidecarOptions(options));
}
