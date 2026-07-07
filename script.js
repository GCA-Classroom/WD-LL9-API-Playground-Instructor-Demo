/* ============================================================
   COUNTRY EXPLORER — ANSWER KEY
   Full working version of script.js, Steps 1-10 complete.
   Give students script.js; keep this for yourself.
   ============================================================ */

const searchBtn     = document.getElementById('searchBtn');
const countryInput  = document.getElementById('countryInput');
const loadingEl      = document.getElementById('loading');
const errorEl        = document.getElementById('errorMessage');
const resultCard     = document.getElementById('resultCard');

const flagImg        = document.getElementById('flagImg');
const countryNameEl  = document.getElementById('countryName');
const capitalEl      = document.getElementById('capitalValue');
const regionEl       = document.getElementById('regionValue');
const populationEl   = document.getElementById('populationValue');
const languagesEl    = document.getElementById('languagesValue');

// STEP 1
searchBtn.addEventListener('click', fetchCountry);
countryInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') fetchCountry();
});

// STEP 2
async function fetchCountry() {

  const countryName = countryInput.value.trim();
  if (!countryName) return;

  // STEP 3
  showLoading();

  try {
    // STEP 4
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Country not found');
    }

    // STEP 5
    const data = await response.json();
    const country = data[0];

    // STEP 6
    countryNameEl.textContent = country.name.common;

    // STEP 7 — Flag
    flagImg.src = country.flags.png;
    flagImg.alt = `Flag of ${country.name.common}`;

    // STEP 8 — Capital, Region, Population
    capitalEl.textContent    = country.capital ? country.capital[0] : 'N/A';
    regionEl.textContent     = country.region;
    populationEl.textContent = country.population.toLocaleString();

    // STEP 9 — Languages
    languagesEl.textContent = country.languages
      ? Object.values(country.languages).join(', ')
      : 'N/A';

    // STEP 10a — success cleanup
    hideLoading();
    resultCard.classList.remove('hidden');
    errorEl.classList.add('hidden');

  } catch (error) {
    // STEP 10b — error handling
    hideLoading();
    resultCard.classList.add('hidden');
    errorEl.textContent = `We couldn't find "${countryName}". Check the spelling and try again.`;
    errorEl.classList.remove('hidden');
    console.error(error);
  }
}

function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  resultCard.classList.add('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}
