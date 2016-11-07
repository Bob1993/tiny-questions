def toSuffixExpression (infix):
	result = []
	operators = []
	for item in infix:
		print(item, 'current result: ', result, infix)
		if item.isdigit():
			result.append(item)
		else:
			if '()'.find(item) > -1 or isHighest(item, operators):
				if item == ')':
					lengthOfOperators = len(operators)
					for i in range(lengthOfOperators):
						operator = operators.pop()
						if operator != '(':
							result.append(operator)
						else:
							break
				else:
					operators.append(item)
			else:
				lengthOfOperators = len(operators)
				for i in reversed(range(lengthOfOperators)):
					if operators[i] == '(' or isHighest(item, operators):
						operators.append(item)
						break
					else:
						result.append(operators.pop())
				return len(operators) == 0 and operators.append(item)
	return result + list(reversed(operators)) if len(operators) > 0 else result

def isHighest (operator, operators):
	result = len(operators) == 0 or getPriority(operator) > getPriority(operators[len(operators) - 1])
	print(operator, operators, '....highest:', result)
	return result

def getPriority (operator):
	if operator == '(':
		return -1
	return 0 if '+-'.find(operator) > -1 else 1

def getResult (input):
	tempStack = []
	num1 = 0
	num2 = 0
	suffixExpression = toSuffixExpression(input.split(' '))
	for item in suffixExpression:
		if item.isdigit():
			tempStack.append(item)
		else:
			num2 = int(tempStack.pop())
			num1 = int(tempStack.pop())
			tempStack.append(caculate(num1, num2, item))
	return tempStack.pop() if len(tempStack) == 1 else 0

	def caculate (num1, num2, operator):
		if operator == '+':
			return num1 + num2
		elif operator == '-':
			return num1 - num2
		elif operator == '*':
			return num1 * num2
		elif operator == '/':
			return num1 / num2
		return 0

print('the AEE for python is', toSuffixExpression('9 + ( 3 - 1 + 5 * 6 ) * 3 + 10 / 2'.split(' ')))












