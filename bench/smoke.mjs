import { performance } from 'node:perf_hooks';
import { importGoSource } from '../dist/index.js';

const iterations = 100;
const started = performance.now();
let symbols = 0;
for (let i = 0; i < iterations; i += 1) {
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
  symbols += imported.semanticIndex.symbols.length;
}
const elapsedMs = performance.now() - started;
console.log(JSON.stringify({
  package: '@shapeshift-labs/frontier-lang-go',
  iterations,
  elapsedMs: Number(elapsedMs.toFixed(3)),
  importsPerSecond: Number((iterations / (elapsedMs / 1000)).toFixed(2)),
  symbols
}, null, 2));
