# Projeto Automax — BackEnd (FastAPI) e FrontEnd (Vite/React)

Um mini-projeto com API em FastAPI (SQLite) e frontend em React/Vite. O objetivo é importar e exibir carrinhos da FakeStore, listar e detalhar dados via endpoints e interface web.

# Sumário
- Requisitos
- BackEnd (instalação e execução)
- Endpoints e importação de dados
- FrontEnd (instalação e execução)
- Políticas (contribuição, qualidade, segurança, CORS)
- Solução de Problemas

# Requisitos
- Python 3.10+ e `pip`
```bash
python --version
```
- Node.js 18+ e `npm` 9+
```bash
node -v
```
```bash
npm -v
```

# BackEnd — Instalação e Execução
Entre na pasta do BackEnd:
```bash
cd BackEnd
```

Crie o ambiente virtual (venv) — solicitado:
```bash
python -m venv .venv
```

Ative o venv (CMD):
```bash
.\.venv\Scripts\activate
```

Ative o venv (PowerShell):
```bash
.\.venv\Scripts\Activate.ps1
```

Instale as dependências:
```bash
pip install -r requirements.txt
```

Rode a API em modo desenvolvimento (porta 8000):
```bash
python -m uvicorn main:app --reload
```

Desative o venv (quando quiser encerrar):
```bash
deactivate
```

# Endpoints e Importação de Dados
Importa carrinhos da FakeStore e popula o SQLite (`database.db`). Isso limpa e recria os registros.

Importar dados:
```bash
curl http://localhost:8000/import
```

Listar todos os carrinhos:
```bash
curl http://localhost:8000/carts
```

Detalhar um carrinho (ex.: id 1):
```bash
curl http://localhost:8000/carts/1
```

Observações:
- O banco `database.db` é criado automaticamente no diretório `BackEnd` ao rodar a API.
- O CORS está liberado para `http://localhost:5173` (frontend). Veja políticas abaixo para ajustes.

# FrontEnd — Instalação e Execução
Entre na pasta do FrontEnd:
```bash
cd FrontEnd
```

Instale as dependências:
```bash
npm install
```

Rode o servidor de desenvolvimento (porta 5173):
```bash
npm run dev
```

Build de produção:
```bash
npm run build
```

Preview do build:
```bash
npm run preview
```

# Políticas
- Commits (Conventional Commits)
  - Use mensagens padronizadas: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:` etc.
  - Exemplo:
```bash
git commit -m "feat: adiciona paginação na lista de carrinhos"
```

- Branches e Pull Requests
  - Evite commits direto em `main`. Crie branches com nomes claros (ex.: `feature/carts-list`).
```bash
git checkout -b feature/carts-list
```
  - Abra PRs com descrição objetiva e links para issues.

- Qualidade de Código
  - FrontEnd: rode lint antes de abrir PR.
```bash
npm run lint
```
  - Mantenha tipagem TypeScript coerente e sem `any` desnecessário.

- Dependências
  - BackEnd: mantenha `requirements.txt` atualizado; prefira versões estáveis.
  - FrontEnd: use `npm` e bloqueie versões críticas quando necessário.

- Segurança e Segredos
  - Não commitar arquivos de credenciais ou segredos.
  - Variáveis sensíveis devem ir para `.env` (se aplicável); não versionar esse arquivo.

- Banco de Dados
  - SQLite local (`database.db`) para desenvolvimento. Não compartilhar bancos com dados sensíveis.
  - Endpoints de importação (`/import`) sobrescrevem dados; use com cuidado.

- CORS
  - BackEnd permite `http://localhost:5173`. Se o frontend rodar em outro host/porta, ajuste no `main.py`:
    - Recomendado: usar lista de origens
```bash
# exemplo de ajuste (no código)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
# )
```
  - Evite `["*"]` em produção.

# Solução de Problemas
- PowerShell bloqueia scripts de ativação do venv:
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

- `uvicorn` não é reconhecido:
```bash
python -m uvicorn main:app --reload --port 8000
```

- Porta ocupada (API):
```bash
python -m uvicorn main:app --reload --port 8001
```

- CORS bloqueando requisições:
  - Garanta que `allow_origins` inclui exatamente o host do frontend (ex.: `["http://localhost:5173"]`).
  - Reinicie a API após mudanças.

# Estrutura
- `BackEnd/`: API FastAPI, SQLite, endpoints de carrinho.
- `FrontEnd/`: React + Vite, UI para consumo da API.

Bom código e boas contribuições!