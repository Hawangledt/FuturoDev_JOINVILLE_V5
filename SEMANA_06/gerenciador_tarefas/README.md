# Gerenciador de Tarefas - Guia Educacional

## 📚 Conceitos Demonstrados

Este gerenciador de tarefas foi criado para ensinar diversos conceitos importantes de JavaScript, incluindo:

### 1. 📝 Formulários HTML
- **Validação de campos**: Validação em tempo real e no envio
- **Diferentes tipos de input**: text, textarea, select, date
- **Manipulação de FormData**: Captura e processamento de dados do formulário
- **Eventos de formulário**: submit, input, blur, focus

### 2. 🔧 Módulos JavaScript (ES6)
- **Separação de responsabilidades**: Cada módulo tem uma função específica
- **Import/Export**: Importação e exportação de classes e funções
- **Encapsulamento**: Dados e métodos organizados em classes

### 3. 🚀 Funções de Array

#### map() - Transformar dados
```javascript
// Exemplo: Converter tarefas em títulos
const taskTitles = tasks.map(task => task.title);

// Exemplo: Transformar dados para exibição
const taskDisplay = tasks.map(task => ({
    titulo: task.title,
    status: task.completed ? 'Concluída' : 'Pendente'
}));
```

#### filter() - Filtrar elementos
```javascript
// Exemplo: Filtrar tarefas pendentes
const pendingTasks = tasks.filter(task => !task.completed);

// Exemplo: Filtrar por categoria
const workTasks = tasks.filter(task => task.category === 'trabalho');
```

#### reduce() - Calcular estatísticas
```javascript
// Exemplo: Contar total de caracteres
const totalChars = tasks.reduce((total, task) => total + task.title.length, 0);

// Exemplo: Calcular estatísticas complexas
const stats = tasks.reduce((acc, task) => {
    acc.total++;
    if (task.completed) acc.completed++;
    return acc;
}, { total: 0, completed: 0 });
```

#### find() - Buscar elemento específico
```javascript
// Exemplo: Encontrar tarefa por ID
const task = tasks.find(task => task.id === targetId);

// Exemplo: Encontrar primeira tarefa de alta prioridade
const highPriorityTask = tasks.find(task => task.priority === 'alta');
```

#### sort() - Ordenar elementos
```javascript
// Exemplo: Ordenar por data
tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

// Exemplo: Ordenar alfabeticamente
tasks.sort((a, b) => a.title.localeCompare(b.title));
```

#### forEach() - Iterar sobre elementos
```javascript
// Exemplo: Processar cada tarefa
tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.title}`);
});
```

## 🏗️ Estrutura do Projeto

```
gerenciador_tarefas/
├── main.html          # Interface principal
├── styles.css         # Estilos visuais
├── script.js          # Arquivo principal
└── modules/           # Módulos organizados
    ├── TaskManager.js      # Gerenciamento de tarefas
    ├── FormHandler.js      # Manipulação de formulários
    ├── FilterManager.js    # Sistema de filtros
    ├── StatisticsManager.js # Cálculo de estatísticas
    └── UIManager.js        # Interface do usuário
```

## 🎯 Casos de Uso Educacionais

### Para Ensinar map()
1. Mostre como converter array de tarefas em array de títulos
2. Demonstre transformação de dados para diferentes formatos
3. Explique como criar novos arrays sem modificar o original

### Para Ensinar filter()
1. Implemente filtros por categoria, status e prioridade
2. Mostre como combinar múltiplos filtros
3. Demonstre busca por texto

### Para Ensinar reduce()
1. Calcule estatísticas como total, concluídas, pendentes
2. Agrupe tarefas por categoria ou prioridade
3. Compute valores como média, soma, etc.

### Para Ensinar find()
1. Busque tarefas específicas por ID
2. Encontre primeira tarefa que atende critério
3. Implemente busca por propriedades específicas

### Para Ensinar sort()
1. Ordene tarefas por data de vencimento
2. Ordene alfabeticamente por título
3. Ordene por prioridade (alta, média, baixa)

### Para Ensinar forEach()
1. Itere sobre tarefas para exibição
2. Processe cada tarefa individualmente
3. Execute operações em lote

## 🎮 Demonstrações Interativas

### No Console do Navegador:
```javascript
// Visualizar todas as tarefas
app.taskManager.getAllTasks()

// Demonstrar funções de array
app.demonstrateArrayFunctions()

// Ver estatísticas
app.statisticsManager.generateReport()

// Filtrar tarefas
app.filterManager.getFilteredTasks()

// Exportar dados
app.taskManager.getTasksForExport()
```

## 📖 Exercícios Sugeridos

1. **Iniciante**: Adicione novas categorias de tarefas
2. **Intermediário**: Implemente busca por texto
3. **Avançado**: Adicione sistema de tags
4. **Desafio**: Implemente drag-and-drop para reordenar tarefas

## 🔍 Conceitos Avançados

- **Event Listeners**: Manipulação de eventos DOM
- **Local Storage**: Persistência de dados no navegador
- **Custom Events**: Comunicação entre módulos
- **Responsividade**: CSS Grid e Flexbox
- **Validação**: Validação de formulários em tempo real

## 🎨 Personalização

Encoraje seus alunos a:
- Modificar cores e estilos
- Adicionar novas funcionalidades
- Criar novos tipos de filtros
- Implementar diferentes visualizações
- Adicionar animações e transições

## 🤝 Boas Práticas Demonstradas

- **Separação de responsabilidades**: Cada módulo tem uma função específica
- **Nomenclatura clara**: Nomes de variáveis e funções explicativos
- **Comentários úteis**: Documentação do código
- **Tratamento de erros**: Try/catch para operações críticas
- **Acessibilidade**: Labels e atributos apropriados
- **Performance**: Uso eficiente de funções de array

---

**Dica**: Use o console do navegador para experimentar com as funções de array em tempo real!
