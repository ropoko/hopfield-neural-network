import { Hopfield } from './hopfield.js';
import { matrix1, matrix2, matrix3, matrix4, emptyMatrix } from './numbers.js'

const hopfield = new Hopfield();
const trainedMatrix = hopfield.calculateWeights([matrix1, matrix2, matrix3, matrix4]);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasResposta = document.getElementById('canvasResposta');
const ctxResposta = canvasResposta.getContext('2d');

let selectedNumber = 1;

const matrices = {
	1: matrix1,
	2: matrix2,
	3: matrix3,
	4: matrix4
};

const matrix = matrices[selectedNumber];

function drawMatrix(defaultMatrix, context = ctx, numCols = 5) {
	// Matriz a ser desenhada
	const selectedMatrix = defaultMatrix || matrices[selectedNumber];

	// Tamanho de cada célula
	const cellSize = 50;

	for (let i = 0; i < selectedMatrix.length; i++) {
		const row = Math.floor(i / numCols);
		const col = i % numCols;

		// 1 - preto, (-1) - branco
		context.fillStyle = selectedMatrix[i] === 1 ? '#000' : '#fff';

		context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

		// borda da celula
		context.strokeStyle = '#000';
		context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
	}
}

let currentMatrix = matrix;

// Adiciona ruído a matriz
function addNoise(numCols = 5, noiseLevel = 0.1) {
	// noiseLevel representa a quantidade em porcentagem de células que serão alteradas

	const numRows = 9;
	const totalCells = numRows * numCols;
	const numFlips = Math.floor(totalCells * noiseLevel);

	// Create a deep copy of the matrix to avoid modifying the original one
	const noisyMatrix = [...currentMatrix];

	// Randomly flip the values in the matrix
	for (let i = 0; i < numFlips; i++) {
		const randomIndex = Math.floor(Math.random() * totalCells);
		noisyMatrix[randomIndex] = noisyMatrix[randomIndex] === 1 ? -1 : 1;
	}

	return noisyMatrix;
}

// Desenha a matriz resultante
document.getElementById('btnResposta').addEventListener('click', () => {
	const recoveredPattern = hopfield.recoverPattern(trainedMatrix, currentMatrix);
	drawMatrix(recoveredPattern, ctxResposta);
});

// limpa o canvas da matriz resultante
document.getElementById('btnLimpar').addEventListener('click', () => {
	drawMatrix(emptyMatrix, ctxResposta);
});

// adiciona ruído à matriz teste
document.getElementById('buttonNoise').addEventListener('click', () => {
	currentMatrix = addNoise();
	drawMatrix(currentMatrix);
});

// define o número 1 como matriz atual
document.getElementById('button1').addEventListener('click', () => {
	selectedNumber = 1;
	currentMatrix = matrix1;
	drawMatrix();
});

// define o número 2 como matriz atual
document.getElementById('button2').addEventListener('click', () => {
	selectedNumber = 2;
	currentMatrix = matrix2;
	drawMatrix();
});

// define o número 3 como matriz atual
document.getElementById('button3').addEventListener('click', () => {
	selectedNumber = 3;
	currentMatrix = matrix3;
	drawMatrix();
});

// define o número 4 como matriz atual
document.getElementById('button4').addEventListener('click', () => {
	selectedNumber = 4;
	currentMatrix = matrix4;
	drawMatrix();
});

// desenha as matrizes ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
	drawMatrix();
	drawMatrix(emptyMatrix, ctxResposta);
});
