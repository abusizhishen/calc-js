const Numeric = {type:1,Text:"number"}
const  StringType={type:2,Text:"string"}
const  AddSymbol={type:3,Text:"+"}
const  SubSymbol={type:4,Text:"-"}
const  MulSymbol={type:5,Text:"*"}
const  DivSymbol={type:6,Text:"/"}
const  LeftParenthesisSymbol={type:7,Text:"("}
const  RightParenthesisSymbol = {type:8,Text:")"}



class Token{
    constructor(type,text){
        this.type = type
        this.text = text
    }
}

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
          case AddSymbol.Text:
            return AddSymbol
          case SubSymbol.Text:
            return SubSymbol
          case MulSymbol.Text:
            return MulSymbol
          case DivSymbol.Text:
            return DivSymbol
          case LeftParenthesisSymbol:
            return LeftParenthesisSymbol
          case RightParenthesisSymbol:
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

  readCalculateSymbol(){
    return this.readToken()
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
        var symbol = this.readCalculateSymbol()
        var nextToken = this.readNextToken()
        if (nextToken.type === Numeric.type){
          this.readToken()
          return {
            left:left,
            symbol:symbol,
            right:nextToken
          }
        }else{
          return {
            left:left,
            symbol:symbol,
            right:this.nextExpression()
          }
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

        return {
          left:left,
          symbol:token.type,
          right:right
        }
      default:
        throw "unknown type"+token.text
    }
  }
}


let lexer = new Lexer("123*2+4*5");
tokens = lexer.parser();
parser = new Parser(tokens)
var expressions = parser.parser()
console.log(JSON.stringify(expressions))
