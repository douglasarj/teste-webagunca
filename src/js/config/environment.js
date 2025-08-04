// Configuração de ambiente
const ENVIRONMENTS = {
    development: {
        API_BASE_URL: 'http://localhost:5000'
    },
    production: {
        // URL do backend deployado no Render
        API_BASE_URL: 'https://webagunca.onrender.com'
    }
};

// Detecta automaticamente o ambiente baseado na URL atual
function detectEnvironment() {
    const hostname = window.location.hostname;
    
    // Se estiver rodando localmente
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    }
    
    // Se estiver no GitHub Pages ou outro domínio de produção
    if (hostname.includes('github.io') || hostname.includes('pages.dev') || hostname !== 'localhost') {
        return 'production';
    }
    
    return 'production';
}

// Configura automaticamente a API baseada no ambiente
function configureEnvironment() {
    const currentEnv = detectEnvironment();
    const config = ENVIRONMENTS[currentEnv];
    
    console.log(`Ambiente detectado: ${currentEnv}`);
    console.log(`Configuração do ambiente:`, config);
    
    if (config) {
        // Garante que a função setApiBaseUrl existe
        if (typeof window.setApiBaseUrl === 'function') {
            window.setApiBaseUrl(config.API_BASE_URL);
            console.log(`API configurada para: ${config.API_BASE_URL}`);
        } else {
            // Se a função ainda não existe, configura diretamente
            if (window.API_CONFIG) {
                window.API_CONFIG.BASE_URL = config.API_BASE_URL;
                console.log(`API configurada diretamente para: ${config.API_BASE_URL}`);
            }
        }
    }
}

// Configura automaticamente quando o script é carregado
document.addEventListener('DOMContentLoaded', configureEnvironment);

// Também executa imediatamente se o DOM já estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configureEnvironment);
} else {
    // DOM já está carregado, executa imediatamente
    configureEnvironment();
}

// Exporta funções para uso manual se necessário
window.ENVIRONMENTS = ENVIRONMENTS;
window.detectEnvironment = detectEnvironment;
window.configureEnvironment = configureEnvironment;