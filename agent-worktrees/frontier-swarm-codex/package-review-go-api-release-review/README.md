# @shapeshift-labs/frontier-lang-go

Go source-language importer package for Frontier Lang semantic source documents.

Wraps the compiler Go AST native importer with package-level metadata, import helpers, and semantic sidecar generation for go/ast File or Package trees.

## Usage

```js
import { importGoSource, createGoSemanticImportSidecar } from '@shapeshift-labs/frontier-lang-go';

const imported = await importGoSource({
  sourcePath: 'src/todo.go',
  sourceText: "package todo\n\nfunc addTodo(title string) {}\n",
  ast: {
    kind: 'File',
    Name: { kind: 'Ident', Name: 'todo' },
    Decls: [{
      kind: 'FuncDecl',
      Name: { kind: 'Ident', Name: 'addTodo' },
      Type: { kind: 'FuncType' },
      Body: { kind: 'BlockStmt' }
    }]
  }
});

const sidecar = await createGoSemanticImportSidecar({
  sourcePath: 'src/todo.go',
  sourceText: "package todo\n\nfunc addTodo(title string) {}\n",
  ast: {
    kind: 'File',
    Name: { kind: 'Ident', Name: 'todo' },
    Decls: [{
      kind: 'FuncDecl',
      Name: { kind: 'Ident', Name: 'addTodo' },
      Type: { kind: 'FuncType' },
      Body: { kind: 'BlockStmt' }
    }]
  }
});

console.log(imported.metadata.astFormat);
console.log(sidecar.symbols.map((symbol) => symbol.name));
```

This package expects a caller-owned parser AST, parser module, or parser function. It records exact-parser-AST metadata and semantic sidecars for merge review; it does not claim full type, build-system, macro, generator, or runtime semantics unless those are provided as evidence.

## API

- `createGoNativeImporterAdapter(options)`: create the package-level native importer adapter.
- `importGoSource(input, options)`: import source plus a native AST into a Frontier native import result.
- `createGoSemanticImportSidecar(input, options)`: import source and return a semantic import sidecar suitable for swarm merge evidence.
- `GoLanguagePackage`: package metadata for release-train and coordinator tooling.

## Benchmarks

Run the package-local benchmark with:

```sh
npm run bench
```

These measurements exercise only this package's importer wrapper and semantic sidecar helpers.
