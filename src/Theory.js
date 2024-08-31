import React, { useState } from 'react';

const Theory = () => {
    const AccordionItem = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-gray-200">
                <button
                className="flex justify-between items-center w-full py-4 px-6 text-left font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                <div className="py-4 px-6">
                    {children}
                </div>
                )}
            </div>
        );
    };
    return (
<div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-4">Teoría de Machine Learning</h3>
    <div className="border border-gray-200 rounded-lg">
        <AccordionItem title="¿Qué es Machine Learning?">
            <p>Machine Learning, o aprendizaje automático, es una rama de la inteligencia artificial que permite a los sistemas aprender y mejorar automáticamente a partir de la experiencia sin ser explícitamente programados para ello. Los modelos de Machine Learning identifican patrones en los datos, hacen predicciones o toman decisiones basadas en esos patrones. El propósito principal de un modelo de Machine Learning es la <strong>clasificación y predicción</strong>, lo que significa que estos modelos se entrenan para reconocer patrones en los datos y hacer predicciones precisas en nuevas situaciones.</p>
        </AccordionItem>

        <AccordionItem title="Tipos de Modelos en Machine Learning">
            <p>Existen varios tipos de modelos en Machine Learning, cada uno adecuado para diferentes tipos de problemas:</p>
            <ul className="list-disc list-inside">
                <li><strong>Modelos Supervisados:</strong> Estos modelos se entrenan con un conjunto de datos etiquetados, lo que significa que las entradas están asociadas con las salidas deseadas. La estructura de un modelo de aprendizaje supervisado generalmente es <strong>lineal</strong>, donde la salida es una combinación lineal de las entradas. Ejemplos incluyen regresión lineal y árboles de decisión.</li>
                <li><strong>Modelos No Supervisados:</strong> Estos modelos se utilizan para encontrar patrones o estructuras ocultas en datos no etiquetados. Ejemplos incluyen algoritmos de clustering como K-means.</li>
                <li><strong>Modelos de Aprendizaje por Refuerzo:</strong> Estos modelos aprenden a tomar decisiones secuenciales, recompensando o penalizando las acciones tomadas en función de los resultados.</li>
            </ul>
        </AccordionItem>

        <AccordionItem title="Conjunto de Datos de Entrenamiento">
            <p>En Machine Learning, el <strong>conjunto de datos de entrenamiento</strong> es fundamental. Este conjunto de datos consiste en ejemplos de datos de entrada con salidas conocidas. Durante el proceso de entrenamiento, el modelo aprende a mapear las entradas a las salidas, permitiéndole hacer predicciones precisas en nuevos datos no vistos. Por ejemplo, en un modelo de clasificación, el conjunto de datos de entrenamiento incluirá entradas etiquetadas, como imágenes de dígitos escritos a mano con sus correspondientes etiquetas que indican el número que representan.</p>
        </AccordionItem>

        <AccordionItem title="Métricas de Evaluación de Modelos de Clasificación">
            <p>Para evaluar la precisión de un modelo de clasificación, se utilizan varias métricas, incluyendo:</p>
            <ul className="list-disc list-inside">
                <li><strong>Precisión:</strong> La proporción de predicciones correctas entre el total de predicciones realizadas.</li>
                <li><strong>Recall:</strong> La proporción de casos positivos correctamente identificados entre todos los casos positivos reales.</li>
                <li><strong>F1-Score:</strong> La media armónica de la precisión y el recall, útil cuando los datos están desbalanceados.</li>
                <li><strong>Matriz de Confusión:</strong> Una tabla que muestra las verdaderas positivas, falsas negativas, verdaderas negativas y falsas positivas, ayudando a entender mejor el rendimiento del modelo.</li>
                <li><strong>AUC-ROC:</strong> Área bajo la curva ROC, que mide la capacidad del modelo para distinguir entre clases positivas y negativas.</li>
            </ul>
        </AccordionItem>

        <AccordionItem title="Métricas de Evaluación de Modelos de Regresión">
            <p>Para los modelos de regresión, que predicen valores continuos, las métricas de evaluación comunes incluyen:</p>
            <ul className="list-disc list-inside">
                <li><strong>Error Cuadrático Medio (MSE):</strong> La media de los cuadrados de los errores, es decir, las diferencias entre los valores predichos y los valores reales.</li>
                <li><strong>Raíz del Error Cuadrático Medio (RMSE):</strong> La raíz cuadrada del MSE, que proporciona un error promedio en las mismas unidades que la variable objetivo.</li>
                <li><strong>Error Absoluto Medio (MAE):</strong> La media de los errores absolutos, que mide la magnitud promedio de los errores en un conjunto de predicciones, sin considerar su dirección.</li>
                <li><strong>R² (Coeficiente de Determinación):</strong> Mide la proporción de la variabilidad en la variable dependiente que puede explicarse por las variables independientes. Un R² de 1 indica un modelo perfecto, mientras que un R² de 0 indica que el modelo no explica la variabilidad de los datos.</li>
            </ul>
        </AccordionItem>

        <AccordionItem title="Proceso de Construcción de un Modelo">
            <p>El proceso de construcción de un modelo de Machine Learning implica varias etapas clave:</p>
            <ol className="list-decimal list-inside">
                <li><strong>Recopilación de datos:</strong> Obtener un conjunto de datos representativo del problema a resolver.</li>
                <li><strong>Preprocesamiento de datos:</strong> Limpiar y transformar los datos para hacerlos aptos para el modelo.</li>
                <li><strong>División de los datos:</strong> Separar los datos en conjuntos de entrenamiento y prueba.</li>
                <li><strong>Entrenamiento del modelo:</strong> Ajustar los parámetros del modelo utilizando el conjunto de entrenamiento.</li>
                <li><strong>Evaluación del modelo:</strong> Medir el rendimiento del modelo utilizando el conjunto de prueba.</li>
                <li><strong>Optimización:</strong> Ajustar los hiperparámetros del modelo para mejorar su rendimiento.</li>
            </ol>
            <p>Es importante notar que <strong>la compresión de los datos no es una etapa típica</strong> en el proceso de Machine Learning. Aunque la compresión puede ser útil en ciertos contextos, no forma parte del flujo estándar de construcción y evaluación de un modelo de Machine Learning.</p>
        </AccordionItem>
    </div>
</div>
    );
};

export default Theory;