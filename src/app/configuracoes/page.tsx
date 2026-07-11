'use client'
import { useState } from 'react'

type FontSize = 14 | 18 | 20 | 24 | 28
type Contrast = 'padrao' | 'alto' | 'preto-amarelo'
type Spacing  = 'compacto' | 'normal' | 'confortavel'
type NavMode  = 'basico' | 'avancado'

const CONFIG_SECTIONS = [
  { key: 'acessibilidade', label: 'Acessibilidade', icon: '♿' },
  { key: 'aparencia',      label: 'Aparência',      icon: '🎨' },
  { key: 'notificacoes',   label: 'Notificações',   icon: '🔔' },
  { key: 'conta',          label: 'Conta',          icon: '👤' },
  { key: 'seguranca',      label: 'Segurança',      icon: '🔒' },
]

function RadioBtn({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button onClick={onChange} style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
      borderRadius: 8, border: `1.5px solid ${checked ? '#2F80ED' : '#e5e7eb'}`,
      background: checked ? '#eff6ff' : '#fff', cursor: 'pointer',
      fontSize: 13, fontWeight: checked ? 600 : 400,
      color: checked ? '#2F80ED' : '#374151', transition: 'all 0.15s',
    }}>
      <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${checked ? '#2F80ED' : '#d1d5db'}`, background: checked ? '#2F80ED' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
      </span>
      {label}
    </button>
  )
}

function ToggleRow({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 14, color: '#374151' }}>{label}</span>
      <button onClick={onChange} role="switch" aria-checked={checked} aria-label={label} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: checked ? '#2F80ED' : '#d1d5db', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', left: checked ? 23 : 3 }} />
      </button>
    </div>
  )
}

export default function ConfiguracoesPage() {
  const [section,  setSection]  = useState('acessibilidade')
  const [fontSize, setFontSize] = useState<FontSize>(24)
  const [contrast, setContrast] = useState<Contrast>('padrao')
  const [spacing,  setSpacing]  = useState<Spacing>('normal')
  const [navMode,  setNavMode]  = useState<NavMode>('basico')
  const [feedback, setFeedback] = useState(true)
  const [confirm,  setConfirm]  = useState(true)
  const [saved,    setSaved]    = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 'calc(100vh - 60px)' }}>

      {/* Submenu lateral de configurações */}
      <aside style={{ width: 196, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px 10px', flexShrink: 0 }}>
        <ul style={{ listStyle: 'none' }}>
          {CONFIG_SECTIONS.map(s => (
            <li key={s.key}>
              <button onClick={() => setSection(s.key)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                background: section === s.key ? '#eff6ff' : 'transparent',
                color: section === s.key ? '#2F80ED' : '#6b7280',
                fontSize: 14, fontWeight: section === s.key ? 600 : 400, transition: 'all 0.15s',
              }}>
                <span>{s.icon}</span>{s.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Painel de acessibilidade */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        {saved && (
          <div role="status" aria-live="polite" style={{ position: 'fixed', top: 24, right: 24, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#15803d' }}>Alterações salvas com sucesso!</span>
          </div>
        )}

        <div style={{ maxWidth: 620 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Acessibilidade</h2>

            {/* Fonte */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Tamanho da fonte</label>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#2F80ED' }}>{fontSize}px</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>A-</span>
                <input type="range" min={14} max={28} step={2} value={fontSize} onChange={e => setFontSize(Number(e.target.value) as FontSize)} aria-label="Tamanho da fonte" style={{ flex: 1, accentColor: '#2F80ED' }} />
                <span style={{ fontSize: 18, color: '#9ca3af', fontWeight: 600 }}>A+</span>
              </div>
              <div style={{ marginTop: 10, padding: '10px 14px', background: '#f9fafb', borderRadius: 8, border: '1px solid #f3f4f6' }}>
                <span style={{ fontSize, color: '#374151' }}>Exemplo de texto com {fontSize}px</span>
              </div>
            </div>

            {/* Contraste */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Contraste</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <RadioBtn checked={contrast === 'padrao'}        onChange={() => setContrast('padrao')}        label="Padrão" />
                <RadioBtn checked={contrast === 'alto'}          onChange={() => setContrast('alto')}          label="Alto contraste" />
                <RadioBtn checked={contrast === 'preto-amarelo'} onChange={() => setContrast('preto-amarelo')} label="Preto e amarelo" />
              </div>
            </div>

            {/* Espaçamento */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Espaçamento entre elementos</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <RadioBtn checked={spacing === 'compacto'}    onChange={() => setSpacing('compacto')}    label="Compacto" />
                <RadioBtn checked={spacing === 'normal'}      onChange={() => setSpacing('normal')}      label="Normal" />
                <RadioBtn checked={spacing === 'confortavel'} onChange={() => setSpacing('confortavel')} label="Confortável" />
              </div>
            </div>

            {/* Modo de navegação */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Modo de navegação</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <RadioBtn checked={navMode === 'basico'}   onChange={() => setNavMode('basico')}   label="Básico" />
                <RadioBtn checked={navMode === 'avancado'} onChange={() => setNavMode('avancado')} label="Avançado" />
              </div>
            </div>

            <ToggleRow label="Feedback visual reforçado"                  checked={feedback} onChange={() => setFeedback(v => !v)} />
            <ToggleRow label="Confirmação adicional antes de ações críticas" checked={confirm}  onChange={() => setConfirm(v => !v)} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 28 }}>
              <button style={{ padding: '10px 22px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
                Restaurar padrão
              </button>
              <button onClick={handleSave} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#2F80ED', fontSize: 14, color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
