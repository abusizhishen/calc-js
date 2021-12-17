const priorityAddSub = 0
const priorityMulDiv = 1
class Token{
  constructor(type,text,priority){
    this.type = type
    this.text = text
    this.priority = priority
  }

  value(){
    return Number(this.text)
  }
}

class AstNode {
  constructor(left,symbol,right) {
    this.left = left
    this.symbol = symbol
    this.right = right
  }

  value(){
    switch (this.symbol.type) {
      case AddSymbol.type:
        return add(this.left.value(),this.right.value())
      case SubSymbol.type:
        return sub(this.left.value(),this.right.value())
      case MulSymbol.type:
        return mul(this.left.value(),this.right.value())
      case DivSymbol.type:
        return div(this.left.value(),this.right.value())
      default:
        throw ("unknown symbol: "+this.symbol.type)
    }
  }
}

const  Numeric = new Token(1,"number",)
const  StringType=new Token(2,"string")
const  AddSymbol=new Token(3,"+",priorityAddSub)
const  SubSymbol=new Token(4,"-",priorityAddSub)
const  MulSymbol=new Token(5,"*",priorityMulDiv)
const  DivSymbol=new Token(6,"/",priorityMulDiv)
const  LeftParenthesisSymbol=new Token(7,"(")
const  RightParenthesisSymbol = new Token(8,")")

class Lexer {
  constructor(code) {
    this.code = code;
    this.position = 0
    this.readPosition = 0;
    this.length = code.length
    this.ch = 0

    console.log(this.code)
  }

  parser(){
    var tokens = []
    var token = this.nextToken()
    while(token){
      tokens.push(token)
      token = this.nextToken()
    }

    return tokens
  }

  readNumeric(){
    var ch = this.readNextCh()
    var position = this.position
    while(ch !== 0){
      if (!this.isNumber(ch)) {
        break
      }
      this.position = this.readPosition
      this.readPosition++
      ch = this.readNextCh()
    }

    return new Token(Numeric.type, this.code.substring(position,this.readPosition))
  }

  readCh(){
    if (this.readPosition < this.length){
      this.ch = this.code.charCodeAt(this.readPosition)
    }else{
      this.ch = 0
    }
    this.position = this.readPosition
    this.readPosition++
  }

  readNextCh(){
    if (this.readPosition < this.length){
      return this.code.charCodeAt(this.readPosition)
    }else{
      return 0
    }
  }

  isNumber(ch){
    return ch >=48 && ch <= 57
  }

  nextToken(){
    this.skipSpace()
    this.readCh()

    if (this.ch === 0){
      return null
    }
    if (this.isNumber(this.ch)) {
      return this.readNumeric()
    }

    switch (String.fromCharCode(this.ch)) {
      case AddSymbol.text:
        return AddSymbol
      case SubSymbol.text:
        return SubSymbol
      case MulSymbol.text:
        return MulSymbol
      case DivSymbol.text:
        return DivSymbol
      case LeftParenthesisSymbol.text:
        return LeftParenthesisSymbol
      case RightParenthesisSymbol.text:
        return RightParenthesisSymbol
      default:
        throw "invalid char: "
    }

  }

  skipSpace(){
    while(true){
      switch (String.fromCharCode(this.readNextCh())){
        case " ":
          this.readCh()
          break
        default:
          return
      }
    }
  }
}

class Parser{
  constructor(tokens) {
    this.tokens = tokens
    this.position = 0
    this.readPosition = 0
    this.length = tokens.length
    this.Expressions = []
  }

  readToken(){
    var token = this.tokens[this.readPosition]
    this.position = this.readPosition
    this.readPosition++
    return token
  }
  readNextToken(){
    if (this.readPosition < this.length){
      return this.tokens[this.readPosition]
    }

    return null
  }

  readMulExpression(){}
  parser(){
    var expression = this.nextExpression()
    while (expression){
      this.Expressions.push(expression)
      expression = this.nextExpression()
    }

    return this.Expressions
  }
  nextExpression(){
    if (this.readPosition >= this.length){
      return null
    }
    var token = this.readToken()

    switch (token.type){
      case Numeric.type:
        var left = token
        var symbol = this.readToken()
        var nextToken = this.readNextToken()
        if (nextToken.type === Numeric.type){
          this.readToken()
          var node = new AstNode(
            left,
            symbol,
            nextToken
          )

          var nextSymbol = this.readNextToken()
          if (nextSymbol == null){
            return node
          }

          if (symbol.priority === nextSymbol.priority) {
              return node
          }

          if (symbol.priority < nextSymbol.priority){
            return new AstNode(
              left,
              symbol,
              new AstNode(
                nextToken,
                nextSymbol,
                this.nextExpression()
              ))

          }

          return new AstNode(
            left,
            symbol,
            nextToken
          )
        }else{

          throw ("invalid token: "+ nextToken.type)
        }
      case AddSymbol.type:
      case SubSymbol.type:
      case MulSymbol.type:
      case DivSymbol.type:
        var left = this.Expressions.pop()
        var nextToken = this.readNextToken()
        if (nextToken.type === Numeric.type){
          this.readToken()
          right = nextToken
        }else{
          var right = this.nextExpression()
        }

        return new AstNode(
          left,
          token,
          right
        )
      default:
        throw "unknown type"+token.text
    }
  }
}

function add(a,b) {
  return a+b
}

function sub(a,b) {
  return a-b
}

function mul(a,b) {
  return a*b
}

function div(a,b) {
  return a/b
}


let lexer = new Lexer("123*2+4*0");
tokens = lexer.parser();
parser = new Parser(tokens)
var ast = parser.parser()[0]
console.log(JSON.stringify([ast]))
console.log(ast.value())

