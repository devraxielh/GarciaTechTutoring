import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

const SupervisedLearningAnimation = () => {
  const [step, setStep] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [trained, setTrained] = useState(false);

  const steps = [
    {
      title: "1. Recolección de Datos",
      description: "Se recopilan datos etiquetados. En este caso, características de correos electrónicos y sus etiquetas (spam o no spam).",
      visual: (
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="p-2 bg-blue-100 rounded">
              📧 {i % 2 === 0 ? "Spam" : "No Spam"}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "2. Preparación de Datos",
      description: "Los datos se dividen en conjuntos de entrenamiento y prueba.",
      visual: (
        <div className="flex space-x-4">
          <div className="p-2 bg-green-100 rounded">
            Entrenamiento<br/>
            📧📧📧
          </div>
          <div className="p-2 bg-yellow-100 rounded">
            Prueba<br/>
            📧
          </div>
        </div>
      )
    },
    {
      title: "3. Entrenamiento del Modelo",
      description: "El modelo aprende patrones de los datos de entrenamiento.",
      visual: (
        <div className="flex items-center space-x-2">
          <div>📧📧📧</div>
          <ArrowRight />
          <div className="p-2 bg-purple-100 rounded">Modelo</div>
          <RefreshCw className="animate-spin" />
        </div>
      )
    },
    {
      title: "4. Evaluación del Modelo",
      description: "Se prueba el modelo con datos que no ha visto antes.",
      visual: (
        <div className="flex items-center space-x-2">
          <div>📧</div>
          <ArrowRight />
          <div className="p-2 bg-purple-100 rounded">Modelo</div>
          <ArrowRight />
          <div className="p-2 bg-orange-100 rounded">¿Spam?</div>
        </div>
      )
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else if (!trained) {
      setTrained(true);
    }
  };

  const resetAnimation = () => {
    setStep(0);
    setPrediction(null);
    setTrained(false);
  };

  const makePrediction = () => {
    setPrediction(Math.random() > 0.5 ? "Spam" : "No Spam");
  };

  return (
    <div className="p-6 w-full mx-auto bg-white space-y-4">
      <h2 className="text-2xl font-bold text-center">Clasificación de Spam</h2>
      {!trained ? (
        <>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="text-xl font-medium">{steps[step].title}</h3>
            <p className="mt-2">{steps[step].description}</p>
          </div>
          <div className="flex justify-center">{steps[step].visual}</div>
          <button
            onClick={nextStep}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            {step < steps.length - 1 ? "Siguiente Paso" : "Finalizar Entrenamiento"}
          </button>
        </>
      ) : (
        <>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-medium">Modelo Entrenado</h3>
            <p className="mt-2">Ahora puedes usar el modelo para clasificar nuevos correos.</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <div>📧</div>
            <ArrowRight />
            <div className="p-2 bg-purple-100 rounded">Modelo</div>
            <ArrowRight />
            <div className="p-2 bg-orange-100 rounded">{prediction || "?"}</div>
          </div>
          <button
            onClick={makePrediction}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Clasificar Nuevo Correo
          </button>
        </>
      )}
      <button
        onClick={resetAnimation}
        className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
      >
        Reiniciar Animación
      </button>
    </div>
  );
};

export default SupervisedLearningAnimation;
