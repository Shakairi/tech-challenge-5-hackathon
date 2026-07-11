'use client'
import { useState } from 'react'
import Link from 'next/link'

type Priority = 'Alta' | 'Média' | 'Baixa'
type Tab      = 'Pendentes' | 'Concluídas' | 'Todas'

interface Task {
  id: number; title: string; category: string
  priority: Priority; date: string; done: boolean
}

const PRIORITY_STYLE: Record<Priority, { color: string; bg: string }> = {
  Alta:  { color: '#ef4444', bg: '#fee2e2' },
  Média: { color: '#d97706', bg: '#fef3c7' },
  Baixa: { color: '#16a34a', bg: '#dcfce7' },
}

const INITIAL: Task[] = [
  { id: 1, title: 'Enviar atividade de UX Design', category: 'Disciplina de Design',    priority: 'Alta',  date: 'Hoje • 11:59',    done: false },
  { id: 2, title: 'Ler capítulo do livro',          category: 'Fundamentos de UX',       priority: 'Média', date: 'Hoje • 18:00',    done: false },
  { id: 3, title: 'Exercícios de Alongamento',      category: 'Saúde e bem-estar',       priority: 'Baixa', date: 'Amanhã • 09:00',  done: false },
  { id: 4, title: 'Estudar para prova de Front-end', category: 'Disciplina de Programação', priority: 'Média', date: '20/05 • 15:00', done: false },
]

function EditIcon() { return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> }
function TrashIcon() { return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> }
function PlusIcon() { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> }

export default function TarefasPage() {
  const [tasks,       setTasks]       = useState<Task[]>(INITIAL)
  const [tab,         setTab]         = useState<Tab>('Pendentes')
  const [deleteId,    setDeleteId]    = useState<number | null>(null)

  const toggle = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const remove = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    setDeleteId(null)
  }

  const filtered = tasks.filter(t =>
    tab === 'Todas' ? true : tab === 'Concluídas' ? t.done : !t.done
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f6fa', minHeight: '100vh' }}>
      <main id="main-content" style={{ flex: 1, padding: 32 }}>
        <div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>Minhas Tarefas</h1>
            <Link href="/tarefas/nova" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 10, background: '#2F80ED',
              color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            }}>
              <PlusIcon /> Nova tarefa
            </Link>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #e5e7eb', marginBottom: 20 }}>
            {(['Pendentes', 'Concluídas', 'Todas'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '10px 20px', border: 'none', background: 'transparent',
                fontSize: 14, fontWeight: tab === t ? 600 : 400, cursor: 'pointer',
                color: tab === t ? '#2F80ED' : '#9ca3af',
                borderBottom: tab === t ? '2px solid #2F80ED' : '2px solid transparent',
                marginBottom: -2, transition: 'all 0.15s',
              }}>
                {t}
              </button>
            ))}
          </div>

          {/* Lista */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 15 }}>
                Nenhuma tarefa encontrada.
              </div>
            ) : (
              <ul style={{ listStyle: 'none' }}>
                {filtered.map((task, i) => {
                  const ps = PRIORITY_STYLE[task.priority]
                  return (
                    <li key={task.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '16px 20px',
                      borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                    }}>
                      {/* Checkbox */}
                      <button
                        onClick={() => toggle(task.id)}
                        aria-label={task.done ? `Desmarcar: ${task.title}` : `Concluir: ${task.title}`}
                        aria-pressed={task.done}
                        style={{
                          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                          border: task.done ? 'none' : `2px solid ${ps.color}`,
                          background: task.done ? '#6FCF97' : 'transparent',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {task.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5L20 7"/></svg>}
                      </button>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: 14, fontWeight: 500, color: '#1a1a2e',
                            textDecoration: task.done ? 'line-through' : 'none',
                            opacity: task.done ? 0.5 : 1,
                          }}>{task.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                          <span style={{ fontSize: 12, color: '#9ca3af' }}>{task.category}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, color: ps.color, background: ps.bg }}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <span style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>{task.date}</span>

                      {/* Ações */}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link href="/tarefas/nova" aria-label={`Editar: ${task.title}`} style={{
                          width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb',
                          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', textDecoration: 'none',
                        }}>
                          <EditIcon />
                        </Link>
                        <button
                          onClick={() => setDeleteId(task.id)}
                          aria-label={`Excluir: ${task.title}`}
                          style={{
                            width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb',
                            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Modal de confirmação de exclusão */}
      {deleteId !== null && (
        <div role="dialog" aria-modal="true" aria-label="Confirmar exclusão" style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 360, width: '90%', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>Excluir tarefa?</h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Esta ação não pode ser desfeita.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteId(null)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: '1.5px solid #e5e7eb',
                background: '#fff', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500,
              }}>Cancelar</button>
              <button onClick={() => remove(deleteId)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                background: '#ef4444', fontSize: 14, color: '#fff', cursor: 'pointer', fontWeight: 600,
              }}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
