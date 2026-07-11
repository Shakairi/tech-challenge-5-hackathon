import { FontCard } from '../../presentation/components/painel/FontCard'
import { SafetyCard } from '../../presentation/components/painel/SafetyCard'

export default function PainelPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-1">Personalizar experiência</h1>
      <p className="text-base text-gray-500 mb-6">
        Ajuste a interface do jeito que fica mais confortável para você.
      </p>
      <FontCard />
      <SafetyCard />
      {/* TODO: ContrastCard, NavigationModeCard */}
    </div>
  )
}
