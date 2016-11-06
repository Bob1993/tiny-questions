'use strict'
const OP = {
	'+': { priority: 0 },
	'-': { priority: 0 },
	'*': { priority: 1 },
	'/': { priority: 1 },
	'(': {priority: -1},
	')': {priority: -1}
}

const AEE = {
	toSuffixExperssion: function (infix) {
		let result = [], operators = []
		infix.forEach(item => {
			if(!isNaN(parseInt(item))) {
				result.push(item)
			} else {
				if ('()'.indexOf(item) > -1 || this.isHighest(item, operators)) {
					if(item === ')') {
						const lengthOfOperators = operators.length
						for(let i = 0; i < lengthOfOperators; i++) {
							const operator = operators.pop()
							if(operator !== '(') {
								result.push(operator)
							} else break
						}
					} else {
						operators.push(item)
					}
				} else { // 开始出栈并输出，直到最高为止。如果碰到了(,结束
					for(let i = operators.length - 1; i >= 0; i--) {
						if (operators[i] === '(' || this.isHighest(item, operators)) {
							operators.push(item)
							break
						} else {
							result.push(operators.pop())
						}
					}
					operators.length === 0 && operators.push(item)
				}
			}
		})
		return operators.length > 0 ? [...result, ...operators.reverse()] : result
	},
	isHighest: function (operator, operators) {
		return (operators.length === 0 || OP[operator].priority > OP[operators[operators.length - 1]].priority) 
	},
	getResult: function (input) {
		let tempStack = [], num1 = 0, num2 = 0
		const suffixExpression = this.toSuffixExperssion(input.split(' '))
	  suffixExpression.forEach(item => {
	  	if (!isNaN(parseInt(item))) {
	  		tempStack.push(item)
	  	} else {
	  		num2 = parseInt(tempStack.pop())
	  		num1 = parseInt(tempStack.pop())
	  		tempStack.push(this.caculate(num1, num2, item))
	  	}
	  })
		return tempStack.length === 1 ? tempStack.pop() : NaN
	},
	caculate: function (num1, num2, operator) {
		switch(operator) {
			case '+': return num1 + num2
			case '-': return num1 - num2
			case '*': return num1 * num2
			case '/': return num1 / num2
		}
		return 0
	}
}

console.log(AEE.getResult('9 + ( 3 - 1 + 5 * 6 ) * 3 + 10 / 2'))
