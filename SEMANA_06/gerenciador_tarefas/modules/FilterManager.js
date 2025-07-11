// Módulo responsável por gerenciar filtros de tarefas
export class FilterManager {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.currentFilters = {
            category: '',
            status: '',
            priority: ''
        };
    }

    init() {
        this.setupEventListeners();
        this.renderFilterOptions();
    }

    setupEventListeners() {
        // Filtro por categoria
        document.getElementById('filterCategory').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.applyFilters();
        });

        // Filtro por status
        document.getElementById('filterStatus').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.applyFilters();
        });

        // Filtro por prioridade
        document.getElementById('filterPriority').addEventListener('change', (e) => {
            this.currentFilters.priority = e.target.value;
            this.applyFilters();
        });

        // Escutar mudanças nas tarefas para atualizar filtros
        document.addEventListener('tasksChanged', () => {
            this.updateFilterOptions();
        });
    }

    applyFilters() {
        const filteredTasks = this.getFilteredTasks();
        
        // Disparar evento customizado com tarefas filtradas
        const event = new CustomEvent('tasksFiltered', {
            detail: {
                tasks: filteredTasks,
                filters: this.currentFilters
            }
        });
        document.dispatchEvent(event);
        
        console.log(`🔍 Filtros aplicados: ${filteredTasks.length} tarefas encontradas`);
    }

    getFilteredTasks() {
        const allTasks = this.taskManager.getAllTasks();
        
        // Usar filter() para aplicar todos os filtros
        return allTasks.filter(task => {
            // Filtro por categoria
            if (this.currentFilters.category && task.category !== this.currentFilters.category) {
                return false;
            }
            
            // Filtro por status
            if (this.currentFilters.status) {
                if (this.currentFilters.status === 'pendente' && task.completed) return false;
                if (this.currentFilters.status === 'concluida' && !task.completed) return false;
            }
            
            // Filtro por prioridade
            if (this.currentFilters.priority && task.priority !== this.currentFilters.priority) {
                return false;
            }
            
            return true;
        });
    }

    renderFilterOptions() {
        this.updateFilterOptions();
    }

    updateFilterOptions() {
        const allTasks = this.taskManager.getAllTasks();
        
        // Usar reduce() para contar ocorrências de cada categoria
        const categoryCount = allTasks.reduce((acc, task) => {
            acc[task.category] = (acc[task.category] || 0) + 1;
            return acc;
        }, {});

        // Usar reduce() para contar ocorrências de cada prioridade
        const priorityCount = allTasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});

        // Atualizar opções do select de categoria
        this.updateSelectOptions('filterCategory', categoryCount, {
            'trabalho': 'Trabalho',
            'estudos': 'Estudos',
            'pessoal': 'Pessoal',
            'saude': 'Saúde',
            'lazer': 'Lazer'
        });

        // Atualizar opções do select de prioridade
        this.updateSelectOptions('filterPriority', priorityCount, {
            'alta': 'Alta',
            'media': 'Média',
            'baixa': 'Baixa'
        });
    }

    updateSelectOptions(selectId, countData, labelMap) {
        const select = document.getElementById(selectId);
        const currentValue = select.value;
        
        // Limpar opções atuais (exceto a primeira)
        const options = select.querySelectorAll('option');
        options.forEach((option, index) => {
            if (index > 0) option.remove();
        });

        // Usar map() para criar novas opções
        const sortedEntries = Object.entries(countData)
            .sort((a, b) => b[1] - a[1]); // Ordenar por quantidade

        sortedEntries.forEach(([key, count]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${labelMap[key]} (${count})`;
            select.appendChild(option);
        });

        // Restaurar valor selecionado
        select.value = currentValue;
    }

    clearFilters() {
        this.currentFilters = {
            category: '',
            status: '',
            priority: ''
        };

        // Limpar selects
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterStatus').value = '';
        document.getElementById('filterPriority').value = '';

        this.applyFilters();
    }

    // Exemplo de uso de map() para obter valores dos filtros
    getFilterValues() {
        return Object.entries(this.currentFilters).map(([key, value]) => ({
            filter: key,
            value: value,
            active: !!value
        }));
    }

    // Exemplo de uso de filter() para obter filtros ativos
    getActiveFilters() {
        return this.getFilterValues().filter(filter => filter.active);
    }

    // Exemplo de uso de reduce() para contar tarefas por filtro
    getFilterStatistics() {
        const allTasks = this.taskManager.getAllTasks();
        
        return {
            byCategory: allTasks.reduce((acc, task) => {
                acc[task.category] = (acc[task.category] || 0) + 1;
                return acc;
            }, {}),
            
            byStatus: allTasks.reduce((acc, task) => {
                const status = task.completed ? 'concluida' : 'pendente';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {}),
            
            byPriority: allTasks.reduce((acc, task) => {
                acc[task.priority] = (acc[task.priority] || 0) + 1;
                return acc;
            }, {})
        };
    }

    // Exemplo de uso de forEach() para aplicar filtros personalizados
    applyCustomFilters(customFilters) {
        const allTasks = this.taskManager.getAllTasks();
        
        let filteredTasks = [...allTasks];
        
        // Aplicar cada filtro personalizado
        customFilters.forEach(filter => {
            filteredTasks = filteredTasks.filter(filter.condition);
        });
        
        return filteredTasks;
    }

    // Exemplo de uso de find() para buscar por texto
    searchTasks(searchTerm) {
        const allTasks = this.taskManager.getAllTasks();
        
        if (!searchTerm) return allTasks;
        
        const term = searchTerm.toLowerCase();
        
        return allTasks.filter(task => 
            task.title.toLowerCase().includes(term) ||
            task.description.toLowerCase().includes(term)
        );
    }
}
