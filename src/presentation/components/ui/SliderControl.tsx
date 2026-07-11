'use client'

interface SliderControlProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  displayValue: string
  onChange: (val: number) => void
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  displayValue,
  onChange,
}: SliderControlProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="text-base text-gray-500 w-44 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 appearance-none bg-gray-200 rounded-full accent-blue-600"
        aria-label={label}
        aria-valuetext={displayValue}
      />
      <span className="text-base font-medium text-gray-800 w-20 text-right">{displayValue}</span>
    </div>
  )
}
