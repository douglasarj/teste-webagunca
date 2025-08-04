// Utilitário para testar a conexão com a API
class ApiTester {
    constructor() {
        this.results = [];
    }

    async testConnection() {
        console.log('🔍 Testando conexão com a API...');
        
        try {
            const response = await fetch(getApiUrl('/'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ API conectada com sucesso!', data);
                return true;
            } else {
                console.log('❌ API retornou erro:', response.status);
                return false;
            }
        } catch (error) {
            console.log('❌ Erro ao conectar com a API:', error.message);
            return false;
        }
    }

    async testEndpoints() {
        console.log('🧪 Testando endpoints da API...');
        
        const endpoints = [
            { name: 'Health Check', url: '/', method: 'GET', requiresAuth: false },
            { name: 'Boards', url: API_CONFIG.ENDPOINTS.BOARDS, method: 'GET', requiresAuth: true },
        ];

        for (const endpoint of endpoints) {
            try {
                const headers = { 'Content-Type': 'application/json' };
                
                if (endpoint.requiresAuth) {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.log(`⚠️ ${endpoint.name}: Token não encontrado (faça login primeiro)`);
                        continue;
                    }
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(getApiUrl(endpoint.url), {
                    method: endpoint.method,
                    headers
                });

                if (response.ok) {
                    console.log(`✅ ${endpoint.name}: OK`);
                } else {
                    console.log(`❌ ${endpoint.name}: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                console.log(`❌ ${endpoint.name}: ${error.message}`);
            }
        }
    }

    showCurrentConfig() {
        console.log('⚙️ Configuração atual:');
        console.log('Ambiente:', window.detectEnvironment ? window.detectEnvironment() : 'Não detectado');
        console.log('API Base URL:', API_CONFIG.BASE_URL);
        console.log('Hostname:', window.location.hostname);
        console.log('URL completa:', window.location.href);
    }

    async runFullTest() {
        console.log('🚀 Iniciando teste completo da API...');
        console.log('=====================================');
        
        this.showCurrentConfig();
        console.log('=====================================');
        
        const connectionOk = await this.testConnection();
        
        if (connectionOk) {
            await this.testEndpoints();
        }
        
        console.log('=====================================');
        console.log('✨ Teste concluído!');
    }
}

// Função global para facilitar o uso no console
window.testApi = function() {
    const tester = new ApiTester();
    return tester.runFullTest();
};

// Função para testar apenas a conexão
window.testConnection = function() {
    const tester = new ApiTester();
    return tester.testConnection();
};

// Função para mostrar a configuração atual
window.showApiConfig = function() {
    const tester = new ApiTester();
    tester.showCurrentConfig();
};

console.log('🔧 Utilitários de teste da API carregados!');
console.log('Use testApi() no console para testar a conexão com a API');
console.log('Use showApiConfig() para ver a configuração atual');