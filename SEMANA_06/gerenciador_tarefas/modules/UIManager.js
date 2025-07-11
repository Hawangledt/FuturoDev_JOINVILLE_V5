// Módulo responsável por gerenciar a interface do usuário
export class UIManager {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.tasksList = null;
        this.emptyState = null;
        this.formHandler = null;
    }

    init() {
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Escutar mudanças nas tarefas
        document.addEventListener('tasksChanged', () => {
            this.renderTasks();
        });

        // Escutar filtros aplicados
        document.addEventListener('tasksFiltered', (e) => {
            this.renderTasks(e.detail.tasks);
        });
    }

    renderTasks(tasks = null) {
        // Se não foi fornecido um array de tarefas, usar todas as tarefas
        const tasksToRender = tasks || this.taskManager.getAllTasks();
        
        // Limpar lista atual
        this.tasksList.innerHTML = '';
        
        if (tasksToRender.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.hideEmptyState();
        
        // Usar map() para criar elementos HTML das tarefas
        const taskElements = tasksToRender.map(task => this.createTaskElement(task));
        
        // Usar forEach() para adicionar elementos ao DOM
        taskElements.forEach(element => {
            this.tasksList.appendChild(element);
        });
        
        console.log(`🎨 ${tasksToRender.length} tarefas renderizadas na interface`);
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskDiv.setAttribute('data-task-id', task.id);
        
        // Verificar se está atrasada
        const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
        
        taskDiv.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                <div class="task-actions">
                    <button class="btn-complete" onclick="window.toggleTask(${task.id})">
                        ${task.completed ? '↩️' : '✅'}
                    </button>
                    <button class="btn-edit" onclick="window.editTask(${task.id})">
                        ✏️
                    </button>
                    <button class="btn-delete" onclick="window.deleteTask(${task.id})">
                        🗑️
                    </button>
                </div>
            </div>
            
            ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
            
            <div class="task-meta">
                <span class="task-category">📁 ${this.getCategoryLabel(task.category)}</span>
                <span class="task-priority ${task.priority}">🎯 ${this.getPriorityLabel(task.priority)}</span>
                ${task.dueDate ? `<span class="task-date ${isOverdue ? 'overdue' : ''}">📅 ${this.formatDate(task.dueDate)}</span>` : ''}
            </div>
        `;
        
        return taskDiv;
    }

    showEmptyState() {
        this.emptyState.style.display = 'block';
    }

    hideEmptyState() {
        this.emptyState.style.display = 'none';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCategoryLabel(category) {
        const labels = {
            'trabalho': 'Trabalho',
            'estudos': 'Estudos',
            'pessoal': 'Pessoal',
            'saude': 'Saúde',
            'lazer': 'Lazer'
        };
        return labels[category] || category;
    }

    getPriorityLabel(priority) {
        const labels = {
            'alta': 'Alta',
            'media': 'Média',
            'baixa': 'Baixa'
        };
        return labels[priority] || priority;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    // Método para configurar o FormHandler (será chamado pelo App)
    setFormHandler(formHandler) {
        this.formHandler = formHandler;
    }

    // Exemplo de uso de find() para encontrar elemento da tarefa
    findTaskElement(taskId) {
        return this.tasksList.querySelector(`[data-task-id="${taskId}"]`);
    }

    // Exemplo de uso de filter() para filtrar elementos visíveis
    getVisibleTaskElements() {
        const allElements = Array.from(this.tasksList.children);
        return allElements.filter(element => 
            element.style.display !== 'none'
        );
    }

    // Exemplo de uso de map() para extrair dados dos elementos
    getTaskIdsFromElements() {
        const elements = Array.from(this.tasksList.children);
        return elements.map(element => 
            parseInt(element.getAttribute('data-task-id'))
        );
    }

    // Exemplo de uso de forEach() para aplicar animações
    animateTaskElements() {
        const elements = Array.from(this.tasksList.children);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Exemplo de uso de reduce() para calcular altura total
    calculateTotalHeight() {
        const elements = Array.from(this.tasksList.children);
        return elements.reduce((totalHeight, element) => {
            return totalHeight + element.offsetHeight;
        }, 0);
    }

    // Exemplo de uso de sort() para reordenar elementos no DOM
    sortTaskElements(sortFunction) {
        const elements = Array.from(this.tasksList.children);
        const sortedElements = elements.sort(sortFunction);
        
        // Limpar lista
        this.tasksList.innerHTML = '';
        
        // Adicionar elementos ordenados
        sortedElements.forEach(element => {
            this.tasksList.appendChild(element);
        });
    }

    // Método para destacar tarefas
    highlightTask(taskId) {
        const element = this.findTaskElement(taskId);
        if (element) {
            element.classList.add('highlighted');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remover destaque após 3 segundos
            setTimeout(() => {
                element.classList.remove('highlighted');
            }, 3000);
        }
    }

    // Método para mostrar modal de confirmação
    showConfirmationModal(message, onConfirm) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Confirmação</h3>
                <p>${message}</p>
                <div class="modal-actions">
                    <button class="btn btn-danger" id="confirmBtn">Confirmar</button>
                    <button class="btn btn-secondary" id="cancelBtn">Cancelar</button>
                </div>
            </div>
        `;
        
        // Estilos do modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        `;
        
        // Eventos
        modal.querySelector('#confirmBtn').addEventListener('click', () => {
            onConfirm();
            modal.remove();
        });
        
        modal.querySelector('#cancelBtn').addEventListener('click', () => {
            modal.remove();
        });
        
        document.body.appendChild(modal);
    }
}

// Funções globais para os botões (necessárias para onclick)
window.toggleTask = function(taskId) {
    // Acessar instância do TaskManager através do evento
    const event = new CustomEvent('requestTaskToggle', { detail: { taskId } });
    document.dispatchEvent(event);
};

window.editTask = function(taskId) {
    const event = new CustomEvent('requestTaskEdit', { detail: { taskId } });
    document.dispatchEvent(event);
};

window.deleteTask = function(taskId) {
    const event = new CustomEvent('requestTaskDelete', { detail: { taskId } });
    document.dispatchEvent(event);
};

// Eventos personalizados para comunicação com outros módulos
document.addEventListener('requestTaskToggle', (e) => {
    // Este será capturado pelo App principal
    console.log('Toggle solicitado para tarefa:', e.detail.taskId);
});

document.addEventListener('requestTaskEdit', (e) => {
    console.log('Edição solicitada para tarefa:', e.detail.taskId);
});

document.addEventListener('requestTaskDelete', (e) => {
    console.log('Exclusão solicitada para tarefa:', e.detail.taskId);
});
