# Projeto Automax - BackEnd (FastAPI) e FrontEnd (Vite/React)

Um projeto com API em FastAPI (SQLite) e frontend em React/Vite. O objetivo é importar e exibir carrinhos da FakeStore, listar e detalhar dados via endpoints e interface web.

# Sumário
- Requisitos
- Clone do repositório
- BackEnd (instalação e execução)
- FrontEnd (instalação e execução)
- Solução de Problemas (caso tenha problemas com execução de back ou front)

# Requisitos
- Python 3.10+ e pip
```bash
python --version
```
- Node.js 18+ e npm 9+
```bash
node -v
```
```bash
npm -v
```

# Clone do repositório
Clonar o repositório:
```bash
git clone https://github.com/DiogoWernek/projeto-hibrido.git
```

Entrar na pasta do projeto:
```bash
cd projeto-hibrido
```

Dica: abra dois terminais - um para o BackEnd e outro para o FrontEnd.

# BackEnd - Instalação e Execução
Entre na pasta do BackEnd:
```bash
cd BackEnd
```

Crie o ambiente virtual (venv) - solicitado:
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

Observações:
- O banco `database.db` é criado automaticamente no diretório `BackEnd` ao rodar a API.
- O CORS está liberado para `http://localhost:5173` (frontend). Veja políticas abaixo para ajustes.

# FrontEnd - Instalação e Execução
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
