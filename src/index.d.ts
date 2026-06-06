import type {
  GoAstNativeImporterAdapterOptions,
  NativeImporterAdapter,
  NativeImporterAdapterImportResult,
  NativeImportLanguageProfile,
  SemanticImportSidecar,
  SemanticImportSidecarOptions,
  UniversalCapabilityMatrix,
  UniversalCapabilityMatrixOptions
} from '@shapeshift-labs/frontier-lang-compiler';

export declare const GoSourceLanguage: 'go';
export declare const GoParser: 'go/parser';
export declare const GoParserAstFormat: 'go-ast';
export declare const GoSupportedExtensions: readonly string[];

export interface GoLanguagePackageMetadata {
  readonly packageName: '@shapeshift-labs/frontier-lang-go';
  readonly version: '0.1.1';
  readonly sourceLanguage: 'go';
  readonly parser: 'go/parser';
  readonly parserAstFormat: 'go-ast';
  readonly supportedExtensions: readonly string[];
  readonly compilerPackage: '@shapeshift-labs/frontier-lang-compiler';
  readonly compilerVersion: '0.2.39';
}

export declare const GoLanguagePackage: GoLanguagePackageMetadata;
export declare const GoCapabilityLanguageProfiles: readonly NativeImportLanguageProfile[];

export { createGoAstNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export interface GoSourceImportInput {
  readonly sourceText?: string;
  readonly sourcePath?: string;
  readonly sourceHash?: string;
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly adapter?: NativeImporterAdapter;
  readonly importerOptions?: GoAstNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
  readonly evidence?: readonly unknown[];
  readonly metadata?: Record<string, unknown>;
  readonly ast?: unknown;
  readonly file?: unknown;
  readonly sourceFile?: unknown;
  readonly package?: unknown;
}

export interface GoSourceImportOptions {
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly importerOptions?: GoAstNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
}

export interface GoSemanticImportSidecarOptions extends GoSourceImportOptions {
  readonly sidecarOptions?: SemanticImportSidecarOptions;
  readonly id?: string;
  readonly generatedAt?: number;
  readonly regionPrefix?: string;
}

export interface GoLanguageCapabilityMatrixOptions extends UniversalCapabilityMatrixOptions {
  readonly importerOptions?: GoAstNativeImporterAdapterOptions;
}

export declare function createGoNativeImporterAdapter(options?: GoAstNativeImporterAdapterOptions): NativeImporterAdapter;
export declare function createGoLanguageCapabilityMatrix(options?: GoLanguageCapabilityMatrixOptions): UniversalCapabilityMatrix;
export declare function importGoSource(input?: GoSourceImportInput, options?: GoSourceImportOptions): Promise<NativeImporterAdapterImportResult>;
export declare function createGoSemanticImportSidecar(input?: GoSourceImportInput, options?: GoSemanticImportSidecarOptions): Promise<SemanticImportSidecar>;
