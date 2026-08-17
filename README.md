# 🐷 Planeja.ai

> **Seu planejamento financeiro, mais claro e inteligente.**

Uma aplicação web de planejamento financeiro que combina **simulação, análise de cenários e Inteligência Artificial** em uma experiência simples e visual.

A pessoa usuária informa sua renda, gastos, dívidas e uma meta financeira. A aplicação calcula sua capacidade mensal, apresenta uma análise do cenário e utiliza o Google Gemini para gerar insights personalizados.

## 🔗 Teste o projeto

### 💜 [Acessar o Planeja.ai](https://planeja-ai-br.vercel.app/)

O projeto está disponível para teste diretamente pelo navegador.

Também é possível clonar o repositório e executar a aplicação localmente seguindo as instruções abaixo.

---

## 🎯 Sobre o projeto

O Planeja.ai foi desenvolvido a partir de um desafio da **Digital Innovation One (DIO)**, com foco na construção de uma aplicação Front-End utilizando React, TypeScript e Inteligência Artificial Generativa.

Durante o desenvolvimento, foram implementadas funcionalidades adicionais e melhorias de arquitetura, experiência do usuário e segurança.

---

## 🚀 Funcionalidades

### 📊 Simulação financeira

A pessoa usuária informa:

* Renda mensal
* Custos fixos
* Dívidas e parcelas
* Nome da meta
* Valor da meta
* Prazo desejado

A aplicação utiliza esses dados para calcular a capacidade financeira mensal e o valor necessário para alcançar a meta dentro do prazo informado.

### 🤖 Insights financeiros com IA

O Google Gemini analisa os dados da simulação e gera um diagnóstico personalizado com:

* Viabilidade da meta
* Diagnóstico financeiro
* Sugestões práticas
* Possibilidades de renda extra
* Sugestões de investimento
* Mensagem motivacional

A integração também conta com loading, tratamento de erros, validação da resposta e controle de chamadas duplicadas.

### 🔐 API protegida

A comunicação com o Gemini utiliza uma **Serverless Function da Vercel**.

A chave da API não é exposta no código executado pelo navegador.

```text
┌──────────────────────┐
│     Planeja.ai       │
│     Front-End        │
└──────────┬───────────┘
           │
           │ POST /api/insight
           ▼
┌──────────────────────┐
│ Vercel Serverless    │
│      Function        │
└──────────┬───────────┘
           │
           │ GEMINI_API_KEY
           ▼
┌──────────────────────┐
│     Google Gemini    │
└──────────────────────┘
```

A variável `GEMINI_API_KEY` fica armazenada no ambiente do servidor.

### 🕘 Histórico de simulações

As simulações podem ser consultadas posteriormente.

É possível:

* Visualizar simulações anteriores
* Acessar seus resultados
* Consultar os insights novamente
* Excluir registros

O histórico utiliza `localStorage` para persistência no navegador.

### 📈 Análise financeira

A página de resultados apresenta:

* Percentual da renda comprometida
* Capacidade financeira mensal
* Valor necessário para alcançar a meta
* Comparação entre a capacidade atual e o valor necessário

### 🎯 Simulador interativo de prazo

Um **slider** permite alterar o prazo da meta e visualizar como a mudança interfere no valor necessário para economizar mensalmente.

A funcionalidade permite comparar diferentes cenários sem precisar iniciar uma nova simulação.

### 🌙 Tema claro e escuro

A aplicação possui suporte para:

* ☀️ Tema claro
* 🌙 Tema escuro

---

## 🧠 Fluxo da aplicação

```text
Preenchimento dos dados
          │
          ▼
     Simulação
          │
          ▼
 Cálculos financeiros
          │
          ▼
   /api/insight
          │
          ▼
    Google Gemini
          │
          ▼
      Resultados
       /      \
      ▼        ▼
 Histórico   Simulador
```

---

## 🛠️ Tecnologias

### Front-End

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Interface

* Radix UI
* Lucide React
* React Loading Skeleton

### Inteligência Artificial

* Google Gemini API
* Vercel Serverless Functions

### Persistência

* LocalStorage
* React Hooks

### Qualidade de código

* ESLint
* TypeScript
* Prettier

---

## 📁 Estrutura do projeto

```text
planeja-ai/
├── api/
│   └── insight.ts
│
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── Insights/
│   │   │   ├── Simulation/
│   │   │   └── SimulationResults/
│   │   └── shared/
│   │
│   ├── data/
│   │   ├── aiPrompt.ts
│   │   └── simulation.ts
│   │
│   ├── hooks/
│   │   ├── useInsight.tsx
│   │   └── useSimulationStorage.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SimulationPage.tsx
│   │   ├── SimulationResultsPage.tsx
│   │   └── HistoryPage.tsx
│   │
│   ├── services/
│   │   └── aiService.ts
│   │
│   ├── utils/
│   │   ├── currency.ts
│   │   └── simulation.ts
│   │
│   └── App.tsx
│
├── .env.local
├── package.json
└── vite.config.ts
```

---

## ⚙️ Como executar localmente

### Pré-requisitos

* Node.js
* npm
* Chave de API do Google Gemini
* Vercel CLI

### 1. Clone o repositório

```bash
git clone https://github.com/danieli-dutra/planeja-ai.git
cd planeja-ai
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a variável de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Não versione arquivos `.env` ou `.env.local`.

### 4. Execute a aplicação

Como o projeto utiliza uma Serverless Function para a integração com o Gemini, execute:

```bash
vercel dev
```

O Vercel CLI informará o endereço local disponível.

---

## 🧪 Validação

Durante o desenvolvimento, o projeto foi validado com:

```bash
npm run lint
```

```bash
npm run build
```

Também foi realizado um teste direto do endpoint `/api/insight` para verificar a comunicação entre a aplicação, a Serverless Function e o Gemini.

O build foi concluído com sucesso e o código passou pela validação do ESLint.

---

## 💡 Principais aprendizados

### React e TypeScript

* Componentização
* Props tipadas
* Hooks
* Gerenciamento de estado
* Composição de componentes
* Organização de responsabilidades

### Integração com IA

* Construção de prompts estruturados
* Consumo de APIs
* Parsing de JSON
* Tratamento de respostas inválidas
* Estados de loading
* Tratamento de erros
* Controle de chamadas duplicadas

### Segurança

A implementação da Serverless Function trouxe uma experiência prática sobre o cuidado necessário ao trabalhar com credenciais de APIs externas.

A chave do Gemini deixou de ser utilizada diretamente no Front-End e passou a ser acessada pelo ambiente da função.

### Persistência

O histórico permitiu trabalhar com:

* `localStorage`
* Identificação das simulações
* Recuperação de dados
* Atualização de registros
* Exclusão de registros

### Experiência do usuário

O desenvolvimento também envolveu decisões relacionadas a:

* Hierarquia de informações
* Feedback visual
* Estados de carregamento
* Tratamento de erros
* Navegação
* Simulação interativa
* Tema claro e escuro

---

## 🚧 Próximos passos

* 📊 Gráficos de evolução financeira
* 💬 Conversa contínua com o Educador Financeiro
* 📚 Histórico de perguntas e respostas
* 📤 Exportação de relatórios
* 🎯 Acompanhamento da evolução das metas
* 🔔 Lembretes e notificações
* 🔐 Autenticação de usuários
* ☁️ Persistência em banco de dados
* 📱 Aprimoramentos para dispositivos móveis

---

## 👩‍💻 Desenvolvido por

**Danieli Dutra**

Estudante de Análise e Desenvolvimento de Sistemas, com foco em **Desenvolvimento Full Stack, UX/UI e Inteligência Artificial aplicada a produtos digitais**.

### Conecte-se comigo

* 💼 [LinkedIn](https://www.linkedin.com/in/danieli-dutra/)
* 🐙 [GitHub](https://github.com/danieli-dutra/)

---

<div align="center">

### 🐷 Planeja.ai

**Planejamento financeiro mais claro, inteligente e acessível. 💜**

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório.

</div>
