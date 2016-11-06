'use strict'
function toSuffixExperssion (infix) {
	let result = [], operators = []
	infix.forEach(item => {
		if(!isNaN(parseInt(item))) {
			result.push(item)
		} else {
			if ('()'.indexOf(item) > -1 || isHighest(item, operators)) {
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
					if (operators[i] === '(' || isHighest(item, operators)) {
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
}

/*
 * () ，在栈顶，可以压栈。开始出栈时又不能出栈
 */
function isHighest (operator, operators) {
	return (operators.length === 0 || getPriority(operator) > getPriority(operators[operators.length - 1])) 
}

/*
 * 未处理非法字符
 */
function getPriority (operator) {
	if (operator === '(') return -1
	return '+-'.indexOf(operator) > -1 ? 0 : 1
}


function getResult (input) {
	let tempStack = [], num1 = 0, num2 = 0
	const suffixExpression = toSuffixExperssion(input.split(' '))
  suffixExpression.forEach(item => {
  	if (!isNaN(parseInt(item))) {
  		tempStack.push(item)
  	} else {
  		num2 = parseInt(tempStack.pop())
  		num1 = parseInt(tempStack.pop())
  		tempStack.push(caculate(num1, num2, item))
  	}
  })
	return tempStack.length === 1 ? tempStack.pop() : NaN
}

function caculate (num1, num2, operator) {
	switch(operator) {
		case '+': return num1 + num2
		case '-': return num1 - num2
		case '*': return num1 * num2
		case '/': return num1 / num2
	}
	return 0
}

console.log(getResult('9 + ( 3 - 1 + 5 * 6 ) * 3 + 10 / 2'))
