// Funções para gerenciar o banco de dados local (localStorage)

// Obtém os usuários salvos
function obterUsuarios() {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
}

// Salva os usuários no localStorage
function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Atualiza a tabela de usuários
function atualizarTabela() {
  const tabela = document.getElementById("tabela-usuarios");
  const usuarios = obterUsuarios();

  tabela.innerHTML = ""; // Limpa a tabela

  usuarios.forEach((usuario, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>
        <button onclick="excluirUsuario(${index})">Excluir</button>
      </td>
    `;

    tabela.appendChild(linha);
  });
}

// Adiciona um novo usuário
function adicionarUsuario(usuario) {
  const usuarios = obterUsuarios();
  usuarios.push(usuario);
  salvarUsuarios(usuarios);
  atualizarTabela();
}

// Exclui um usuário por índice
function excluirUsuario(index) {
  const usuarios = obterUsuarios();
  usuarios.splice(index, 1);
  salvarUsuarios(usuarios);
  atualizarTabela();
}

// Configura o formulário
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita o reload da página

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  adicionarUsuario({ nome, email });

  // Limpa o formulário
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
});

// Inicializa a tabela na primeira carga
atualizarTabela();