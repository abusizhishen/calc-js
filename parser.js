class Token{
    constructor(type,text){
        this.type = type
        this.text = text
    }
}

class Parser {
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

        return new Token("number", this.code.substring(position,this.readPosition))
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
          case '+':
            return new Token("symbol","+")
          case '-':
            return new Token("symbol","-")
          case '*':
            return new Token("symbol","*")
          case '/':
            return new Token("symbol","/")
          case '(':
            return new Token("symbol","(")
          case ')':
            return new Token("symbol",")")
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




let parse = new Parser("123 +4");
token = parse.parser();
console.log(token)
