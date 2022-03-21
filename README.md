# calc-js

## todo

- [x] +、-、*、/
- [ ]  括号


## example
```js
let lexer = new Lexer("2*2/4+1+120*2+3*3");
tokens = lexer.parser();
parser = new Parser(tokens)
let ast = parser.nextExpression()
console.log(ast.value())

```

### 输出

```bash
> let lexer = new Lexer("2*2/4+1+120*2+3*3");
2*2/4+1+120*2+3*3
undefined
> tokens = lexer.parser();
[ Token { type: 1, text: '2', priority: undefined },
  Token { type: 5, text: '*', priority: 1 },
  Token { type: 1, text: '2', priority: undefined },
  Token { type: 6, text: '/', priority: 1 },
  Token { type: 1, text: '4', priority: undefined },
  Token { type: 3, text: '+', priority: 0 },
  Token { type: 1, text: '1', priority: undefined },
  Token { type: 3, text: '+', priority: 0 },
  Token { type: 1, text: '120', priority: undefined },
  Token { type: 5, text: '*', priority: 1 },
  Token { type: 1, text: '2', priority: undefined },
  Token { type: 3, text: '+', priority: 0 },
  Token { type: 1, text: '3', priority: undefined },
  Token { type: 5, text: '*', priority: 1 },
  Token { type: 1, text: '3', priority: undefined } ]
> parser = new Parser(tokens)
Parser {
  tokens:
   [ Token { type: 1, text: '2', priority: undefined },
     Token { type: 5, text: '*', priority: 1 },
     Token { type: 1, text: '2', priority: undefined },
     Token { type: 6, text: '/', priority: 1 },
     Token { type: 1, text: '4', priority: undefined },
     Token { type: 3, text: '+', priority: 0 },
     Token { type: 1, text: '1', priority: undefined },
     Token { type: 3, text: '+', priority: 0 },
     Token { type: 1, text: '120', priority: undefined },
     Token { type: 5, text: '*', priority: 1 },
     Token { type: 1, text: '2', priority: undefined },
     Token { type: 3, text: '+', priority: 0 },
     Token { type: 1, text: '3', priority: undefined },
     Token { type: 5, text: '*', priority: 1 },
     Token { type: 1, text: '3', priority: undefined } ],
  position: 0,
  readPosition: 0,
  length: 15,
  Expressions: [] }
> let ast = parser.nextExpression()
undefined
> console.log(JSON.stringify([ast]))
[{"left":{"left":{"left":{"left":{"type":1,"text":"2"},"symbol":{"type":5,"text":"*","priority":1},"right":{"type":1,"text":"2"}},"symbol":{"type":6,"text":"/","priority":1},"right":{"type":1,"text":"4"}},"symbol":{"type":3,"text":"+","priority":0},"right":{"type":1,"text":"1"}},"symbol":{"type":3,"text":"+","priority":0},"right":{"left":{"left":{"type":1,"text":"120"},"symbol":{"type":5,"text":"*","priority":1},"right":{"type":1,"text":"2"}},"symbol":{"type":3,"text":"+","priority":0},"right":{"left":{"type":1,"text":"3"},"symbol":{"type":5,"text":"*","priority":1},"right":{"type":1,"text":"3"}}}}]
undefined
> console.log(ast.value())
251

```