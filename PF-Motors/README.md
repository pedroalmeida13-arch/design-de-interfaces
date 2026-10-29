# PF Motors

Projeto acadêmico de loja de carros esportivos e de luxo desenvolvido em HTML, CSS e JavaScript puro.

## Funcionalidades

- Catálogo com 12 veículos, fotos, valores, filtros e ordenação.
- Favoritos, comparação de até três carros e detalhes técnicos.
- Simulador matemático de financiamento.
- Cadastro e login locais com consentimento para os Termos de Uso e Aviso de Privacidade.
- Checkout ilustrativo com busca automática de endereço pelo CEP (ViaCEP).
- Interface responsiva, sem necessidade de Node.js, banco de dados ou framework.

## Como executar

1. Abra esta pasta no VS Code.
2. Use a extensão Live Server, ou execute `python3 -m http.server 8000` na pasta do projeto.
3. Acesse `http://localhost:8000`.

Também é possível abrir `index.html` diretamente, mas a criação de contas requer que a API Web Crypto esteja disponível (HTTPS ou localhost recomendado). A busca de CEP depende de acesso à internet.

## Organização dos arquivos

- `index.html` — estrutura das páginas e formulários.
- `style.css` — identidade visual e responsividade.
- `cars.js` — dados dos 12 veículos.
- `script.js` — catálogo, cadastro, login, checkout e ViaCEP.
- `imagens/` — imagens licenciadas com créditos e links no rodapé.

## Aviso importante

Este é um **protótipo acadêmico**, não uma loja em produção:

- Os carros, preços e pedidos são ilustrativos; não há venda ou pagamento real.
- A conta é armazenada **somente no navegador**, com verificador de senha derivado por PBKDF2. Isso **não é autenticação segura de produção**.
- Não utilize dados pessoais reais ou senhas já usadas em outros serviços.
- Para transformar em loja real, serão necessários backend, autenticação em servidor, banco de dados, operações de pagamento e revisão jurídica da política de privacidade/LGPD.

As fotografias de referência têm créditos e links para licença no próprio site.
