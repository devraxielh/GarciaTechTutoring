import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, CheckCircle, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
    { edad: 25, ingreso: 30000, educacion: 'universidad', compra: false },
    { edad: 35, ingreso: 60000, educacion: 'posgrado', compra: true },
    { edad: 45, ingreso: 40000, educacion: 'universidad', compra: true },
    { edad: 20, ingreso: 20000, educacion: 'secundaria', compra: false },
    { edad: 50, ingreso: 70000, educacion: 'posgrado', compra: true },
];

const DecisionTreeClasificacionAnimation = () => {
    const [highlightedPath, setHighlightedPath] = useState([]);
    const [edad, setEdad] = useState('');
    const [ingreso, setIngreso] = useState('');
    const [educacion, setEducacion] = useState('');
    const [clasificacion, setClasificacion] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const animationSteps = [
        { edad: 35, ingreso: 60000, educacion: 'posgrado', path: [] },
        { edad: 35, ingreso: 60000, educacion: 'posgrado', path: ['0'] },
        { edad: 35, ingreso: 60000, educacion: 'posgrado', path: ['0', '0-1'] },
        { edad: 35, ingreso: 60000, educacion: 'posgrado', path: ['0', '0-1', '0-1-1'] },
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
        setEdad(step.edad);
        setIngreso(step.ingreso);
        setEducacion(step.educacion);
        setHighlightedPath(step.path);
        if (animationStep === animationSteps.length - 1) {
        setClasificacion('Compra');
        } else {
        setClasificacion(null);
        }
    }, [animationStep]);

    const clasificar = () => {
        if (ingreso > 50000) {
        if (educacion === 'posgrado') {
            setClasificacion('Compra');
            setHighlightedPath(['0', '0-1', '0-1-1']);
        } else {
            setClasificacion('No compra');
            setHighlightedPath(['0', '0-1', '0-1-0']);
        }
        } else {
        setClasificacion('No compra');
        setHighlightedPath(['0', '0-0']);
        }
    };

    const TreeNode = ({ id, content, condition, left, right, x, y }) => {
        const isHighlighted = highlightedPath.includes(id);
        const circleRadius = 18;
        const verticalSpacing = 50;
        const horizontalSpacing = 40;

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
            <motion.text
            x={x}
            y={y - circleRadius - 5}
            textAnchor="middle"
            fill="#4B5563"
            fontSize="5"
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
        content: 'Ingreso',
        condition: '> 50k',
        left: {
        id: '0-0',
        content: 'No compra',
        },
        right: {
        id: '0-1',
        content: 'Educación',
        condition: 'Posgrado',
        left: {
            id: '0-1-0',
            content: 'No compra',
        },
        right: {
            id: '0-1-1',
            content: 'Compra',
        },
        },
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-3">Árbol de Clasificación Interactivo</h2>
        <div className="mb-3 bg-gray-100 p-3 rounded-lg shadow-md">
            <svg width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet">
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
            <h3 className="text-sm font-bold mb-2">Ingrese sus datos:</h3>
            <div className="flex flex-wrap gap-2">
            <input
                type="number"
                placeholder="Edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="p-1 text-xs border rounded"
            />
            <input
                type="number"
                placeholder="Ingreso"
                value={ingreso}
                onChange={(e) => setIngreso(e.target.value)}
                className="p-1 text-xs border rounded"
            />
            <select
                value={educacion}
                onChange={(e) => setEducacion(e.target.value)}
                className="p-1 text-xs border rounded"
            >
                <option value="">Seleccione educación</option>
                <option value="secundaria">Secundaria</option>
                <option value="universidad">Universidad</option>
                <option value="posgrado">Posgrado</option>
            </select>
            <button
                onClick={clasificar}
                className="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded"
            >
                Clasificar
            </button>
            </div>
        </div>
        {clasificacion && (
            <div className="mb-3 bg-yellow-100 p-2 rounded-lg">
            <p className="text-sm font-bold">Clasificación: {clasificacion}</p>
            </div>
        )}
        <div>
            <h3 className="text-sm font-bold mb-2">Datos de ejemplo:</h3>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-sm">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-1 text-xxs">Edad</th>
                    <th className="border border-gray-300 p-1 text-xxs">Ingreso</th>
                    <th className="border border-gray-300 p-1 text-xxs">Educación</th>
                    <th className="border border-gray-300 p-1 text-xxs">Compra</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 p-1 text-xxs">{row.edad}</td>
                    <td className="border border-gray-300 p-1 text-xxs">{row.ingreso}</td>
                    <td className="border border-gray-300 p-1 text-xxs">{row.educacion}</td>
                    <td className="border border-gray-300 p-1 text-center">
                        {row.compra ? (
                        <CheckCircle className="text-green-500 inline w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                        <AlertCircle className="text-red-500 inline w-3 h-3 md:w-4 md:h-4" />
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default DecisionTreeClasificacionAnimation;