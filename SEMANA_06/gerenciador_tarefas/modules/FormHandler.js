// Módulo responsável por gerenciar o formulário de tarefas
export class FormHandler {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.form = null;
        this.editingTaskId = null;
    }

    init() {
        this.form = document.getElementById('taskForm');
        this.setupEventListeners();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Evento de submit do formulário
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Eventos de validação em tempo real
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Configurar data mínima para o campo de data
        const dateInput = document.getElementById('taskDueDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    setupFormValidation() {
        // Validação personalizada para o título
        const titleInput = document.getElementById('taskTitle');
        titleInput.addEventListener('input', () => {
            this.validateTitle(titleInput.value);
        });
    }

    handleSubmit() {
        if (!this.validateForm()) {
            return;
        }

        const formData = this.getFormData();
        
        if (this.editingTaskId) {
            // Atualizar tarefa existente
            this.taskManager.updateTask(this.editingTaskId, formData);
            this.exitEditMode();
        } else {
            // Adicionar nova tarefa
            this.taskManager.addTask(formData);
        }

        this.resetForm();
        this.showSuccessMessage();
    }

    getFormData() {
        const formData = new FormData(this.form);
        
        // Converter FormData para objeto usando map()
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        // Processar dados específicos
        if (data.dueDate === '') {
            data.dueDate = null;
        }
        
        return data;
    }

    validateForm() {
        const fields = [
            { element: document.getElementById('taskTitle'), validator: 'title' },
            { element: document.getElementById('taskDescription'), validator: 'description' },
            { element: document.getElementById('taskDueDate'), validator: 'date' }
        ];

        let isValid = true;
        
        // Usar forEach para validar cada campo
        fields.forEach(field => {
            if (!this.validateField(field.element)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        
        switch (field.id) {
            case 'taskTitle':
                return this.validateTitle(value);
            case 'taskDescription':
                return this.validateDescription(value);
            case 'taskDueDate':
                return this.validateDate(value);
            default:
                return true;
        }
    }

    validateTitle(title) {
        const titleInput = document.getElementById('taskTitle');
        
        if (!title || title.length < 3) {
            this.showFieldError(titleInput, 'O título deve ter pelo menos 3 caracteres');
            return false;
        }
        
        if (title.length > 100) {
            this.showFieldError(titleInput, 'O título não pode ter mais de 100 caracteres');
            return false;
        }
        
        this.clearFieldError(titleInput);
        return true;
    }

    validateDescription(description) {
        const descriptionInput = document.getElementById('taskDescription');
        
        if (description && description.length > 500) {
            this.showFieldError(descriptionInput, 'A descrição não pode ter mais de 500 caracteres');
            return false;
        }
        
        this.clearFieldError(descriptionInput);
        return true;
    }

    validateDate(date) {
        const dateInput = document.getElementById('taskDueDate');
        
        if (date) {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.showFieldError(dateInput, 'A data não pode ser anterior a hoje');
                return false;
            }
        }
        
        this.clearFieldError(dateInput);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#dc3545';
    }

    clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = '';
    }

    resetForm() {
        this.form.reset();
        
        // Limpar todos os erros
        const errorDivs = this.form.querySelectorAll('.field-error');
        errorDivs.forEach(div => div.remove());
        
        // Limpar estilos de erro
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.style.borderColor = '';
        });
    }

    showSuccessMessage() {
        const message = this.editingTaskId ? 
            'Tarefa atualizada com sucesso!' : 
            'Tarefa adicionada com sucesso!';
            
        // Criar elemento de mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remover mensagem após 3 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Entrar no modo de edição
    enterEditMode(task) {
        this.editingTaskId = task.id;
        
        // Preencher formulário com dados da tarefa
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskDueDate').value = task.dueDate || '';
        
        // Mudar texto do botão
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Atualizar Tarefa';
        
        // Adicionar classe para indicar modo de edição
        this.form.classList.add('editing');
        
        // Scroll para o formulário
        this.form.scrollIntoView({ behavior: 'smooth' });
    }

    // Sair do modo de edição
    exitEditMode() {
        this.editingTaskId = null;
        
        // Restaurar texto do botão
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Adicionar Tarefa';
        
        // Remover classe de edição
        this.form.classList.remove('editing');
    }

    // Exemplo de uso de map() para processar dados do formulário
    getFormDataAsArray() {
        const formData = new FormData(this.form);
        return Array.from(formData.entries()).map(([key, value]) => ({
            field: key,
            value: value.trim(),
            isEmpty: !value.trim()
        }));
    }

    // Exemplo de uso de filter() para campos válidos
    getValidFields() {
        return this.getFormDataAsArray().filter(item => !item.isEmpty);
    }
}
