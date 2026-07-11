# SeniorEase — Web

Plataforma de acessibilidade digital para idosos.
Projeto final POSTECH Front-End Engineering — Hackathon.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clean Architecture

## Estrutura

```
src/
├── domain/                        # Regras de negócio — zero dependências externas
│   ├── entities/
│   │   ├── User.ts                # User, UserPreferences
│   │   └── Activity.ts            # Activity, ActivityStep, ActivityStatus
│   ├── repositories/
│   │   ├── IUserRepository.ts     # Interface do repositório de usuário
│   │   └── IActivityRepository.ts # Interface do repositório de atividades
│   └── use-cases/
│       ├── UpdatePreferencesUseCase.ts
│       ├── GetActivitiesUseCase.ts
│       └── ToggleActivityUseCase.ts
│
├── application/
│   └── dtos/
│       └── PreferencesDTO.ts
│
├── infrastructure/                # Implementações concretas (substituíveis)
│   └── storage/
│       ├── LocalStorageUserRepository.ts
│       └── LocalStorageActivityRepository.ts
│
├── presentation/                  # Camada React/Next.js
│   ├── components/
│   │   ├── ui/                    # Componentes reutilizáveis
│   │   │   ├── Toggle.tsx
│   │   │   ├── SliderControl.tsx
│   │   │   └── FeedbackBanner.tsx
│   │   ├── painel/
│   │   │   ├── FontCard.tsx
│   │   │   └── SafetyCard.tsx
│   │   └── atividades/
│   │       └── ActivityItem.tsx
│   ├── hooks/
│   │   └── useActivities.ts
│   └── contexts/
│       └── PreferencesContext.tsx
│
└── app/                           # Next.js App Router
    ├── layout.tsx
    ├── globals.css
    ├── painel/page.tsx
    ├── atividades/page.tsx
    └── perfil/page.tsx
```

## Como rodar

```bash
npm install
npm run dev
```

## Princípios de Clean Architecture aplicados

- **Domínio** não importa nada do React, Next.js ou localStorage
- **Use cases** dependem apenas de interfaces (inversão de dependência)
- **Infrastructure** implementa as interfaces definidas pelo domínio
- **Presentation** consome use cases via hooks e contexts — nunca acessa infra diretamente
- Para trocar localStorage por API REST: basta criar novos repositórios implementando as mesmas interfaces
