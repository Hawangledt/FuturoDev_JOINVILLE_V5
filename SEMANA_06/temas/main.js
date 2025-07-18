// Exemplo de LocalStorage - Alternador de Temas
// Este código demonstra como usar o localStorage para salvar preferências do usuário

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggleButton = document.getElementById('themeToggle');
        this.currentThemeDisplay = document.getElementById('currentTheme');
        this.body = document.body;
        
        this.init();
    }

    init() {
        // Carrega o tema salvo quando a página é carregada
        this.loadSavedTheme();
        
        // Adiciona o event listener para o botão
        this.themeToggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Atualiza o display do tema atual
        this.updateThemeDisplay();
        
        console.log('🎨 ThemeManager inicializado!');
        console.log('💾 Tema atual:', this.currentTheme);
    }

    /**
     * Carrega o tema salvo no localStorage
     * Se não houver tema salvo, usa o tema claro como padrão
     */
    loadSavedTheme() {
        try {
            // Tenta recuperar o tema salvo do localStorage
            const savedTheme = localStorage.getItem('userTheme');
            
            if (savedTheme) {
                this.currentTheme = savedTheme;
                console.log('✅ Tema carregado do localStorage:', savedTheme);
            } else {
                console.log('ℹ️ Nenhum tema salvo encontrado, usando tema claro como padrão');
                this.currentTheme = 'light';
            }
            
            // Aplica o tema carregado
            this.applyTheme();
            
        } catch (error) {
            console.error('❌ Erro ao carregar tema do localStorage:', error);
            this.currentTheme = 'light';
            this.applyTheme();
        }
    }

    /**
     * Alterna entre os temas claro e escuro
     */
    toggleTheme() {
        // Alterna o tema atual
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('🔄 Tema alterado para:', this.currentTheme);
        
        // Aplica o novo tema
        this.applyTheme();
        
        // Salva o tema no localStorage
        this.saveTheme();
        
        // Atualiza o display
        this.updateThemeDisplay();
        
        // Feedback visual - pequena animação no botão
        this.animateButton();
    }

    /**
     * Aplica o tema atual ao documento
     */
    applyTheme() {
        if (this.currentTheme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
        } else {
            this.body.removeAttribute('data-theme');
        }
        
        console.log('🎨 Tema aplicado:', this.currentTheme);
    }

    /**
     * Salva o tema atual no localStorage
     */
    saveTheme() {
        try {
            localStorage.setItem('userTheme', this.currentTheme);
            console.log('💾 Tema salvo no localStorage:', this.currentTheme);
            
            // Demonstra como verificar o que foi salvo
            this.demonstrateLocalStorage();
            
        } catch (error) {
            console.error('❌ Erro ao salvar tema no localStorage:', error);
        }
    }

    /**
     * Atualiza o display do tema atual na interface
     */
    updateThemeDisplay() {
        const themeText = this.currentTheme === 'light' ? 'Claro' : 'Escuro';
        this.currentThemeDisplay.textContent = themeText;
        
        // Atualiza o texto do botão
        const buttonText = this.currentTheme === 'light' ? 
            'Mudar para Escuro' : 'Mudar para Claro';
        this.themeToggleButton.textContent = buttonText;
    }

    /**
     * Adiciona uma pequena animação ao botão quando clicado
     */
    animateButton() {
        this.themeToggleButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.themeToggleButton.style.transform = 'scale(1)';
        }, 100);
    }

    /**
     * Demonstra como usar o localStorage (função educativa)
     */
    demonstrateLocalStorage() {
        console.log('\n📚 DEMONSTRAÇÃO DO LOCALSTORAGE:');
        console.log('==========================================');
        
        // Mostra como salvar dados
        console.log('1. Salvando dados:');
        console.log('   localStorage.setItem("userTheme", "' + this.currentTheme + '")');
        
        // Mostra como recuperar dados
        console.log('2. Recuperando dados:');
        console.log('   const tema = localStorage.getItem("userTheme")');
        console.log('   Resultado:', localStorage.getItem('userTheme'));
        
        // Mostra como verificar se existe
        console.log('3. Verificando se existe:');
        console.log('   localStorage.getItem("userTheme") !== null');
        console.log('   Resultado:', localStorage.getItem('userTheme') !== null);
        
        // Mostra todos os dados no localStorage
        console.log('4. Todos os dados no localStorage:');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`   ${key}: ${value}`);
        }
        
        console.log('==========================================\n');
    }

    /**
     * Método para limpar o localStorage (útil para testes)
     */
    clearThemeData() {
        localStorage.removeItem('userTheme');
        console.log('🗑️ Dados do tema removidos do localStorage');
    }

    /**
     * Método para obter informações sobre o localStorage
     */
    getStorageInfo() {
        const info = {
            theme: localStorage.getItem('userTheme'),
            totalItems: localStorage.length,
            isSupported: typeof(Storage) !== "undefined"
        };
        
        console.log('📊 Informações do localStorage:', info);
        return info;
    }
}

// Funções utilitárias para demonstração em aula
const ThemeUtils = {
    /**
     * Demonstra diferentes formas de usar o localStorage
     */
    demonstrateLocalStorageUsage() {
        console.log('\n🎓 EXEMPLOS DE USO DO LOCALSTORAGE:');
        console.log('=====================================');
        
        // Exemplo 1: Salvar preferências do usuário
        console.log('1. Salvando preferências:');
        localStorage.setItem('fontSize', '16px');
        localStorage.setItem('language', 'pt-BR');
        localStorage.setItem('notifications', 'true');
        
        // Exemplo 2: Salvar dados complexos (objetos)
        console.log('2. Salvando objetos (JSON):');
        const userPreferences = {
            theme: 'dark',
            language: 'pt-BR',
            notifications: true,
            fontSize: '16px'
        };
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        
        // Exemplo 3: Recuperar dados complexos
        console.log('3. Recuperando objetos:');
        const savedPreferences = JSON.parse(localStorage.getItem('userPreferences'));
        console.log('   Preferências salvas:', savedPreferences);
        
        // Exemplo 4: Verificar se o localStorage está disponível
        console.log('4. Verificando disponibilidade:');
        if (typeof(Storage) !== "undefined") {
            console.log('   ✅ localStorage está disponível');
        } else {
            console.log('   ❌ localStorage não está disponível');
        }
        
        console.log('=====================================\n');
    },

    /**
     * Limpa todos os dados do localStorage (cuidado!)
     */
    clearAllData() {
        localStorage.clear();
        console.log('🗑️ Todos os dados do localStorage foram removidos');
    },

    /**
     * Lista todos os dados armazenados
     */
    listAllData() {
        console.log('\n📋 TODOS OS DADOS NO LOCALSTORAGE:');
        console.log('==================================');
        
        if (localStorage.length === 0) {
            console.log('   Nenhum dado encontrado');
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                console.log(`   ${key}: ${value}`);
            }
        }
        
        console.log('==================================\n');
    }
};

// Inicializa o gerenciador de temas quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página carregada! Inicializando ThemeManager...');
    
    // Cria uma instância do gerenciador de temas
    const themeManager = new ThemeManager();
    
    // Torna o gerenciador disponível globalmente para fins educativos
    window.themeManager = themeManager;
    window.ThemeUtils = ThemeUtils;
    
    // Demonstra o uso do localStorage no console
    setTimeout(() => {
        ThemeUtils.demonstrateLocalStorageUsage();
    }, 1000);
    
    console.log('💡 Dica: Abra o DevTools (F12) para ver as demonstrações do localStorage!');
    console.log('💡 Você pode usar "themeManager" e "ThemeUtils" no console para testar!');
});

// Exemplo de como detectar mudanças no localStorage (avançado)
window.addEventListener('storage', (e) => {
    console.log('🔄 Mudança detectada no localStorage:', e);
    console.log('   Chave:', e.key);
    console.log('   Valor antigo:', e.oldValue);
    console.log('   Valor novo:', e.newValue);
});

/* 
CONCEITOS IMPORTANTES PARA OS ALUNOS:

1. LocalStorage vs SessionStorage:
   - localStorage: Dados persistem até serem removidos manualmente
   - sessionStorage: Dados são removidos quando a aba é fechada

2. Limitações do localStorage:
   - Aproximadamente 5-10MB por domínio
   - Apenas strings (use JSON.stringify/parse para objetos)
   - Síncrono (pode bloquear a UI com grandes volumes)

3. Boas práticas:
   - Sempre verificar se o localStorage está disponível
   - Usar try/catch para tratar erros
   - Validar dados antes de salvar
   - Não armazenar dados sensíveis

4. Métodos principais:
   - setItem(key, value): Salva um valor
   - getItem(key): Recupera um valor
   - removeItem(key): Remove um item
   - clear(): Remove todos os itens
   - key(index): Retorna a chave do índice
   - length: Número de itens armazenados
*/