// Módulo responsável por gerenciar as tarefas
export class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
        this.storageKey = 'tasks-gerenciador';
    }

    // Adicionar nova tarefa
    addTask(taskData) {
        const task = {
            id: this.currentId++,
            title: taskData.title,
            description: taskData.description || '',
            category: taskData.category || 'pessoal',
            priority: taskData.priority || 'media',
            dueDate: taskData.dueDate || null,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        this.tasks.push(task);
        this.saveTasks();
        this.dispatchTasksChanged();
        
        console.log('📝 Tarefa adicionada:', task);
        return task;
    }

    // Buscar tarefa por ID - Exemplo de uso do método find()
    findTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Atualizar tarefa
    updateTask(id, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
            this.saveTasks();
            this.dispatchTasksChanged();
            console.log('✏️ Tarefa atualizada:', this.tasks[taskIndex]);
            return this.tasks[taskIndex];
        }
        return null;
    }

    // Marcar tarefa como concluída
    toggleTask(id) {
        const task = this.findTask(id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.dispatchTasksChanged();
            console.log(`✅ Tarefa ${task.completed ? 'concluída' : 'reaberta'}:`, task);
        }
    }

    // Remover tarefa
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const deletedTask = this.tasks.splice(taskIndex, 1)[0];
            this.saveTasks();
            this.dispatchTasksChanged();
            console.log('🗑️ Tarefa removida:', deletedTask);
            return deletedTask;
        }
        return null;
    }

    // Filtrar tarefas - Exemplo de uso do método filter()
    filterTasks(filters) {
        return this.tasks.filter(task => {
            // Filtro por categoria
            if (filters.category && task.category !== filters.category) {
                return false;
            }
            
            // Filtro por status
            if (filters.status) {
                if (filters.status === 'pendente' && task.completed) return false;
                if (filters.status === 'concluida' && !task.completed) return false;
            }
            
            // Filtro por prioridade
            if (filters.priority && task.priority !== filters.priority) {
                return false;
            }
            
            return true;
        });
    }

    // Ordenar tarefas por data - Exemplo de uso do método sort()
    sortTasksByDate() {
        this.tasks.sort((a, b) => {
            // Primeiro por data de vencimento (tarefas sem data vão para o final)
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            
            return dateA - dateB;
        });
        
        this.saveTasks();
        this.dispatchTasksChanged();
        console.log('📅 Tarefas ordenadas por data');
    }

    // Limpar tarefas concluídas
    clearCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.completed);
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
        this.dispatchTasksChanged();
        console.log(`🧹 ${completedTasks.length} tarefas concluídas removidas`);
    }

    // Obter estatísticas das tarefas - Exemplo de uso do método reduce()
    getStatistics() {
        return this.tasks.reduce((stats, task) => {
            stats.total++;
            
            if (task.completed) {
                stats.completed++;
            } else {
                stats.pending++;
                
                // Verificar se está atrasada
                if (task.dueDate && new Date(task.dueDate) < new Date()) {
                    stats.overdue++;
                }
            }
            
            // Contar por categoria
            stats.byCategory[task.category] = (stats.byCategory[task.category] || 0) + 1;
            
            // Contar por prioridade
            stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
            
            return stats;
        }, {
            total: 0,
            completed: 0,
            pending: 0,
            overdue: 0,
            byCategory: {},
            byPriority: {}
        });
    }

    // Obter todas as tarefas
    getAllTasks() {
        return [...this.tasks]; // Retorna uma cópia para evitar modificações diretas
    }

    // Salvar tarefas no localStorage
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    }

    // Carregar tarefas do localStorage
    loadTasks() {
        try {
            const savedTasks = localStorage.getItem(this.storageKey);
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
                // Atualizar o contador de ID
                this.currentId = Math.max(...this.tasks.map(task => task.id), 0) + 1;
                console.log(`📂 ${this.tasks.length} tarefas carregadas`);
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            this.tasks = [];
        }
    }

    // Disparar evento customizado quando tarefas mudarem
    dispatchTasksChanged() {
        const event = new CustomEvent('tasksChanged', {
            detail: {
                tasks: this.tasks,
                statistics: this.getStatistics()
            }
        });
        document.dispatchEvent(event);
    }

    // Exemplo de uso do método map() para transformar dados
    getTasksForExport() {
        return this.tasks.map(task => ({
            titulo: task.title,
            descricao: task.description,
            categoria: task.category,
            prioridade: task.priority,
            status: task.completed ? 'Concluída' : 'Pendente',
            dataVencimento: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sem data',
            dataCriacao: new Date(task.createdAt).toLocaleDateString()
        }));
    }

    // Exemplo de uso do método forEach() para iteração
    logAllTasks() {
        console.log('=== TODAS AS TAREFAS ===');
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title} - ${task.completed ? '✅' : '⏳'}`);
        });
    }
}
