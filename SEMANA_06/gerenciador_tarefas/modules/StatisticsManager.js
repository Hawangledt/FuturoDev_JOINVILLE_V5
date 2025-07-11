// Módulo responsável por gerenciar e calcular estatísticas das tarefas
export class StatisticsManager {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }

    init() {
        this.setupEventListeners();
        this.updateStatistics();
    }

    setupEventListeners() {
        // Escutar mudanças nas tarefas para atualizar estatísticas
        document.addEventListener('tasksChanged', () => {
            this.updateStatistics();
        });

        // Escutar filtros aplicados para mostrar estatísticas filtradas
        document.addEventListener('tasksFiltered', (e) => {
            this.updateStatistics(e.detail.tasks);
        });
    }

    updateStatistics(tasks = null) {
        // Se não foi fornecido um array de tarefas, usar todas as tarefas
        const tasksToAnalyze = tasks || this.taskManager.getAllTasks();
        
        // Calcular estatísticas usando reduce()
        const stats = this.calculateStatistics(tasksToAnalyze);
        
        // Renderizar estatísticas na interface
        this.renderStatistics(stats);
        
        console.log('📊 Estatísticas atualizadas:', stats);
    }

    calculateStatistics(tasks) {
        // Usar reduce() para calcular todas as estatísticas de uma vez
        return tasks.reduce((stats, task) => {
            // Contadores básicos
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
            
            // Estatísticas por categoria
            if (!stats.byCategory[task.category]) {
                stats.byCategory[task.category] = { total: 0, completed: 0, pending: 0 };
            }
            stats.byCategory[task.category].total++;
            if (task.completed) {
                stats.byCategory[task.category].completed++;
            } else {
                stats.byCategory[task.category].pending++;
            }
            
            // Estatísticas por prioridade
            if (!stats.byPriority[task.priority]) {
                stats.byPriority[task.priority] = { total: 0, completed: 0, pending: 0 };
            }
            stats.byPriority[task.priority].total++;
            if (task.completed) {
                stats.byPriority[task.priority].completed++;
            } else {
                stats.byPriority[task.priority].pending++;
            }
            
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

    renderStatistics(stats) {
        // Atualizar elementos da interface
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('pendingTasks').textContent = stats.pending;
        document.getElementById('completedTasks').textContent = stats.completed;
        
        // Calcular porcentagem de progresso
        const progressPercentage = stats.total > 0 ? 
            Math.round((stats.completed / stats.total) * 100) : 0;
        document.getElementById('progressPercentage').textContent = `${progressPercentage}%`;
        
        // Aplicar cores baseadas no progresso
        const progressElement = document.getElementById('progressPercentage');
        progressElement.style.color = this.getProgressColor(progressPercentage);
    }

    getProgressColor(percentage) {
        if (percentage >= 80) return '#28a745'; // Verde
        if (percentage >= 60) return '#ffc107'; // Amarelo
        if (percentage >= 40) return '#fd7e14'; // Laranja
        return '#dc3545'; // Vermelho
    }

    // Exemplo de uso de map() para transformar dados para gráficos
    getChartData() {
        const stats = this.calculateStatistics(this.taskManager.getAllTasks());
        
        return {
            categories: Object.entries(stats.byCategory).map(([category, data]) => ({
                name: category,
                total: data.total,
                completed: data.completed,
                pending: data.pending,
                completionRate: data.total > 0 ? (data.completed / data.total * 100).toFixed(1) : 0
            })),
            
            priorities: Object.entries(stats.byPriority).map(([priority, data]) => ({
                name: priority,
                total: data.total,
                completed: data.completed,
                pending: data.pending,
                completionRate: data.total > 0 ? (data.completed / data.total * 100).toFixed(1) : 0
            }))
        };
    }

    // Exemplo de uso de filter() para análises específicas
    getOverdueTasks() {
        const allTasks = this.taskManager.getAllTasks();
        const today = new Date();
        
        return allTasks.filter(task => 
            !task.completed && 
            task.dueDate && 
            new Date(task.dueDate) < today
        );
    }

    // Exemplo de uso de sort() para ranking
    getCategoryRanking() {
        const chartData = this.getChartData();
        
        // Ordenar categorias por taxa de conclusão
        return chartData.categories.sort((a, b) => 
            parseFloat(b.completionRate) - parseFloat(a.completionRate)
        );
    }

    // Exemplo de uso de find() para encontrar estatísticas específicas
    getCategoryStats(categoryName) {
        const allTasks = this.taskManager.getAllTasks();
        const categoryTasks = allTasks.filter(task => task.category === categoryName);
        
        if (categoryTasks.length === 0) {
            return null;
        }
        
        return this.calculateStatistics(categoryTasks);
    }

    // Exemplo de uso de forEach() para relatórios
    generateReport() {
        const stats = this.calculateStatistics(this.taskManager.getAllTasks());
        const report = [];
        
        report.push('=== RELATÓRIO DE TAREFAS ===');
        report.push(`📊 Total de tarefas: ${stats.total}`);
        report.push(`✅ Concluídas: ${stats.completed}`);
        report.push(`⏳ Pendentes: ${stats.pending}`);
        report.push(`⚠️ Atrasadas: ${stats.overdue}`);
        
        report.push('\n📋 Por Categoria:');
        Object.entries(stats.byCategory).forEach(([category, data]) => {
            const rate = data.total > 0 ? (data.completed / data.total * 100).toFixed(1) : 0;
            report.push(`  ${category}: ${data.total} total (${rate}% concluídas)`);
        });
        
        report.push('\n🎯 Por Prioridade:');
        Object.entries(stats.byPriority).forEach(([priority, data]) => {
            const rate = data.total > 0 ? (data.completed / data.total * 100).toFixed(1) : 0;
            report.push(`  ${priority}: ${data.total} total (${rate}% concluídas)`);
        });
        
        console.log(report.join('\n'));
        return report;
    }

    // Exemplo de uso de reduce() para cálculos complexos
    calculateProductivity() {
        const allTasks = this.taskManager.getAllTasks();
        
        // Calcular produtividade baseada em tarefas concluídas por período
        const productivity = allTasks.reduce((acc, task) => {
            if (task.completed && task.completedAt) {
                const completedDate = new Date(task.completedAt);
                const dayOfWeek = completedDate.getDay(); // 0-6 (domingo-sábado)
                
                acc.byDayOfWeek[dayOfWeek] = (acc.byDayOfWeek[dayOfWeek] || 0) + 1;
                acc.totalCompleted++;
            }
            
            return acc;
        }, {
            byDayOfWeek: {},
            totalCompleted: 0
        });
        
        return productivity;
    }

    // Exemplo de uso de map() e filter() juntos
    getTasksCompletedThisWeek() {
        const allTasks = this.taskManager.getAllTasks();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return allTasks
            .filter(task => 
                task.completed && 
                task.completedAt && 
                new Date(task.completedAt) >= oneWeekAgo
            )
            .map(task => ({
                title: task.title,
                category: task.category,
                priority: task.priority,
                completedAt: new Date(task.completedAt).toLocaleDateString()
            }));
    }

    // Método para exportar estatísticas
    exportStatistics() {
        const stats = this.calculateStatistics(this.taskManager.getAllTasks());
        const chartData = this.getChartData();
        
        const exportData = {
            summary: stats,
            charts: chartData,
            overdueTasks: this.getOverdueTasks().length,
            categoryRanking: this.getCategoryRanking(),
            productivity: this.calculateProductivity(),
            recentCompletions: this.getTasksCompletedThisWeek(),
            generatedAt: new Date().toISOString()
        };
        
        console.log('📤 Estatísticas exportadas:', exportData);
        return exportData;
    }
}
