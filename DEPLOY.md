# Guia de Deploy - Projeto Bagunça

Este guia te ajudará a fazer o deploy do projeto Bagunça separando o frontend (GitHub Pages) do backend (serviço de hospedagem).

## 📋 Pré-requisitos

- Conta no GitHub
- Conta em um serviço de hospedagem para o backend (Heroku, Railway, Render, etc.)
- MongoDB Atlas configurado

## 🚀 Passo 1: Deploy do Backend

### Opção A: Heroku

1. **Instale o Heroku CLI**
   ```bash
   # Windows (usando chocolatey)
   choco install heroku-cli
   
   # macOS (usando homebrew)
   brew tap heroku/brew && brew install heroku
   ```

2. **Faça login no Heroku**
   ```bash
   heroku login
   ```

3. **Navegue até a pasta do backend**
   ```bash
   cd backend
   ```

4. **Crie um app no Heroku**
   ```bash
   heroku create seu-app-bagunca-backend
   ```

5. **Configure as variáveis de ambiente**
   ```bash
   heroku config:set MONGODB_URI="sua_string_de_conexao_mongodb"
   heroku config:set JWT_SECRET="seu_jwt_secret_muito_seguro"
   heroku config:set PORT=5000
   ```

6. **Faça o deploy**
   ```bash
   git init
   git add .
   git commit -m "Deploy inicial do backend"
   git push heroku main
   ```

### Opção B: Railway

1. **Acesse [Railway.app](https://railway.app)**
2. **Conecte sua conta GitHub**
3. **Crie um novo projeto e selecione a pasta `backend`**
4. **Configure as variáveis de ambiente:**
   - `MONGODB_URI`: sua string de conexão do MongoDB
   - `JWT_SECRET`: seu JWT secret
   - `PORT`: 5000

### Opção C: Render

1. **Acesse [Render.com](https://render.com)**
2. **Conecte sua conta GitHub**
3. **Crie um novo Web Service**
4. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`
5. **Adicione as variáveis de ambiente**

## 🌐 Passo 2: Configurar o Frontend

1. **Atualize a URL do backend**
   
   Edite o arquivo `src/js/config/environment.js` e substitua a URL de produção:
   
   ```javascript
   production: {
       // URL do backend deployado no Render
       API_BASE_URL: 'https://webagunca.onrender.com'
   }
   ```

2. **Teste localmente**
   
   Abra o projeto no navegador e teste se as funcionalidades estão funcionando com o backend deployado.

## 📱 Passo 3: Deploy do Frontend no GitHub Pages

1. **Commit e push das alterações**
   ```bash
   git add .
   git commit -m "Configuração para produção"
   git push origin main
   ```

2. **Ative o GitHub Pages**
   - Vá para Settings > Pages no seu repositório
   - Selecione "Deploy from a branch"
   - Escolha "main" branch
   - Clique em "Save"

3. **Acesse seu site**
   
   Seu site estará disponível em: `https://seu-usuario.github.io/seu-repositorio`

## 🔧 Configurações Adicionais

### CORS no Backend

Certifique-se de que o backend está configurado para aceitar requisições do seu domínio do GitHub Pages:

```javascript
// No arquivo server.js
app.use(cors({
    origin: ['http://localhost:3000', 'https://seu-usuario.github.io']
}));
```

### Variáveis de Ambiente

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
PORT=5000
CORS_ORIGIN=https://seu-usuario.github.io
```

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se a URL do frontend está configurada no CORS do backend
- Certifique-se de que não há barras extras nas URLs

### API não encontrada
- Verifique se a URL do backend está correta no `environment.js`
- Teste a API diretamente no navegador: `https://seu-backend.herokuapp.com/api/boards`

### Erro 500 no backend
- Verifique os logs do serviço de hospedagem
- Confirme se todas as variáveis de ambiente estão configuradas
- Teste a conexão com o MongoDB

## 📝 Checklist de Deploy

- [ ] Backend deployado e funcionando
- [ ] Variáveis de ambiente configuradas
- [ ] URL do backend atualizada no frontend
- [ ] CORS configurado corretamente
- [ ] Frontend commitado e pushed
- [ ] GitHub Pages ativado
- [ ] Site funcionando corretamente

## 🔄 Atualizações Futuras

Para atualizações:

1. **Backend**: Faça push para o repositório conectado ao serviço de hospedagem
2. **Frontend**: Faça commit e push para o GitHub - o GitHub Pages atualizará automaticamente

## 📞 Suporte

Se encontrar problemas, verifique:
1. Console do navegador para erros JavaScript
2. Logs do serviço de hospedagem do backend
3. Status das variáveis de ambiente
4. Conectividade com o MongoDB Atlas