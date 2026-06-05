import assert from 'node:assert/strict';
import { importGoSource, createGoSemanticImportSidecar } from '../dist/index.js';

for (let i = 0; i < 40; i += 1) {
  const ast = {
    kind: 'File',
    Name: { kind: 'Ident', Name: 'todo' },
    Decls: [{ kind: 'FuncDecl', Name: { kind: 'Ident', Name: `addTodo${i}` }, Type: { kind: 'FuncType' }, Body: { kind: 'BlockStmt' } }]
  };
  const imported = await importGoSource({
    sourcePath: `src/todo${i}.go`,
    sourceText: `package todo\nfunc addTodo${i}() {}`,
    ast
  });
  assert.equal(imported.metadata.astFormat, 'go-ast');
  assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === `addTodo${i}`), true);
  const sidecar = await createGoSemanticImportSidecar({
    sourcePath: `src/todo${i}.go`,
    sourceText: `package todo\nfunc addTodo${i}() {}`,
    ast
  }, { id: `go-fuzz-${i}` });
  assert.equal(sidecar.imports.length, 1);
}

console.log('@shapeshift-labs/frontier-lang-go fuzz ok');
