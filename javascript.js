// Função principal auto-executável
(function() {
    // Elementos do DOM
    const passwordField = document.getElementById('campo-senha');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    
    // Conjuntos de caracteres
    const charsets = {
        uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
        lowercase: 'abcdefghijkmnpqrstuvwxyz',
        numbers: '23456789',
        symbols: '!@#$%^&*'
    };

    // Configuração inicial
    let passwordLength = 12;
    lengthValue.textContent = passwordLength;
    
    // Gerar senha imediatamente ao carregar
    generatePassword();
    
    // Event Listeners
    generateBtn && generateBtn.addEventListener('click', generatePassword);
    copyBtn && copyBtn.addEventListener('click', copyPassword);
    refreshBtn && refreshBtn.addEventListener('click', generatePassword);
    lengthSlider && lengthSlider.addEventListener('input', updateLength);
    
    // Função para gerar senha
    function generatePassword() {
        console.log("Gerando nova senha...");
        
        // Determinar charset ativo
        let activeCharset = '';
        
        if (document.getElementById('uppercase')?.checked) {
            activeCharset += charsets.uppercase;
        }
        if (document.getElementById('lowercase')?.checked) {
            activeCharset += charsets.lowercase;
        }
        if (document.getElementById('numbers')?.checked) {
            activeCharset += charsets.numbers;
        }
        if (document.getElementById('symbols')?.checked) {
            activeCharset += charsets.symbols;
        }
        
        // Fallback se nenhum estiver selecionado
        if (activeCharset === '') {
            activeCharset = charsets.uppercase + charsets.lowercase;
            document.getElementById('uppercase').checked = true;
            document.getElementById('lowercase').checked = true;
        }
        
        // Gerar senha
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * activeCharset.length);
            password += activeCharset[randomIndex];
        }
        
        // Exibir senha
        passwordField.value = password;
        console.log("Senha gerada com sucesso:", password);
    }
    
    // Função para copiar senha
    function copyPassword() {
        passwordField.select();
        document.execCommand('copy');
        
        // Feedback visual
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 2000);
    }
    
    // Atualizar tamanho
    function updateLength() {
        passwordLength = this.value;
        lengthValue.textContent = passwordLength;
        generatePassword();
    }
})();