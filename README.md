# 🐷 Planeja.ai

> **Seu planejamento financeiro, mais claro e inteligente.**

O **Planeja.ai** é uma aplicação web de planejamento financeiro pessoal desenvolvida durante um desafio da **Digital Innovation One (DIO)**.

A proposta é permitir que a pessoa usuária informe sua renda, gastos, dívidas e um objetivo financeiro para receber uma simulação personalizada e insights gerados por Inteligência Artificial.

A aplicação transforma os dados preenchidos em uma visão mais clara sobre a capacidade financeira atual, o valor necessário para alcançar uma meta e possíveis caminhos para melhorar o planejamento.

---

## 🎯 Sobre o desafio

Este projeto foi desenvolvido a partir do desafio proposto pela **Digital Innovation One**, com o objetivo de praticar a construção de uma aplicação Front-End utilizando React, TypeScript e Inteligência Artificial Generativa.

O projeto-base apresenta um Educador Financeiro Inteligente capaz de analisar os dados de uma simulação financeira e gerar recomendações personalizadas.

A partir da implementação proposta no desafio, foram realizadas algumas melhorias para explorar os conceitos aprendidos e tornar a experiência mais completa.

---

## 🚀 Funcionalidades

### 📊 Simulação financeira

A pessoa usuária informa:

- Renda mensal;
- Custos fixos;
- Dívidas e parcelas;
- Nome da meta;
- Valor da meta;
- Prazo desejado.

A partir dessas informações, a aplicação calcula a capacidade mensal disponível para planejamento.

---

### 🤖 Insights financeiros com IA

Após a simulação, o Planeja.ai utiliza a **API do Google Gemini** para gerar um diagnóstico personalizado.

Os insights são organizados em diferentes dimensões:

- Viabilidade da meta;
- Diagnóstico financeiro;
- Sugestões práticas;
- Possibilidades de renda extra;
- Sugestões de investimento;
- Mensagem motivacional.

A aplicação também possui tratamento para:

- Loading;
- Erros na requisição;
- Respostas inválidas da IA;
- Chamadas duplicadas;
- Persistência dos insights gerados.

---

### 🕘 Histórico de simulações

O Planeja.ai permite consultar simulações já realizadas.

A pessoa usuária pode:

- Visualizar simulações anteriores;
- Acessar os detalhes de uma simulação;
- Consultar os resultados novamente;
- Excluir registros do histórico.

Os dados são persistidos utilizando **localStorage**, permitindo que as simulações permaneçam disponíveis no navegador.

---

### 📈 Análise financeira

Foi adicionada uma análise rápida da situação financeira.

A aplicação apresenta:

- Percentual da renda comprometida;
- Valor necessário para atingir a meta mensalmente;
- Capacidade financeira mensal atual;
- Comparação entre a capacidade atual e o valor necessário para alcançar a meta.

Essa análise permite identificar rapidamente se a meta está dentro da capacidade financeira informada.

---

### 🎯 Simulador interativo de prazo

Foi implementado um simulador que permite ajustar o prazo da meta de maneira interativa utilizando um **slider**.

A ideia é permitir que a pessoa usuária explore diferentes cenários e perceba como a alteração do prazo influencia o planejamento mensal.

Essa funcionalidade complementa a simulação original sem alterar os dados financeiros cadastrados.

---

### 🌙 Tema claro e escuro

A aplicação possui suporte a:

- ☀️ Tema claro;
- 🌙 Tema escuro.

---

## 🧠 Fluxo principal

```text
┌─────────────────────┐
│  Preencher dados    │
│  financeiros        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Gerar simulação     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Cálculos financeiros│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Gemini API           │
│ Diagnóstico com IA   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Resultado            │
│ + análise financeira │
│ + insights           │
└──────────┬──────────┘
           │
           ├──────────────► Histórico
           │
           └──────────────► Simulador de prazo
```

---

## 🛠️ Tecnologias utilizadas

### Front-End

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Interface

- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- React Loading Skeleton

### Inteligência Artificial

- [Google Gemini API](https://ai.google.dev/)

### Gerenciamento e persistência

- React Hooks
- LocalStorage
- React Router

### Qualidade de código

- ESLint
- TypeScript
- Prettier

---

## 📁 Estrutura do projeto

```text
src/
├── components/
│   ├── features/
│   │   ├── Insights/
│   │   ├── Simulation/
│   │   └── SimulationResults/
│   └── shared/
│
├── data/
│   ├── aiPrompt.ts
│   └── simulation.ts
│
├── hooks/
│   ├── useInsight.tsx
│   └── useSimulationStorage.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── SimulationPage.tsx
│   ├── SimulationResultsPage.tsx
│   └── HistoryPage.tsx
│
├── services/
│   └── aiService.ts
│
├── utils/
│   ├── currency.ts
│   └── simulation.ts
│
└── App.tsx
```

> A estrutura pode sofrer pequenas alterações conforme a evolução do projeto.

---

## ⚙️ Como executar

### Pré-requisitos

Antes de começar, certifique-se de possuir:

- Node.js instalado;
- npm instalado;
- Uma chave de API do Google Gemini.

### 1. Clone o repositório

```bash
git clone https://github.com/danieli-dutra/planeja-ai.git
```

Entre na pasta:

```bash
cd planeja-ai
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a API do Gemini

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

> ⚠️ O arquivo `.env.local` não deve ser versionado no GitHub.

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## 🧪 Validação

Durante o desenvolvimento foram utilizados os comandos:

```bash
npm run lint
```

e:

```bash
npm run build
```

O projeto foi validado com sucesso utilizando ESLint e o processo de build do Vite/TypeScript.

---

## 🔍 Como testar o fluxo principal

1. Acesse a aplicação;
2. Inicie uma nova simulação;
3. Informe sua renda mensal;
4. Informe os custos fixos;
5. Informe dívidas ou parcelas;
6. Informe uma meta financeira;
7. Defina o valor e o prazo;
8. Gere a simulação;
9. Aguarde a geração dos insights pela IA;
10. Consulte a análise financeira;
11. Utilize o simulador de prazo;
12. Acesse o histórico;
13. Abra os detalhes de uma simulação anterior;
14. Teste a exclusão de um registro do histórico.

---

## 💡 Principais aprendizados

O desenvolvimento deste projeto permitiu praticar conceitos importantes de desenvolvimento Front-End moderno.

### React + TypeScript

- Criação de componentes reutilizáveis;
- Tipagem de propriedades;
- Hooks;
- Gerenciamento de estado;
- Composição de componentes.

### Persistência no navegador

A implementação e utilização do histórico permitiram trabalhar com:

- `localStorage`;
- Identificação única das simulações;
- Recuperação de dados;
- Atualização de registros;
- Exclusão de registros.

### Integração com IA

A integração com o Gemini trouxe aprendizados sobre:

- Construção de prompts estruturados;
- Consumo de APIs;
- Tratamento de respostas;
- Parsing de JSON;
- Estados de loading;
- Tratamento de erros;
- Prevenção de chamadas duplicadas.

### Experiência do usuário

As melhorias implementadas também permitiram trabalhar com:

- Feedback visual;
- Fluxos de navegação;
- Histórico;
- Simulação interativa;
- Visualização de informações financeiras;
- Tema claro e escuro.

---

## 🚧 Próximos passos

O projeto pode evoluir futuramente com funcionalidades como:

- 📊 Gráficos de evolução financeira;
- 💬 Conversa contínua com o Educador Financeiro;
- 📚 Histórico de perguntas e respostas;
- 📤 Exportação de relatórios;
- 🎯 Acompanhamento da evolução das metas;
- 🔔 Lembretes e notificações;
- 🔐 Autenticação de usuários;
- ☁️ Persistência em banco de dados;
- 📱 Melhorias específicas para dispositivos móveis.

---

## 📌 Observação sobre o projeto

Este projeto foi desenvolvido como parte de um desafio prático da **Digital Innovation One**.

A implementação parte do projeto-base disponibilizado no desafio e incorpora melhorias próprias para aprofundar os conhecimentos adquiridos durante o desenvolvimento.

A proposta foi priorizar **aprendizado, experimentação e evolução incremental**, explorando como React, TypeScript e Inteligência Artificial podem ser utilizados juntos para criar experiências digitais mais úteis.

---

## 👩‍💻 Desenvolvido por

**Danieli Dutra**

Estudante de Análise e Desenvolvimento de Sistemas e desenvolvedora em formação, com interesse em **Desenvolvimento Full Stack, UX/UI e Inteligência Artificial aplicada a produtos digitais**.

### Conecte-se comigo

- 💼 [LinkedIn](https://www.linkedin.com/in/danieli-dutra/)
- 🐙 [GitHub](https://github.com/danieli-dutra/)

---

## ⭐ Se este projeto foi útil para você

Se quiser acompanhar minha evolução em tecnologia, considere deixar uma ⭐ no repositório e acompanhar meus próximos projetos.

---

<div align="center">

**Planeja.ai — planejamento financeiro mais claro, inteligente e acessível. 💜**

</div>

