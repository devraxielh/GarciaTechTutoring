import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronRight, ChevronLeft, XCircle } from 'lucide-react';
import SupervisedLearningAnimation from './supervised-learning-animation';
import SupervisedLearningAnimationRegresion from './supervised-learning-animationregre';

const MLLearningTypes = () => {
  const [currentType, setCurrentType] = useState(0);
  const [subAnimationStep, setSubAnimationStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const types = [
    {
      name: "Aprendizaje Supervisado",
      description: "El modelo aprende de datos etiquetados, estableciendo una relación entre entradas y salidas conocidas.",
      example: "Clasificación de correos electrónicos como spam o no spam.",
      icon: "📊",
      subSteps: [
        "1. Recopilación de datos etiquetados",
        "2. Entrenamiento del modelo",
        "3. Predicción en nuevos datos",
        "4. Evaluación y ajuste"
      ]
    },
    {
      name: "Aprendizaje No Supervisado",
      description: "El modelo descubre patrones en datos no etiquetados, identificando estructuras o relaciones ocultas.",
      example: "Agrupación de clientes por comportamiento de compra.",
      icon: "🧩",
      subSteps: [
        "1. Recopilación de datos no etiquetados",
        "2. Aplicación de algoritmos de agrupación",
        "3. Identificación de patrones",
        "4. Interpretación de resultados"
      ]
    },
    {
      name: "Aprendizaje por Refuerzo",
      description: "El modelo aprende a través de la interacción con un entorno, recibiendo recompensas o penalizaciones por sus acciones.",
      example: "Un programa que aprende a jugar ajedrez.",
      icon: "🎮",
      subSteps: [
        "1. Definición del entorno y acciones",
        "2. Exploración y toma de decisiones",
        "3. Recepción de recompensas",
        "4. Actualización de la política de decisión"
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSubAnimationStep((prevStep) => (prevStep + 1) % types[currentType].subSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentType]);

  const nextType = () => {
    setCurrentType((prevType) => (prevType + 1) % types.length);
    closeModal();
    setSubAnimationStep(0);
  };

  const prevType = () => {
    setCurrentType((prevType) => (prevType - 1 + types.length) % types.length);
    closeModal();
    setSubAnimationStep(0);
  };
  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };
  return (
    <div className="p-6 w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="text-2xl font-bold text-center mb-4">Tipos de Aprendizaje en Machine Learning</div>
      <div className="flex items-center justify-between">
        <button onClick={prevType} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-4xl">{types[currentType].icon}</div>
        <button onClick={nextType} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4 bg-blue-100 rounded-lg">
        <div className="text-xl font-medium text-black">{types[currentType].name}</div>
        <p className="text-gray-700 mt-2">{types[currentType].description}</p>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-5 w-5 text-blue-500" />
          <span className="font-medium">Ejemplo:</span>
        </div>
        <p className="text-gray-700">{types[currentType].example}</p>
      </div>
      <div className="mt-4 p-4 bg-green-100 rounded-lg">
        <div className="font-medium mb-2">Cómo aprende:</div>
        <ul className="list-disc list-inside">
          {types[currentType].subSteps.map((step, index) => (
            <li key={index} className={`transition-all duration-300 ${index === subAnimationStep ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
              {step}
            </li>
          ))}
        </ul>
      </div>
      {currentType === 0 && (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => openModal("Clasificación")}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Clasificación
          </button>
          <button
            onClick={() => openModal("Regresión")}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Regresión
          </button>
        </div>
      )}
      {showModal && (
        <div className="bg-opacity-50">
          <div className="p-8 rounded-lg w-full h-auto space-y-6">
            {modalContent === "Clasificación" && <SupervisedLearningAnimation />}
            {modalContent === "Regresión" && <SupervisedLearningAnimationRegresion />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MLLearningTypes;
