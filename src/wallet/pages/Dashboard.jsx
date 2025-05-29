import React, { useState } from 'react'; // Importar useState aquí
import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import CurrencyConverter from '../components/CurrencyConverter';
import { useAccountStore } from '../hooks/useAccountStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar los iconos de ojo

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const Dashboard = () => {
    const [mostrarSaldo, setMostrarSaldo] = useState(true); // Nuevo estado para controlar la visibilidad del saldo

    const chartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Saldo',
                data: [300, 350, 650, 320, 400, 300], // Datos más acordes al gráfico visual
                fill: true,
                backgroundColor: 'rgba(128, 102, 204, 0.2)', // Relleno más suave
                borderColor: '#A080D0', // Línea púrpura más suave
                tension: 0.4,
                pointBackgroundColor: '#A080D0',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 3, // Puntos más pequeños
                pointHoverRadius: 5,
                pointHitRadius: 10,
                clip: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    drawBorder: false,
                    color: 'rgba(255, 255, 255, 0.05)', // Líneas de cuadrícula aún más sutiles
                },
                ticks: {
                    color: '#CBD5E0',
                    callback: function (value) {
                        return '$' + value;
                    },
                    stepSize: 100, // Ajustar los pasos del eje Y para que se parezca más
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#CBD5E0',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += '$' + context.parsed.y.toLocaleString();
                        }
                        return label;
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo del tooltip un poco más transparente
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#A080D0',
                borderWidth: 1,
                cornerRadius: 4,
            },
        },
        elements: {
            point: {
                borderRadius: 2, // Bordes aún más redondeados
                borderWidth: 1,
            },
            line: {
                borderWidth: 2, // Línea un poco más gruesa
            }
        },
    };

    const { accounts } = useAccountStore();

    // Calcula el saldo total de las cuentas en ARS
    const saldoARS = accounts.reduce((total, account) => {
        if (account.moneda === "ARS") {
            return total + (parseFloat(account.saldo) || 0);
        }
        return total;
    }, 0);

    // Formatear el saldo ARS para mostrar como valor principal
    const saldoARSFormateado = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(saldoARS);

    // Agrupar saldos por tipo de moneda
    const saldosPorMoneda = accounts.reduce((acc, account) => {
        const moneda = account.moneda || "ARS";
        const saldo = parseFloat(account.saldo) || 0;

        if (acc[moneda]) {
            acc[moneda] += saldo;
        } else {
            acc[moneda] = saldo;
        }
        return acc;
    }, {});

    const toggleMostrarSaldo = () => {
        setMostrarSaldo(prev => !prev);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 overflow-visible">

            {/* 1. Mosaico Saldo Actual */}
            <div className="bg-[#2D3748] backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-99 transition-transform duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400">Saldo disponible en ARS</p>
                        {/* Saldo principal */}
                        <p className="text-3xl font-bold text-white mt-2">
                            {mostrarSaldo ? saldoARSFormateado : "$****"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Cuenta principal</p>
                        {/* Mostrar saldos por moneda */}
                        <div className="mt-2 space-y-1">
                            {Object.entries(saldosPorMoneda).map(([moneda, monto]) => {
                                const montoFormateado = new Intl.NumberFormat('es-AR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(monto);

                                let symbol = "";
                                if (moneda === "USD") symbol = "USD $";
                                else if (moneda === "EUR") symbol = "EUR €";
                                else if (moneda === "ARS") symbol = "ARS $";
                                else symbol = moneda + " ";

                                return (
                                    <p key={moneda} className="text-sm text-gray-300 font-medium">
                                        {mostrarSaldo ? `${symbol}${montoFormateado}` : `${moneda} $****`}
                                    </p>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Total en todas las cuentas</p>
                    </div>
                    {/* Botón para ocultar/mostrar saldo */}
                    <button
                        onClick={toggleMostrarSaldo}
                        className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-blue-600/10 transition-colors duration-200"
                        title={mostrarSaldo ? "Ocultar saldo" : "Mostrar saldo"}
                    >
                        {mostrarSaldo ? (
                            <FaEyeSlash size={20} /> // Icono de ojo cerrado
                        ) : (
                            <FaEye size={20} /> // Icono de ojo abierto
                        )}
                    </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-green-400 flex items-center">
                        {/* Aquí puedes reintroducir tu SVG si lo necesitas */}
                        {/* 2.5% vs último mes */}
                    </p>
                </div>
            </div>

            {/* 2. Mosaico Historial de Saldo */}
            <div className="bg-[#2D3748] backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-99 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Historial de saldo</h3>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#F9D71C"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                </div>
                <div className="h-64">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
            {/* 3. Mosaico Últimos Movimientos */}
            <div className="bg-[#2D3748] backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-99 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Últimos movimientos</h3>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-purple-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        />
                    </svg>
                </div>

                <ul className="space-y-3">
                    {[
                        { type: 'income', amount: 1000, description: 'Transferencia recibida' },
                        { type: 'expense', amount: 500, description: 'Pago de servicio' },
                        { type: 'expense', amount: 2300, description: 'Supermercado' }
                    ].map((tx, index) => (
                        <li key={index} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    {tx.type === 'income' ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 text-green-400"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 text-red-400"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm text-white">{tx.description}</span>
                            </div>
                            <span className={`text-sm font-medium ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>

                {/*<button className="mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center">
                    Ver historial completo
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </button>*/}
            </div>
            <div className="md:col-span-1 bg-[#2D3748] backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-99 transition-transform duration-200">
                <CurrencyConverter />
            </div>
        </div>
    );
};