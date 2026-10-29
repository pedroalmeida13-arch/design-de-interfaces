// PF Motors — interações do catálogo, conta local e solicitação de compra.
// Esta autenticação é uma simulação local, não substitui uma API segura.
'use strict';

const $ = (id) => document.getElementById(id);
const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const accountKey = 'pf-motors-account-v1';
const sessionKey = 'pf-motors-session-v1';
const favoritesKey = 'pf-motors-favorites-v1';
let selected = null;
let customer = null;
let onlyFavorites = false;
let compared = new Set();
let favorites = new Set();
let toastTimer;
let cepController = null;

try {
    favorites = new Set(JSON.parse(localStorage.getItem(favoritesKey) || '[]').filter((id) => vehicles.some((car) => car.id === id)));
} catch { /* O navegador pode bloquear armazenamento local. */ }

function toast(message) {
    $('toast').textContent = message;
    $('toast').classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('toast').classList.add('hidden'), 4000);
}

function getAccount() {
    try { return JSON.parse(localStorage.getItem(accountKey) || 'null'); }
    catch { return null; }
}

function updateAuthUI() {
    const logged = Boolean(customer);
    $('account').textContent = logged ? 'Olá, ' + customer.name.split(' ')[0] : 'Criar cadastro ↗';
    $('login-button').classList.toggle('hidden', logged);
    $('logout-button').classList.toggle('hidden', !logged);
    $('delete-account').classList.toggle('hidden', !logged);
}

function restoreSession() {
    const account = getAccount();
    if (account && sessionStorage.getItem(sessionKey) === account.email) {
        customer = { name: account.name, email: account.email, phone: account.phone };
    }
    updateAuthUI();
}

// Web Crypto protege o exemplo contra senhas em texto puro no armazenamento.
// Sem backend, isso NÃO constitui autenticação comercial segura.
async function passwordVerifier(password, salt) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({
        name: 'PBKDF2', salt: encoder.encode(salt), iterations: 120000, hash: 'SHA-256'
    }, key, 256);
    return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function showScreen(id) {
    document.querySelectorAll('dialog[open]').forEach((dialog) => dialog.close());
    ['home', 'register', 'login', 'checkout', 'success'].forEach((screen) => $(screen).classList.toggle('hidden', screen !== id));
    window.scrollTo({ top: 0, behavior: 'instant' });
    const heading = $(id).querySelector('h1, h2');
    if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
    }
}

function register() {
    showScreen('register');
    summary('register-summary');
}

function login() {
    $('login-error').classList.add('hidden');
    showScreen('login');
}

function getCars() {
    const query = $('search').value.trim().toLocaleLowerCase('pt-BR');
    const list = vehicles.filter((car) =>
        (car.brand + ' ' + car.model + ' ' + car.version).toLocaleLowerCase('pt-BR').includes(query) &&
        (!$('category').value || car.category === $('category').value) &&
        (!$('brand').value || car.brand === $('brand').value) &&
        (!$('budget').value || car.price <= Number($('budget').value)) &&
        (!onlyFavorites || favorites.has(car.id)));
    if ($('sort').value !== 'featured') {
        list.sort((a, b) => $('sort').value === 'asc' ? a.price - b.price : b.price - a.price);
    }
    return list;
}

function renderCompareBar() {
    $('comparebar').classList.toggle('hidden', compared.size === 0);
    $('compare-count').textContent = compared.size + ' de 3 veículos selecionados';
}

function renderCars() {
    const list = getCars();
    $('count').textContent = list.length + ' veículos encontrados';
    $('fav-count').textContent = favorites.size;
    $('fav-filter').classList.toggle('active', onlyFavorites);
    $('fav-filter').setAttribute('aria-pressed', String(onlyFavorites));
    $('cars').innerHTML = list.length ? list.map((car) =>
        '<article class="card">' +
        '<div class="carphoto"><img src="' + car.photo + '" alt="' + car.brand + ' ' + car.model + '" loading="lazy">' +
        '<span class="badge">' + car.category.toUpperCase() + '</span>' +
        '<button class="heart" data-favorite="' + car.id + '" aria-label="Favoritar ' + car.model + '" aria-pressed="' + favorites.has(car.id) + '">' +
        (favorites.has(car.id) ? '♥' : '♡') + '</button></div>' +
        '<div class="cardbody"><span class="brand">' + car.brand + '</span><h3>' + car.model + '</h3>' +
        '<p class="engine">' + car.version + '</p><div class="specs"><span>' + car.year + '</span><span>' +
        car.km.toLocaleString('pt-BR') + ' km</span><span>' + car.power + ' cv</span></div>' +
        '<div class="cardbottom"><div class="price"><small>VALOR À VISTA</small>' + money(car.price) + '</div>' +
        '<div class="cardbuttons"><button class="btn outline" data-detail="' + car.id + '">Ver detalhes</button>' +
        '<button class="btn" data-buy="' + car.id + '">Comprar ↗</button></div>' +
        '<label class="compare-label"><input type="checkbox" data-compare="' + car.id + '" ' +
        (compared.has(car.id) ? 'checked' : '') + '> Comparar veículo</label></div></div></article>').join('') :
        '<div class="empty"><h3>Nenhum veículo encontrado.</h3><p class="muted">Ajuste os filtros.</p><button class="btn outline" data-reset>Limpar filtros</button></div>';
    renderCompareBar();
}

function resetFilters() {
    ['search', 'category', 'brand', 'budget'].forEach((id) => $(id).value = '');
    $('sort').value = 'featured';
    onlyFavorites = false;
    renderCars();
}

function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    try { localStorage.setItem(favoritesKey, JSON.stringify(Array.from(favorites))); }
    catch { toast('Não foi possível salvar os favoritos neste navegador.'); }
    renderCars();
}

function credit(car) {
    return '<p class="credits">Foto: ' + car.credit.author + ' · <a target="_blank" rel="noopener noreferrer" href="' +
        car.source + '">Wikimedia Commons</a> · <a target="_blank" rel="noopener noreferrer" href="' +
        car.credit.license + '">Licença Creative Commons</a>.</p>';
}

function freight() { return $('delivery').value === 'home' ? 800 : 0; }

function summary(id) {
    if (!selected) {
        $(id).innerHTML = '<span class="smallcaps">BEM-VINDO À PF MOTORS</span><h2>Sua próxima história começa aqui.</h2>' +
            '<p class="muted">Explore nossos esportivos e carros de luxo.</p>';
        return;
    }
    const shipping = id === 'checkout-summary' ? freight() : 0;
    $(id).innerHTML = '<img src="' + selected.photo + '" alt="' + selected.brand + ' ' + selected.model + '">' +
        '<h3>' + selected.brand + ' ' + selected.model + '</h3><p class="muted">' + selected.version +
        '<br>' + selected.year + ' · ' + selected.km.toLocaleString('pt-BR') + ' km</p>' +
        '<div class="row"><span>Veículo</span><strong>' + money(selected.price) + '</strong></div>' +
        '<div class="row"><span>Entrega</span><span>' + (shipping ? money(shipping) : 'Grátis') + '</span></div>' +
        '<div class="row total"><span>Total</span><span>' + money(selected.price + shipping) + '</span></div>' +
        '<p class="muted small">Anúncio ilustrativo.</p>' + credit(selected);
}

function checkout() {
    if (!selected) return showScreen('home');
    if (!customer) return login();
    $('customer').textContent = customer.name + ' · ' + customer.email + ' · ' + customer.phone;
    summary('checkout-summary');
    showScreen('checkout');
}

function buy(id) {
    selected = vehicles.find((car) => car.id === id);
    if (selected) checkout();
}

function payment(principal, rate, months) {
    return rate === 0 ? principal / months : principal * rate / (1 - Math.pow(1 + rate, -months));
}

function simulate(car) {
    const entry = Number($('sim-entry').value);
    const rate = Number($('sim-rate').value) / 100;
    const months = Number($('sim-months').value);
    if (!$('sim-entry').checkValidity() || !$('sim-rate').checkValidity() || !$('sim-entry').value || !$('sim-rate').value) {
        $('sim-result').textContent = 'Revise os valores de entrada e taxa.';
        return;
    }
    const principal = car.price - entry;
    const installment = payment(principal, rate, months);
    $('sim-result').innerHTML = principal === 0 ? '<strong>Compra integral à vista.</strong>' :
        months + ' parcelas estimadas de <strong>' + money(installment) + '</strong><br>' +
        'Juros estimados: ' + money(installment * months - principal) + '<br>' +
        'Total com entrada: ' + money(entry + installment * months);
}

function detail(id) {
    const car = vehicles.find((item) => item.id === id);
    if (!car) return;
    const specs = [['Versão', car.version], ['Ano', car.year], ['Motor', car.engine], ['Potência', car.power + ' cv'],
        ['Câmbio', car.gear], ['Tração', car.drive], ['0–100 km/h', car.accel],
        ['Quilometragem', car.km.toLocaleString('pt-BR') + ' km'], ['Cor', car.color]];
    $('detail-title').textContent = car.brand + ' ' + car.model;
    $('detail-body').innerHTML = '<div class="detailgrid"><div><img class="detailphoto" src="' + car.photo +
        '" alt="' + car.brand + ' ' + car.model + '">' + credit(car) + '<h3>Destaques</h3><p class="muted">' +
        car.desc + '</p><ul class="features">' + car.features.map((feature) => '<li>' + feature + '</li>').join('') +
        '</ul></div><div><span class="smallcaps">' + car.category.toUpperCase() + '</span><h2>' + car.model +
        '</h2><p class="muted">' + car.version + '</p><div class="detailprice">' + money(car.price) + '</div>' +
        '<p class="muted">Valor de referência</p><button class="btn wide" data-buy="' + car.id +
        '">Continuar ↗</button><div class="specgrid">' + specs.map(([name, value]) =>
            '<div><small>' + name + '</small><strong>' + value + '</strong></div>').join('') + '</div></div></div>' +
        '<div class="notice">Fotos ilustrativas e dados de veículos fictícios para fins acadêmicos.</div>' +
        '<section class="simulator"><h3>Simulador de financiamento</h3>' +
        '<div class="simfields"><label>Entrada (R$)<input id="sim-entry" type="number" min="0" max="' + car.price +
        '" value="' + Math.round(car.price * .3) + '"></label><label>Prazo<select id="sim-months">' +
        '<option value="12">12 meses</option><option value="24">24 meses</option>' +
        '<option value="36" selected>36 meses</option><option value="48">48 meses</option>' +
        '<option value="60">60 meses</option></select></label>' +
        '<label>Taxa ao mês (%)<input id="sim-rate" type="number" min="0" max="10" step=".1" value="1.5"></label></div>' +
        '<div class="simresult" id="sim-result" aria-live="polite"></div>' +
        '<p class="credits">Simulação pela Tabela Price; não inclui IOF, CET, tarifas ou seguros. Não é uma oferta de crédito.</p></section>';
    ['sim-entry', 'sim-rate', 'sim-months'].forEach((element) => $(element).addEventListener('input', () => simulate(car)));
    simulate(car);
    $('detail-dialog').showModal();
}

function compare() {
    if (compared.size < 2) return toast('Selecione pelo menos 2 veículos.');
    const list = vehicles.filter((car) => compared.has(car.id));
    const fields = [['Preço', (c) => money(c.price)], ['Versão', (c) => c.version],
        ['Ano', (c) => c.year], ['Motor', (c) => c.engine], ['Potência', (c) => c.power + ' cv'],
        ['Câmbio', (c) => c.gear], ['Tração', (c) => c.drive], ['0–100 km/h', (c) => c.accel],
        ['Categoria', (c) => c.category]];
    $('compare-body').innerHTML = '<table><thead><tr><th>Característica</th>' +
        list.map((car) => '<th>' + car.brand + '<br>' + car.model + '</th>').join('') + '</tr></thead><tbody>' +
        '<tr><th>Foto</th>' + list.map((car) => '<td><img src="' + car.photo + '" alt="' + car.model + '"></td>').join('') + '</tr>' +
        fields.map(([label, get]) => '<tr><th>' + label + '</th>' +
            list.map((car) => '<td>' + get(car) + '</td>').join('') + '</tr>').join('') +
        '<tr><th>Escolher</th>' + list.map((car) =>
            '<td><button class="btn" data-buy="' + car.id + '">Continuar</button></td>').join('') +
        '</tr></tbody></table>';
    $('compare-dialog').showModal();
}

const requiredAddress = ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
function updateDelivery() {
    const needsAddress = $('delivery').value === 'home';
    $('address-box').classList.toggle('hidden', !needsAddress);
    requiredAddress.forEach((id) => $(id).required = needsAddress);
    summary('checkout-summary');
}

function addressText() {
    const parts = [ $('street').value.trim() + ', ' + $('number').value.trim(),
        $('complement').value.trim(), $('neighborhood').value.trim(),
        $('city').value.trim() + '/' + $('state').value.trim().toUpperCase(),
        'CEP ' + $('cep').value.trim() ];
    return parts.filter(Boolean).join(' · ');
}

async function lookupCep() {
    const digits = $('cep').value.replace(/\D/g, '').slice(0, 8);
    $('cep').value = digits.length > 5 ? digits.slice(0, 5) + '-' + digits.slice(5) : digits;
    if (cepController) cepController.abort();
    if (digits.length !== 8) {
        $('cep-status').textContent = digits.length ? 'Digite os 8 números do CEP.' : '';
        return;
    }
    cepController = new AbortController();
    $('cep-status').textContent = 'Consultando CEP...';
    try {
        const response = await fetch('https://viacep.com.br/ws/' + digits + '/json/', { signal: cepController.signal });
        if (!response.ok) throw new Error('Falha na consulta');
        const data = await response.json();
        if (data.erro) {
            $('cep-status').textContent = 'CEP não encontrado. Confira ou preencha manualmente.';
            return;
        }
        $('street').value = data.logradouro || '';
        $('neighborhood').value = data.bairro || '';
        $('city').value = data.localidade || '';
        $('state').value = data.uf || '';
        $('cep-status').textContent = 'Endereço encontrado. Confira e informe o número.';
        $('number').focus();
    } catch (error) {
        if (error.name !== 'AbortError') $('cep-status').textContent = 'Consulta indisponível. Preencha o endereço manualmente.';
    }
}

// Botões dinâmicos do catálogo e dos diálogos.
document.addEventListener('click', (event) => {
    const buyButton = event.target.closest('[data-buy]');
    const favButton = event.target.closest('[data-favorite]');
    const detailButton = event.target.closest('[data-detail]');
    if (buyButton) buy(Number(buyButton.dataset.buy));
    if (favButton) toggleFavorite(Number(favButton.dataset.favorite));
    if (detailButton) detail(Number(detailButton.dataset.detail));
    if (event.target.closest('[data-reset]')) resetFilters();
    if (event.target.closest('[data-close]')) event.target.closest('dialog').close();
    if (event.target.closest('[data-privacy]')) $('privacy-dialog').showModal();
    if (event.target.closest('[data-login]')) login();
    if (event.target.closest('[data-register]')) register();
});

$('cars').addEventListener('change', (event) => {
    if (!event.target.matches('[data-compare]')) return;
    const id = Number(event.target.dataset.compare);
    if (event.target.checked) {
        if (compared.size >= 3) {
            event.target.checked = false;
            return toast('Você pode comparar até 3 veículos.');
        }
        compared.add(id);
    } else compared.delete(id);
    renderCompareBar();
});

['search', 'category', 'brand', 'budget', 'sort'].forEach((id) => $(id).addEventListener('input', renderCars));
$('clear-filters').onclick = resetFilters;
$('fav-filter').onclick = () => { onlyFavorites = !onlyFavorites; renderCars(); };
$('nav-fav').onclick = () => {
    resetFilters();
    onlyFavorites = true;
    showScreen('home');
    renderCars();
    $('estoque').scrollIntoView({ behavior: 'smooth' });
};
$('compare-open').onclick = compare;
$('compare-clear').onclick = () => { compared.clear(); renderCars(); };
$('account').onclick = () => customer ? toast('Você está conectado como ' + customer.name + '.') : register();
$('login-button').onclick = login;
$('logout-button').onclick = () => {
    customer = null;
    sessionStorage.removeItem(sessionKey);
    updateAuthUI();
    showScreen('home');
    toast('Você saiu da conta.');
};

document.querySelectorAll('[data-back]').forEach((button) => button.onclick = () => showScreen('home'));
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    showScreen('home');
    const anchor = link.getAttribute('href');
    document.querySelector(anchor === '#inicio' ? 'header' : anchor)?.scrollIntoView({ behavior: 'smooth' });
}));

['password', 'confirm'].forEach((id) => $(id).addEventListener('input', () => $('confirm').setCustomValidity('')));
$('name').addEventListener('input', () => $('name').setCustomValidity(''));

$('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('name').value.trim();
    const email = $('email').value.trim().toLowerCase();
    const phone = $('phone').value.trim();
    const password = $('password').value;
    if (name.length < 3) {
        $('name').setCustomValidity('Informe seu nome completo.');
        return $('name').reportValidity();
    }
    if (password !== $('confirm').value) {
        $('confirm').setCustomValidity('As senhas devem ser iguais.');
        return $('confirm').reportValidity();
    }
    if (getAccount()?.email === email) return toast('Este e-mail já está cadastrado neste navegador. Faça login.');
    if (!crypto?.subtle) return toast('Abra o site em HTTPS ou localhost para criar a conta.');
    try {
        const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
            byte.toString(16).padStart(2, '0')).join('');
        const verifier = await passwordVerifier(password, salt);
        const account = {
            name, email, phone, salt, verifier,
            marketing: $('marketing-accept').checked,
            consentedAt: new Date().toISOString()
        };
        localStorage.setItem(accountKey, JSON.stringify(account));
        sessionStorage.setItem(sessionKey, email);
        customer = { name, email, phone };
        $('register-form').reset();
        updateAuthUI();
        if (selected) checkout();
        else { showScreen('home'); toast('Conta criada! Bem-vindo à PF Motors.'); }
    } catch {
        toast('Não foi possível salvar a conta neste navegador.');
    }
});

$('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const account = getAccount();
    const email = $('login-email').value.trim().toLowerCase();
    const password = $('login-password').value;
    const errorBox = $('login-error');
    errorBox.classList.add('hidden');
    try {
        const valid = account && account.email === email &&
            await passwordVerifier(password, account.salt) === account.verifier;
        if (!valid) {
            errorBox.textContent = 'E-mail ou senha inválidos para a conta local.';
            errorBox.classList.remove('hidden');
            return;
        }
        sessionStorage.setItem(sessionKey, email);
        customer = { name: account.name, email: account.email, phone: account.phone };
        $('login-form').reset();
        updateAuthUI();
        if (selected) checkout();
        else { showScreen('home'); toast('Login realizado com sucesso.'); }
    } catch {
        errorBox.textContent = 'Não foi possível entrar. Use HTTPS ou localhost.';
        errorBox.classList.remove('hidden');
    }
});

$('delete-account').onclick = () => {
    if (!confirm('Excluir os dados da conta deste navegador? Esta ação não pode ser desfeita.')) return;
    localStorage.removeItem(accountKey);
    sessionStorage.removeItem(sessionKey);
    customer = null;
    updateAuthUI();
    showScreen('home');
    toast('Dados da conta local excluídos.');
};

$('edit').onclick = register;
$('delivery').onchange = updateDelivery;
$('cep').addEventListener('input', lookupCep);
$('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!customer || !selected) return login();
    if ($('delivery').value === 'home') {
        if ($('cep').value.replace(/\D/g, '').length !== 8) return toast('Informe um CEP válido.');
        if (!/^[a-z]{2}$/i.test($('state').value.trim())) return toast('Informe uma UF válida.');
    }
    const total = selected.price + freight();
    $('success-text').textContent = customer.name + ', recebemos sua solicitação para ' +
        selected.brand + ' ' + selected.model + '.';
    $('receipt').textContent = 'Referência PF-' + Date.now().toString().slice(-8) +
        ' • Total ilustrativo: ' + money(total) + ' • ' + $('payment').value + ' • ' +
        ($('delivery').value === 'home' ? 'Entrega: ' + addressText() : 'Retirada na loja');
    showScreen('success');
    selected = null;
    $('checkout-form').reset();
    $('cep-status').textContent = '';
    updateDelivery();
});

[...new Set(vehicles.map((car) => car.brand))].sort().forEach((brand) => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    $('brand').appendChild(option);
});
restoreSession();
renderCars();
