interface ProgressChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * Gráfica circular de progreso con gradiente
 * Muestra el porcentaje utilizado de la factura
 * Gradiente cambiante conforme avanza el porcentaje
 */
export function ProgressChart({
  percentage,
  size = 284,
  strokeWidth = 20
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

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="progress-ring"
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
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />

        {/* Círculo de progreso con gradiente */}
        {!isEmpty && (
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
        {isComplete && (
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
        {isEmpty ? (
          <span className="text-4xl text-muted-foreground/50">0%</span>
        ) : isComplete ? (
          <div className="text-center">
            <span className="text-4xl text-secondary">100%</span>
            <p className="text-xs text-accent">Completo</p>
          </div>
        ) : (
          <span className="text-4xl text-secondary">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}