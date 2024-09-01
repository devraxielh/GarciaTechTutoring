import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { X, Search, Clock } from 'lucide-react';

export const TemaModal = ({ isOpen, onClose, tema }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-2xl font-semibold text-gray-800">{tema.nombre}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
            </button>
            </div>
            <div className="flex-grow">
            <iframe src={tema.url} className="w-full h-full" frameBorder="0" allowFullScreen />
            </div>
        </div>
        </div>
    </Dialog>
    );

    export const CursoModal = ({ isOpen, onClose, curso, onOpenTema }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTemas, setFilteredTemas] = useState(curso.temas);

    useEffect(() => {
        const filtered = curso.temas.filter(tema =>
        tema.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tema.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTemas(filtered);
    }, [searchTerm, curso.temas]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-3xl font-bold text-gray-800">{curso.titulo}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
                </button>
            </div>
            <div className="p-4 border-b">
                <div className="relative max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Buscar temas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>
            <div className="flex-grow p-6 overflow-y-auto bg-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Temas del curso:</h3>
                {filteredTemas.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemas.map((tema, index) => (
                    <TemaCard key={index} tema={tema} onClick={onOpenTema} />
                    ))}
                </div>
                ) : (
                <p className="text-center text-gray-500">No se encontraron temas que coincidan con tu búsqueda.</p>
                )}
            </div>
            </div>
        </div>
        </Dialog>
    );
    };

    // Asegúrate de que también exportas la componente TemaCard si es usada en CursoModal.
    const TemaCard = ({ tema, onClick }) => (
    <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => onClick(tema)}
    >
        <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{tema.nombre}</h4>
        <p className="text-sm text-gray-600 mb-2">{tema.descripcion}</p>
        </div>
    </div>
);

export default TemaCard;