import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import cursosData from './jsons/cursos.json'; // Importa el JSON con los datos de los cursos
import { CursoModal, TemaModal } from './components/Modals'; // Importa los modales desde el nuevo archivo

// Definición de la componente CursoCard
const CursoCard = ({ curso, onOpen }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer" onClick={() => onOpen(curso)}>
    <img src={curso.imagen} alt={curso.titulo} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{curso.titulo}</h2>
      <p className="text-gray-600">{curso.descripcion}</p>
    </div>
  </div>
);

const App = () => {
  const [cursos, setCursos] = useState(cursosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [selectedTema, setSelectedTema] = useState(null);

  useEffect(() => {
    const filtered = cursosData.filter(curso =>
      curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCursos(filtered);
  }, [searchTerm]);

  const openCursoModal = (curso) => setSelectedCurso(curso);
  const closeCursoModal = () => setSelectedCurso(null);
  const openTemaModal = (tema) => setSelectedTema(tema);
  const closeTemaModal = () => setSelectedTema(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-4xl font-bold mb-6 flex items-center">
          GTT
          <span className="text-lg font-semibold ml-2">(GarciaTechTutoring)</span>
        </h1>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {cursos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cursos.map((curso) => (
              <CursoCard key={curso.id} curso={curso} onOpen={openCursoModal} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl mt-8">No se encontraron cursos que coincidan con tu búsqueda.</p>
        )}
      </main>

      {selectedCurso && (
        <CursoModal
          isOpen={!!selectedCurso}
          onClose={closeCursoModal}
          curso={selectedCurso}
          onOpenTema={openTemaModal}
        />
      )}

      {selectedTema && (
        <TemaModal
          isOpen={!!selectedTema}
          onClose={closeTemaModal}
          tema={selectedTema}
        />
      )}
    </div>
  );
};

export default App;