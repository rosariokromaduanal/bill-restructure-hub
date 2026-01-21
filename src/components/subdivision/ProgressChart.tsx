interface ProgressChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  emptyColor?: boolean;
}

/**
 * Gráfica circular de progreso con gradiente
 * Muestra el porcentaje utilizado de la factura
 * Gradiente cambiante conforme avanza el porcentaje
 * Responsive para diferentes tamaños de pantalla
 */
export function ProgressChart({
  percentage,
  size = 220,
  strokeWidth = 25,
  emptyColor = false
}: ProgressChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  // ID único para el gradiente
  const gradientId = `progress-gradient-${percentage}`;

  // Estados visuales según el porcentaje
  const isEmpty = percentage === 0;
  const isComplete = percentage >= 100;

  // Color del texto cuando está vacío o sin datos
  const textColor = emptyColor || isEmpty ? "#757575" : undefined;

  return (
    <div className="relative inline-flex items-center justify-center w-32 sm:w-40 md:w-56">
      <svg
        width={size}
        height={size}
        className="progress-ring"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Definición del gradiente */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {/* #79145C al inicio */}
            <stop offset="0%" stopColor="#79145C" />
            {/* #634DB0 en el medio */}
            <stop offset="50%" stopColor="#634DB0" />
            {/* #321761 al final */}
            <stop offset="100%" stopColor="#321761" />
          </linearGradient>
        </defs>

        {/* Círculo de fondo */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={emptyColor ? "#757575" : "hsl(var(--border))"}
          strokeWidth={strokeWidth}
        />

        {/* Círculo de progreso con gradiente */}
        {!isEmpty && !emptyColor && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="progress-ring-circle"
          />
        )}

        {/* Marca de completado o vacío */}
        {isComplete && !emptyColor && (
          <circle
            cx={center}
            cy={center}
            r={radius - strokeWidth}
            fill="none"
            stroke="#0EA881"
            strokeWidth={2}
            opacity={0.5}
          />
        )}
      </svg>

      {/* Texto del porcentaje */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isEmpty || emptyColor ? (
          <span className="text-2xl sm:text-3xl md:text-5xl" style={{ color: textColor }}>0%</span>
        ) : isComplete ? (
          <div className="text-center">
            <span className="text-2xl sm:text-3xl md:text-5xl text-secondary">100%</span>
            <p className="text-xs text-accent">Completo</p>
          </div>
        ) : (
          <span className="text-2xl sm:text-3xl md:text-5xl text-secondary">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}