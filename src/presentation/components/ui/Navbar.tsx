'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/painel', label: 'Painel', icon: '⚙️' },
  { href: '/atividades', label: 'Atividades', icon: '✅' },
  { href: '/perfil', label: 'Perfil', icon: '👤' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900">
          Senior<span className="text-blue-600">Ease</span>
        </span>
        <nav aria-label="Navegação principal">
          <ul className="flex gap-1">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
