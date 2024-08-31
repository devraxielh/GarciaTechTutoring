import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
    { area: 1000, habitaciones: 2, precio: 200000 },
    { area: 1500, habitaciones: 3, precio: 300000 },
    { area: 2000, habitaciones: 4, precio: 400000 },
    { area: 1200, habitaciones: 2, precio: 250000 },
    { area: 1800, habitaciones: 3, precio: 350000 },
];

const DecisionTreeRegresionAnimation = () => {
    const [highlightedPath, setHighlightedPath] = useState([]);
    const [area, setArea] = useState('');
    const [habitaciones, setHabitaciones] = useState('');
    const [prediccion, setPrediccion] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const animationSteps = [
        { area: 1500, habitaciones: 3, path: [] },
        { area: 1500, habitaciones: 3, path: ['0'] },
        { area: 1500, habitaciones: 3, path: ['0', '0-1'] },
        { area: 1500, habitaciones: 3, path: ['0', '0-1', '0-1-1'] },
    ];

    const advanceAnimation = useCallback(() => {
        if (animationStep < animationSteps.length - 1) {
        setAnimationStep(prevStep => prevStep + 1);
        } else {
        setIsPlaying(false);
        }
    }, [animationStep, animationSteps.length]);

    useEffect(() => {
        let animationInterval;
        if (isPlaying) {
        animationInterval = setInterval(advanceAnimation, 1500);
        }
        return () => clearInterval(animationInterval);
    }, [isPlaying, advanceAnimation]);

    useEffect(() => {
        const step = animationSteps[animationStep];
        setArea(step.area);
        setHabitaciones(step.habitaciones);
        setHighlightedPath(step.path);
        if (animationStep === animationSteps.length - 1) {
        setPrediccion(325000);
        } else {
        setPrediccion(null);
        }
    }, [animationStep]);

    const predecir = () => {
        let precio = 0;
        if (area > 1500) {
        if (habitaciones > 3) {
            precio = 400000;
            setHighlightedPath(['0', '0-1', '0-1-1']);
        } else {
            precio = 350000;
            setHighlightedPath(['0', '0-1', '0-1-0']);
        }
        } else {
        if (habitaciones > 2) {
            precio = 300000;
            setHighlightedPath(['0', '0-0', '0-0-1']);
        } else {
            precio = 225000;
            setHighlightedPath(['0', '0-0', '0-0-0']);
        }
        }
        setPrediccion(precio);
    };

    const TreeNode = ({ id, content, condition, value, left, right, x, y }) => {
        const isHighlighted = highlightedPath.includes(id);
        const circleRadius = 20;
        const verticalSpacing = 70;
        const horizontalSpacing = 35;

        return (
        <g>
            <motion.circle
            cx={x}
            cy={y}
            r={circleRadius}
            fill={isHighlighted ? "#3B82F6" : "white"}
            stroke="#2563EB"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            />
            <motion.text
            x={x}
            y={y - 5}
            textAnchor="middle"
            fill={isHighlighted ? "white" : "black"}
            fontSize="6"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
            {content}
            </motion.text>
            {condition && (
            <motion.text
                x={x}
                y={y + 7}
                textAnchor="middle"
                fill={isHighlighted ? "white" : "black"}
                fontSize="5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {condition}
            </motion.text>
            )}
            {value && (
            <motion.text
                x={x}
                y={y + 7}
                textAnchor="middle"
                fill={isHighlighted ? "white" : "black"}
                fontSize="5"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                ${value}
            </motion.text>
            )}
            <motion.text
            x={x}
            y={y - circleRadius - 5}
            textAnchor="middle"
            fill="#4B5563"
            fontSize="4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
            Nodo {id}
            </motion.text>
            {(left || right) && (
            <motion.text
                x={x}
                y={y + circleRadius + 10}
                textAnchor="middle"
                fill="#4B5563"
                fontSize="5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Decisión
            </motion.text>
            )}
            {left && (
            <>
                <motion.path
                d={`M ${x} ${y + circleRadius} Q ${x - horizontalSpacing / 2} ${y + verticalSpacing / 2}, ${x - horizontalSpacing} ${y + verticalSpacing - circleRadius}`}
                fill="none"
                stroke="#2563EB"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
                />
                <motion.text
                x={x - horizontalSpacing / 2 - 3}
                y={y + verticalSpacing / 2 - 3}
                textAnchor="end"
                fill="black"
                fontSize="5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                No
                </motion.text>
                <TreeNode
                {...left}
                x={x - horizontalSpacing}
                y={y + verticalSpacing}
                />
            </>
            )}
            {right && (
            <>
                <motion.path
                d={`M ${x} ${y + circleRadius} Q ${x + horizontalSpacing / 2} ${y + verticalSpacing / 2}, ${x + horizontalSpacing} ${y + verticalSpacing - circleRadius}`}
                fill="none"
                stroke="#2563EB"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
                />
                <motion.text
                x={x + horizontalSpacing / 2 + 3}
                y={y + verticalSpacing / 2 - 3}
                textAnchor="start"
                fill="black"
                fontSize="5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                Sí
                </motion.text>
                <TreeNode
                {...right}
                x={x + horizontalSpacing}
                y={y + verticalSpacing}
                />
            </>
            )}
        </g>
        );
    };

    const treeStructure = {
        id: '0',
        content: 'Área',
        condition: '> 1500',
        left: {
        id: '0-0',
        content: 'Habitaciones',
        condition: '> 2',
        left: {
            id: '0-0-0',
            content: 'Precio',
            value: '225000',
        },
        right: {
            id: '0-0-1',
            content: 'Precio',
            value: '300000',
        },
        },
        right: {
        id: '0-1',
        content: 'Habitaciones',
        condition: '> 3',
        left: {
            id: '0-1-0',
            content: 'Precio',
            value: '350000',
        },
        right: {
            id: '0-1-1',
            content: 'Precio',
            value: '400000',
        },
        },
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-3">Árbol de Regresión Interactivo</h2>
        <div className="mb-3 bg-gray-100 p-3 rounded-lg shadow-md">
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
            <TreeNode {...treeStructure} x={100} y={30} />
            </svg>
        </div>
        <div className="mb-3 flex justify-center space-x-2">
            <button
            onClick={() => setAnimationStep(Math.max(0, animationStep - 1))}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
            >
            <SkipBack size={16} />
            </button>
            <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
            >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
            onClick={() => setAnimationStep(Math.min(animationSteps.length - 1, animationStep + 1))}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
            >
            <SkipForward size={16} />
            </button>
        </div>
        <div className="mb-3 bg-blue-100 p-2 rounded-lg">
            <h3 className="text-sm font-bold mb-2">Ingrese los datos de la casa:</h3>
            <div className="flex flex-wrap gap-2">
            <input
                type="number"
                placeholder="Área (m²)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="p-1 text-xs border rounded"
            />
            <input
                type="number"
                placeholder="Habitaciones"
                value={habitaciones}
                onChange={(e) => setHabitaciones(e.target.value)}
                className="p-1 text-xs border rounded"
            />
            <button
                onClick={predecir}
                className="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded"
            >
                Predecir Precio
            </button>
            </div>
        </div>
        {prediccion && (
            <div className="mb-3 bg-yellow-100 p-2 rounded-lg">
            <p className="text-sm font-bold">Precio predicho: ${prediccion.toLocaleString()}</p>
            </div>
        )}
        <div>
            <h3 className="text-sm font-bold mb-2">Datos de ejemplo:</h3>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-sm">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-1 text-xxs">Área (m²)</th>
                    <th className="border border-gray-300 p-1 text-xxs">Habitaciones</th>
                    <th className="border border-gray-300 p-1 text-xxs">Precio ($)</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 p-1 text-xxs">{row.area}</td>
                    <td className="border border-gray-300 p-1 text-xxs">{row.habitaciones}</td>
                    <td className="border border-gray-300 p-1 text-xxs">{row.precio.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default DecisionTreeRegresionAnimation;
