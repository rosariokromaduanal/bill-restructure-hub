interface ProgressChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * Gráfica circular de progreso
 * Muestra el porcentaje utilizado de la factura
 */
export function ProgressChart({ 
  percentage, 
  size = 180, 
  strokeWidth = 16 
}: ProgressChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        className="progress-ring"
      >
        {/* Círculo de fondo */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        
        {/* Círculo de progreso */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--chart))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
        />
      </svg>
      
      {/* Texto del porcentaje */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-chart">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
