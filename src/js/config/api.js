// Configuração da API
const API_CONFIG = {
    // URL base da API - altere esta URL quando fizer deploy do backend
    BASE_URL: 'http://localhost:5000',
    
    // Endpoints da API
    ENDPOINTS: {
        // Autenticação
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        
        // Perfil do usuário
        PROFILE: '/api/profile',
        PROFILE_PASSWORD: '/api/profile/password',
        PROFILE_IMAGE: '/api/profile/image',
        
        // Quadros
        BOARDS: '/api/boards',
        BOARD_BY_ID: (id) => `/api/boards/${id}`,
        
        // Cards
        CARDS: '/api/cards',
        CARD_BY_ID: (id) => `/api/cards/${id}`,
        CARDS_BY_BOARD: (boardId) => `/api/cards/board/${boardId}`,
        
        // Membros do quadro
        BOARD_MEMBERS: '/api/board-members',
        
        // Listas
        LISTS: '/api/lists',
        
        // Comentários
        COMMENTS: '/api/comments',
        
        // Etiquetas dos cards
        CARD_LABELS: '/api/card-labels'
    }
};

// Função helper para construir URLs completas
function getApiUrl(endpoint) {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}

// Função para atualizar a URL base (útil para alternar entre desenvolvimento e produção)
function setApiBaseUrl(newBaseUrl) {
    API_CONFIG.BASE_URL = newBaseUrl;
    console.log(`API Base URL atualizada para: ${newBaseUrl}`);
}

// Exportar configurações
window.API_CONFIG = API_CONFIG;
window.getApiUrl = getApiUrl;
window.setApiBaseUrl = setApiBaseUrl;