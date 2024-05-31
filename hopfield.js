export class Hopfield {

	// Função para inicializar a matriz de pesos com zeros
	initializeWeights(size) {
		// retorna uma matriz de pesos de tamanho `size` preenchida com zeros
		return Array.from({ length: size }, () => Array(size).fill(0))
	}

	// Calcular a matriz de pesos usando a regra do produto externo
	calculateWeights(patterns) {
		const size = patterns[0].length
		const weights = this.initializeWeights(size)

		// Para cada padrão fornecido
		for (const pattern of patterns) {
			// Atualiza a matriz de pesos com base na regra do produto externo
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					if (i !== j) {
						weights[i][j] += pattern[i] * pattern[j]
					}
				}
			}
		}

		return weights;
	}

	// Função de ativação tangente hiperbólica com beta = 100
	activation(x, beta = 100) {
		return Math.tanh(beta * x)
	}

	// Atualiza o estado de um neurônio
	updateNeuron(weights, pattern, index) {
		const size = pattern.length
		let sum = 0

		// Calcula a soma ponderada das entradas para o neurônio na posição `index`
		for (let j = 0; j < size; j++) {
			if (j !== index) {
				sum += weights[index][j] * pattern[j]
			}
		}

		// Retorna o novo estado do neurônio após a função de ativação
		return this.activation(sum)
	}

	// Atualiza o padrão completo
	updatePattern(weights, pattern) {
		const newPattern = [...pattern]

		// Atualiza cada neurônio no padrão
		for (let i = 0; i < pattern.length; i++) {
			newPattern[i] = this.updateNeuron(weights, pattern, i)
		}

		return newPattern
	}

	// Recupera um padrão corrompido
	recoverPattern(weights, corruptedPattern, iterations = 10) {
		let currentPattern = corruptedPattern

		// Iterativamente atualiza o padrão corrompido
		for (let i = 0; i < iterations; i++) {
			currentPattern = this.updatePattern(weights, currentPattern)
		}

		// Retorna o padrão recuperado
		return currentPattern
	}
}
