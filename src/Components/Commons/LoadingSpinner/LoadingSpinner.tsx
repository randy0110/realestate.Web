import React from 'react';
import { useLoading } from '../../../Context/LoadingContext/LoadingContext';

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null; // No mostrar nada si no está en carga

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500 border-r-transparent"></div>
      <span className="text-white ml-4">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;