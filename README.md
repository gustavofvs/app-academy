# Neon Academy | Painel de Controle

Este é um painel de controle web para gerenciar clientes, planos de treino e agendamento de aulas em uma academia, desenvolvido com foco em uma interface moderna e responsiva utilizando o conceito de Glassmorphism.

## Descrição do Projeto

O projeto "Neon Academy | Painel de Controle" oferece uma solução intuitiva para a administração de uma academia. Ele permite aos usuários (administradores) visualizar estatísticas chave no dashboard, gerenciar informações de clientes, criar e atribuir planos de treino personalizados, e agendar e controlar a ocupação de aulas coletivas. A interface é construída com HTML, CSS e JavaScript puro, complementada pelo framework Bootstrap 5 para um design responsivo e componentes interativos. Os dados são persistidos localmente utilizando `localStorage` para simular um backend.

## Estrutura do Projeto

O projeto possui uma estrutura de arquivos simples e organizada:

```
.
├── index.html
└── images/
    ├── back.png
    └── Luiz.png
```

-   [`index.html`](index.html): O arquivo principal que contém toda a estrutura HTML, estilos CSS embutidos e a lógica JavaScript para o funcionamento do painel.
-   [`images/`](images/): Este diretório armazena todas as imagens utilizadas no projeto, como o plano de fundo (`back.png`) e avatares (`Luiz.png`).

## Funcionalidades Principais

*   **Dashboard Interativo**: Visão geral com estatísticas de clientes ativos, planos cadastrados, total de aulas e notificações.
*   **Gerenciamento de Clientes**: Adicione, edite, visualize e exclua clientes, atribuindo planos de treino e definindo status (Ativo/Inativo).
*   **Gerenciamento de Planos de Treino**: Crie, edite, visualize e exclua planos de treino, incluindo a lista de exercícios.
*   **Agendamento de Aulas**: Agende novas aulas, visualize as aulas existentes, gerencie a matrícula de clientes e acompanhe a ocupação das vagas.
*   **Persistência de Dados**: Todos os dados são salvos e carregados do `localStorage` do navegador, garantindo que as informações não sejam perdidas ao recarregar a página.
*   **Design Moderno (Glassmorphism)**: Interface com efeitos de vidro translúcido, sombras e cores vibrantes para uma experiência visual agradável.
*   **Responsividade**: O layout se adapta a diferentes tamanhos de tela, garantindo usabilidade em dispositivos móveis e desktops.
*   **Notificações Toast**: Sistema de feedback visual para ações do usuário (salvar, excluir, erros).

## Tecnologias Utilizadas

*   **HTML5**: Estrutura semântica do conteúdo.
*   **CSS3**: Estilização e design, incluindo variáveis CSS para fácil personalização e o efeito Glassmorphism.
*   **JavaScript (ES6+)**: Lógica de negócios, manipulação do DOM, gerenciamento de estado com `localStorage` e interatividade.
*   **Bootstrap 5.3.3**: Framework CSS para componentes UI e sistema de grid responsivo.
*   **Bootstrap Icons 1.11.3**: Biblioteca de ícones.
*   **Google Fonts (Poppins)**: Tipografia moderna e legível.

## Trechos de Código Relevantes

### Estrutura HTML Básica e Inclusão de Estilos/Scripts

O arquivo `index.html` inclui as folhas de estilo do Bootstrap e Google Fonts, além do script principal no final do `<body>` para garantir que o DOM esteja totalmente carregado.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neon Academy | Painel de Controle</title>

    <!-- Bootstrap 5.3.3 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    
    <!-- Google Fonts: Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
        /* ... estilos CSS ... */
    </style>
</head>
<body>
    <!-- ... conteúdo do corpo ... -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // ... lógica JavaScript ...
    </script>
</body>
</html>
```

### Estilização CSS (Glassmorphism e Variáveis)

O projeto utiliza variáveis CSS para gerenciar cores e um estilo Glassmorphism para os componentes principais.

```css
:root {
    --primary-color: #00e5ff;
    --primary-glow: rgba(0, 229, 255, 0.55);
    --background-color: #0a0a0c;
    --surface-color: rgba(15, 17, 26, 0.5);
    --text-color: #ffffff;
    --text-white-color: #cccccc;
    --border-color: rgba(255, 255, 255, 0.1);
    --success-color: #00ff8c;
    --danger-color: #ff4d4d;
    --warning-color: #ffc700;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('images/back.png');
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    color: var(--text-color);
    overflow-x: hidden;
}

.glass-effect {
    background: var(--surface-color);
    backdrop-filter: blur(15px) saturate(180%);
    -webkit-backdrop-filter: blur(15px) saturate(180%);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    transition: all 0.3s ease;
}
```

### Lógica JavaScript (Gerenciamento de Dados e Renderização)

A lógica JavaScript é responsável por carregar/salvar dados do `localStorage`, renderizar as listas de clientes, planos e aulas, e gerenciar a interação com os modais.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const getStore = (key, defaultData) => {
        const data = localStorage.getItem(key);
        if (!data) {
            setStore(key, defaultData);
            return defaultData;
        }
        return JSON.parse(data);
    };
    const setStore = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    let clients = getStore('neon-academy-clients', initialClients);
    let plans = getStore('neon-academy-plans', initialPlans);
    let classes = getStore('neon-academy-classes', initialClasses);

    const renderClients = () => {
        const clientTableBody = document.getElementById('clientTableBody');
        const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
        clientTableBody.innerHTML = clients.filter(c => c.name.toLowerCase().includes(searchTerm)).map(c => {
            const plan = plans.find(p => p.id == c.planId);
            return `
            <tr id="client-${c.id}">
                <td>${c.name}</td>
                <td>${plan ? plan.name : '<span class="text-white">Nenhum</span>'}</td>
                <td><span class="badge" style="background-color: ${c.status === 'Ativo' ? 'var(--success-color)' : 'var(--danger-color)'};">${c.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-view-client" data-id="${c.id}" style="color:var(--primary-color)"><i class="bi bi-eye-fill"></i></button>
                    <button class="btn btn-sm btn-edit-client" data-id="${c.id}" style="color:var(--warning-color)"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-sm btn-delete" data-id="${c.id}" data-type="clients" style="color:var(--danger-color)"><i class="bi bi-trash-fill"></i></button>
                </td>
            </tr>`;
        }).join('');
    };

    // ... outras funções de renderização e manipulação de dados ...

    renderAll(); // Chamada inicial para renderizar todos os dados
});
```

## Como Configurar e Rodar o Projeto Localmente

Para ter uma cópia local do projeto em execução, siga estas etapas simples:

1.  **Clone o repositório (se aplicável) ou baixe os arquivos:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    # Ou baixe o ZIP e extraia para uma pasta de sua preferência.
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd App-Academy
    ```

3.  **Abra o arquivo `index.html` no seu navegador:**
    Você pode simplesmente clicar duas vezes no arquivo `index.html` ou arrastá-lo para a janela do seu navegador. Alternativamente, se você tiver uma extensão de servidor local (como "Live Server" no VS Code), pode usá-la para servir o arquivo.

O projeto não requer nenhuma dependência de servidor ou processo de build complexo, funcionando diretamente no navegador.

## Melhorias Futuras Sugeridas

*   **Capturas de Tela**: Adicionar screenshots do painel de controle para uma visão rápida do projeto.
*   **Guia de Contribuição**: Detalhar como outros desenvolvedores podem contribuir para o projeto.
*   **Informações de Licença**: Especificar a licença sob a qual o projeto está distribuído.
*   **Backend Real**: Implementar um backend (Node.js, Python, PHP, etc.) com um banco de dados para persistência de dados mais robusta.
*   **Autenticação de Usuários**: Adicionar um sistema de login e autenticação para diferentes níveis de acesso.
*   **Gráficos e Relatórios**: Integrar bibliotecas de gráficos para visualizações mais avançadas no dashboard.
*   **Testes Automatizados**: Escrever testes unitários e de integração para garantir a estabilidade do código.