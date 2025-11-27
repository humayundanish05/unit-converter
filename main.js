import { categories, convert } from './conversions.js';

const fromInput = document.getElementById('from-value');
const toInput = document.getElementById('to-value');
const fromSelect = document.getElementById('from-unit');
const toSelect = document.getElementById('to-unit');
const swapBtn = document.getElementById('swap-btn');
const copyBtn = document.getElementById('copy-btn');
const navBtns = document.querySelectorAll('.nav-btn');

let currentCategory = 'length';

function populateUnits(category) {
    const units = categories[category].units;
    const options = Object.keys(units).map(key =>
        `<option value="${key}">${units[key].name}</option>`
    ).join('');

    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;

    // Set defaults (first two different units if possible)
    const keys = Object.keys(units);
    fromSelect.value = keys[0];
    toSelect.value = keys[1] || keys[0];
}

function updateConversion() {
    const result = convert(
        fromInput.value,
        fromSelect.value,
        toSelect.value,
        currentCategory
    );
    toInput.value = result;
}

// Event Listeners
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update category
        currentCategory = btn.dataset.category;
        populateUnits(currentCategory);
        updateConversion();
    });
});

fromInput.addEventListener('input', updateConversion);
fromSelect.addEventListener('change', updateConversion);
toSelect.addEventListener('change', updateConversion);

swapBtn.addEventListener('click', () => {
    // Swap units
    const tempUnit = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempUnit;

    // Swap values
    const tempVal = fromInput.value;
    fromInput.value = toInput.value;
    updateConversion(); // Recalculate to be sure
});

copyBtn.addEventListener('click', () => {
    if (toInput.value) {
        navigator.clipboard.writeText(toInput.value).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied!';
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
    }
});

// Initialize
populateUnits(currentCategory);
updateConversion();
