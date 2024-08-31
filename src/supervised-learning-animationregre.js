import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SupervisedLearningAnimationRegre = () => {
  const [step, setStep] = useState(0);
  const [weight, setWeight] = useState(1);
  const [bias, setBias] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);
  const [maxEpochs, setMaxEpochs] = useState(100); // Valor configurable de épocas
  const [data, setData] = useState([
    { x: 1, y: 3 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 9 },
  ]);
  const [epochs, setEpochs] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const predict = (x) => weight * x + bias;

  const calculateLoss = () => {
    return data.reduce((sum, point) => {
      const prediction = predict(point.x);
      return sum + Math.pow(prediction - point.y, 2);
    }, 0) / data.length;
  };

  const calculateRSquared = () => {
    const meanY = data.reduce((sum, point) => sum + point.y, 0) / data.length;

    const totalSumOfSquares = data.reduce((sum, point) => {
      return sum + Math.pow(point.y - meanY, 2);
    }, 0);

    const residualSumOfSquares = data.reduce((sum, point) => {
      return sum + Math.pow(point.y - predict(point.x), 2);
    }, 0);

    return 1 - residualSumOfSquares / totalSumOfSquares;
  };

  const updateModel = () => {
    const n = data.length;
    const weightGradient = data.reduce((sum, point) => {
      return sum + 2 * (predict(point.x) - point.y) * point.x;
    }, 0) / n;
    
    const biasGradient = data.reduce((sum, point) => {
      return sum + 2 * (predict(point.x) - point.y);
    }, 0) / n;

    setWeight(w => w - learningRate * weightGradient);
    setBias(b => b - learningRate * biasGradient);
  };

  const generateRandomData = () => {
    const newData = Array.from({ length: 10 }, (_, i) => ({
      x: i + 1,
      y: (i + 1) * 2 + Math.random() * 4 - 2,
    }));
    setData(newData);
    setWeight(1);
    setBias(0);
    setEpochs(0);
  };

  useEffect(() => {
    if (isTraining && epochs < maxEpochs) {
      const timer = setInterval(() => {
        updateModel();
        setEpochs(e => e + 1);
      }, 100);
      return () => clearInterval(timer);
    } else if (epochs >= maxEpochs) {
      setIsTraining(false); // Detener el entrenamiento cuando se alcanzan las épocas configuradas
    }
  }, [isTraining, epochs]);

  const chartData = data.map(point => ({
    x: point.x,
    y: point.y,
    prediction: predict(point.x)
  }));

  const steps = [
    {
      title: "1. Recopilación de Datos",
      content: (
        <div>
          <p>En el aprendizaje supervisado, comenzamos con datos etiquetados. Cada punto de datos tiene una característica (x) y una etiqueta (y).</p>
          <Button onClick={generateRandomData}>Generar Nuevos Datos</Button>
        </div>
      )
    },
    {
      title: "2. Definición del Modelo",
      content: (
        <div>
          <p>El objetivo del entrenamiento es ajustar los valores de 'w' y 'b' para que la línea resultante se ajuste lo mejor posible a los datos observados.</p>
          <p>El modelo lineal se define mediante la ecuación:</p>
          <p><center><strong>y = wx + b</strong></center></p>
          <ul>
            <li><strong>w</strong> (peso): Representa la pendiente de la línea. Indica cuánto cambia 'y' por cada unidad de cambio en 'x'.</li>
            <li><strong>b</strong> (sesgo): Representa la intersección de la línea con el eje 'y'. Es el valor de 'y' cuando 'x' es 0.</li>
            <li><strong>y</strong>: Es la variable dependiente o el valor que el modelo intenta predecir.</li>
            <li><strong>x</strong>: Es la variable independiente o la entrada que utilizamos para hacer predicciones.</li>
          </ul>
          <div className="flex items-center justify-between mt-2">
            <span>Peso (w):</span>
            <Slider
              value={weight}
              onChange={(event, newValue) => setWeight(newValue)}
              max={5}
              min={-5}
              step={0.1}
              className="w-48"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span>Sesgo (b):</span>
            <Slider
              value={bias}
              onChange={(event, newValue) => setBias(newValue)}
              max={5}
              min={-5}
              step={0.1}
              className="w-48"
            />
          </div>
        </div>
      )
    },
    {
      title: "3. Entrenamiento del Modelo",
      content: (
        <div>
          <p>Entrenamos el modelo ajustando w y b para minimizar el error.</p>
          <div className="flex items-center justify-between mt-2">
            <span>Tasa de Aprendizaje:</span>
            <Slider
              value={learningRate}
              onChange={(event, newValue) => setLearningRate(newValue)}
              max={1}
              min={0.001}
              step={0.001}
              className="w-48"
            />
          </div>
          <Button onClick={generateRandomData}>Generar Nuevos Datos</Button>
          <Button onClick={() => setIsTraining(!isTraining)}>
            {isTraining ? "Detener Entrenamiento" : "Iniciar Entrenamiento"}
          </Button>
          <div className="flex items-center justify-between mt-4">
            <span>Épocas (máx.):</span>
            <TextField
              type="number"
              value={maxEpochs}
              onChange={(event) => setMaxEpochs(parseInt(event.target.value))}
              inputProps={{ min: 1 }}
              className="w-24"
            />
          </div>
          <p>Error: {calculateLoss().toFixed(4)}</p>
        </div>
      )
    },
    {
      title: "4. Evaluación del Modelo",
      content: (
        <div>
          <p>Evaluamos el rendimiento del modelo comparando sus predicciones con los datos reales.</p>
          <p>Modelo final: y = {weight.toFixed(2)}x + {bias.toFixed(2)}</p>
          <p>Error final: {calculateLoss().toFixed(4)}</p>
          <p>R²: {calculateRSquared().toFixed(4)}</p> {/* Mostramos el R² */}
        </div>
      )
    }
  ];

  return (
    <div className="mx-auto bg-white">
      <h2 className="text-2xl font-bold text-center">Regresión Lineal</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{steps[step].title}</h3>
        {steps[step].content}
      </div>
      <center>
      <LineChart width={450} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" name="Datos reales" />
        <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicciones" />
      </LineChart>
      </center>
      <div className="flex justify-between mt-4">
        <Button onClick={() => setStep(s => Math.max(0, s - 1))}>Anterior</Button>
        <Button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Siguiente</Button>
      </div>
    </div>
  );
};

export default SupervisedLearningAnimationRegre;