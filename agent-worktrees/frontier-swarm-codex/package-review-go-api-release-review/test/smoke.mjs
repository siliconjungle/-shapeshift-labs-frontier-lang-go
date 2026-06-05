import assert from 'node:assert/strict';
import {
  GoLanguagePackage,
  GoParserAstFormat,
  GoSourceLanguage,
  createGoNativeImporterAdapter,
  importGoSource,
  createGoSemanticImportSidecar
} from '../dist/index.js';

const ast = {
  kind: 'File',
  Name: { kind: 'Ident', Name: 'todo' },
  Decls: [{
    kind: 'FuncDecl',
    Name: { kind: 'Ident', Name: 'addTodo' },
    Type: { kind: 'FuncType' },
    Body: { kind: 'BlockStmt' }
  }]
};

const adapter = createGoNativeImporterAdapter();
assert.equal(adapter.language, GoSourceLanguage);
assert.equal(GoLanguagePackage.parserAstFormat, GoParserAstFormat);

const imported = await importGoSource({
  sourcePath: 'src/todo.go',
  sourceText: "package todo\n\nfunc addTodo(title string) {}\n",
  ast
});

assert.equal(imported.adapter.parser, 'go/parser');
assert.equal(imported.metadata.astFormat, 'go-ast');
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'addTodo' && symbol.kind === 'function'), true);
assert.equal(imported.metadata.nativeImportLossSummary.exactAst, true);

const sidecar = await createGoSemanticImportSidecar({
  sourcePath: 'src/todo.go',
  sourceText: "package todo\n\nfunc addTodo(title string) {}\n",
  ast
}, { id: 'go-sidecar', regionPrefix: 'go' });

assert.equal(sidecar.id, 'go-sidecar');
assert.equal(sidecar.symbols.some((symbol) => symbol.name === 'addTodo'), true);
console.log('@shapeshift-labs/frontier-lang-go smoke ok');
