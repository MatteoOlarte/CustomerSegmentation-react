// Parámetros del modelo (copiados de Python)
const modelParams = {
  coeficientes: [
    [0.04732931424652417, -0.16827366718547399],
    [2.241361289085073, 2.6469107506309495],
    [-2.2140125358069835, 2.3094014853174296],
    [2.3059819661857635, -2.4813884966246627],
    [-2.3806600337103765, -2.306650072138244],
  ],
  interceptos: [
    2.5621837944350476, -0.03494322567854503, -1.2013296936185776, -0.3056813726871857, -1.0202295024507348,
  ],
  clases: [0, 1, 2, 3, 4],
  mean: [60.56, 50.2], // Desde scaler.mean_
  scale: [26.19897708, 25.75888196], // Desde scaler.scale_
};

// Función para calcular el producto punto
function dotProduct(coefs: number[], inputs: number[]): number {
  return coefs.reduce((sum, coef, i) => sum + coef * inputs[i], 0);
}

// Función softmax para probabilidades multinomiales
function softmax(scores: number[]): number[] {
  const expScores = scores.map((score) => Math.exp(score));
  const sumExpScores = expScores.reduce((sum, val) => sum + val, 0);
  return expScores.map((expScore) => expScore / sumExpScores);
}

// Función de predicción síncrona
export function modelPredict(x: number, y: number): number {
  // Normalizar las entradas correctamente
  const inputs = [
    (x - modelParams.mean[0]) / modelParams.scale[0], // Ingresos Anuales
    (y - modelParams.mean[1]) / modelParams.scale[1]  // Puntaje de Gasto
  ];

  // Calcular puntajes para cada cluster
  const scores = modelParams.coeficientes.map((coefs, i) =>
    dotProduct(coefs, inputs) + modelParams.interceptos[i]
  );

  // Aplicar softmax para obtener probabilidades
  const probabilities = softmax(scores);

  // Encontrar el cluster con la mayor probabilidad
  const maxProbIndex = probabilities.indexOf(Math.max(...probabilities));

  // Depuración: Mostrar entradas, puntajes y probabilidades
  console.log("Entradas:", x, y);
  console.log("Entradas normalizadas:", inputs);
  console.log("Puntajes:", scores);
  console.log("Probabilidades:", probabilities);
  console.log("Cluster predicho:", modelParams.clases[maxProbIndex]);

  return modelParams.clases[maxProbIndex];
}