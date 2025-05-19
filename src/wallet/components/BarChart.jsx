// Paso 1: Importaciones (al inicio del archivo)
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip 
} from 'chart.js';

// Paso 2: Registrar componentes de Chart.js (inmediatamente después de las importaciones)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

// Paso 3: Componente principal
export const BarChart = () => {
  // --- Paso 4: Datos del gráfico (dentro del componente) ---
  const data = {
    labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Eje X
    datasets: [{
      label: 'Saldo',
      data: [8900, 9000, 4000, 2000, 0, 5000], // Valores Y
      backgroundColor: '#395C6B', // Color de barras
      borderRadius: 8, // Bordes redondeados
      hoverBackgroundColor: '#D1C219', // Color al pasar mouse
    }]
  };

  // --- Paso 5: Opciones de configuración (dentro del componente) ---
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false // Oculta la leyenda
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toLocaleString()}` // Formato monetario
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false // Oculta líneas de grid verticales
        },
        ticks: {
          color: '#395C6B' // Color del texto del eje X
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E9F1F7' // Color líneas de grid horizontales
        },
        ticks: {
          color: '#395C6B', // Color del texto del eje Y
          callback: (value) => `$${value}` // Agrega $ a los valores
        }
      }
    }
  };

  // --- Paso 6: Renderizado (parte final del componente) ---
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-[#395C6B]">
        Historial de saldo (últimos 6 meses)
      </h3>
      <div className="h-64"> {/* Contenedor con altura fija */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};