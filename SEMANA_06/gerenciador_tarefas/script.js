// Importação dos módulos
import { TaskManager } from './modules/TaskManager.js';
import { FormHandler } from './modules/FormHandler.js';
import { FilterManager } from './modules/FilterManager.js';
import { StatisticsManager } from './modules/StatisticsManager.js';
import { UIManager } from './modules/UIManager.js';

// Inicialização da aplicação
class App {
    constructor() {
        this.taskManager = new TaskManager();
        this.formHandler = new FormHandler(this.taskManager);
        this.filterManager = new FilterManager(this.taskManager);
        this.statisticsManager = new StatisticsManager(this.taskManager);
        this.uiManager = new UIManager(this.taskManager);
        
        this.init();
    }

    init() {
        // Inicializar todos os módulos
        this.formHandler.init();
        this.filterManager.init();
        this.statisticsManager.init();
        this.uiManager.init();
        
        // Configurar referências cruzadas
        this.uiManager.setFormHandler(this.formHandler);
        
        // Configurar eventos globais
        this.setupGlobalEvents();
        
        // Carregar tarefas salvas
        this.taskManager.loadTasks();
        
        // Renderizar interface inicial
        this.renderInitialInterface();
    }

    setupGlobalEvents() {
        // Botão de ordenação
        document.getElementById('sortTasks').addEventListener('click', () => {
            this.taskManager.sortTasksByDate();
            this.uiManager.renderTasks();
        });

        // Botão de limpar concluídas
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.taskManager.clearCompletedTasks();
            this.uiManager.renderTasks();
            this.statisticsManager.updateStatistics();
        });

        // Eventos de interação com tarefas
        document.addEventListener('requestTaskToggle', (e) => {
            this.taskManager.toggleTask(e.detail.taskId);
        });

        document.addEventListener('requestTaskEdit', (e) => {
            const task = this.taskManager.findTask(e.detail.taskId);
            if (task) {
                this.formHandler.enterEditMode(task);
            }
        });

        document.addEventListener('requestTaskDelete', (e) => {
            const task = this.taskManager.findTask(e.detail.taskId);
            if (task) {
                this.uiManager.showConfirmationModal(
                    `Tem certeza que deseja excluir a tarefa "${task.title}"?`,
                    () => {
                        this.taskManager.deleteTask(e.detail.taskId);
                    }
                );
            }
        });
    }

    renderInitialInterface() {
        this.uiManager.renderTasks();
        this.statisticsManager.updateStatistics();
    }

    // Método para demonstrar o uso de funções de array
    demonstrateArrayFunctions() {
        console.log('=== DEMONSTRAÇÃO DE FUNÇÕES DE ARRAY ===');
        
        const tasks = this.taskManager.getAllTasks();
        
        if (tasks.length === 0) {
            console.log('Adicione algumas tarefas para ver as demonstrações!');
            return;
        }

        // Exemplo de map() - transformar dados
        const taskTitles = tasks.map(task => task.title);
        console.log('📝 Títulos das tarefas (map):', taskTitles);

        // Exemplo de filter() - filtrar dados
        const pendingTasks = tasks.filter(task => !task.completed);
        console.log('⏳ Tarefas pendentes (filter):', pendingTasks.length);

        // Exemplo de reduce() - calcular estatísticas
        const totalCharacters = tasks.reduce((total, task) => total + task.title.length, 0);
        console.log('📊 Total de caracteres nos títulos (reduce):', totalCharacters);

        // Exemplo de find() - buscar item específico
        const highPriorityTask = tasks.find(task => task.priority === 'alta');
        console.log('🔥 Primeira tarefa de alta prioridade (find):', highPriorityTask?.title || 'Nenhuma');

        // Exemplo de sort() - ordenar dados
        const sortedByTitle = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        console.log('🔤 Tarefas ordenadas alfabeticamente (sort):', sortedByTitle.map(t => t.title));

        // Exemplo de forEach() - iterar sobre dados
        console.log('🔄 Iterando com forEach():');
        tasks.forEach((task, index) => {
            console.log(`  ${index + 1}. ${task.title} - ${task.completed ? '✅' : '⏳'}`);
        });

        console.log('=========================================');
    }
}

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    
    // Disponibilizar globalmente para demonstrações
    window.app = app;
    
    // Exemplo de uso das funções de array para seus alunos
    console.log('=== EXEMPLOS DE FUNÇÕES DE ARRAY ===');
    console.log('Este gerenciador de tarefas utiliza:');
    console.log('- map() para transformar dados');
    console.log('- filter() para filtrar tarefas');
    console.log('- reduce() para calcular estatísticas');
    console.log('- forEach() para iteração');
    console.log('- find() para buscar tarefas específicas');
    console.log('- sort() para ordenação');
    console.log('');
    console.log('Para ver exemplos práticos, digite:');
    console.log('app.demonstrateArrayFunctions()');
    console.log('=====================================');
});