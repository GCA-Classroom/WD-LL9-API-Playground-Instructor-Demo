/* ============================================================
   COUNTRY EXPLORER — script.js
   ------------------------------------------------------------
   THE PATTERN (this is the whole lab):
     1. Get user input
     2. Fetch data from an API
     3. Convert the response to JSON
     4. Pull the piece of data you need off the response
     5. Drop it into the page with .textContent / .src
   Steps 1-6 below are built together as an instructor demo.
   Steps 7-10 are your team's mission — they reuse the exact
   same pattern shown in Step 6, just with different data.
   ============================================================ */
// --- Element references (grab everything once, up front) -----
const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("errorMessage");
const resultCard = document.getElementById("resultCard");
const flagImg = document.getElementById("flagImg");
const countryNameEl = document.getElementById("countryName");
const capitalEl = document.getElementById("capitalValue");
const regionEl = document.getElementById("regionValue");
const populationEl = document.getElementById("populationValue");
const languagesEl = document.getElementById("languagesValue");
/* ------------------------------------------------------------
   STEP 1: Connect the button's click event.
   ------------------------------------------------------------ */
searchBtn.addEventListener("click", fetchCountry);
/* ------------------------------------------------------------
   STEP 2: Create fetchCountry()
   ------------------------------------------------------------ */
async function fetchCountry() {
  const countryName = countryInput.value.trim();
  if (!countryName) return; // nothing typed, nothing to do
  /* ------------------------------------------------------------
     STEP 3: Show "Loading..."
     ------------------------------------------------------------ */
  showLoading();
  try {
    /* ------------------------------------------------------------
       STEP 4: Build the fetch request
       ------------------------------------------------------------
       The old v3.1 API is retired. v5 requires an API key sent as
       an Authorization header, and (for browser requests) your
       API key must allow-list your origin (127.0.0.1 / localhost/ or your live preview url without the HTTPS)
       on the API Keys page at restcountries.com.
       ------------------------------------------------------------ */
    const API_KEY = "";
    const url =
      `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(countryName)}` +
      `&response_fields=names.common,capitals,region,population,languages,flag.url_png,flag.description`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!response.ok) {
      throw new Error("Country not found");
    }
    /* ------------------------------------------------------------
       STEP 5: Convert response -> JSON
       ------------------------------------------------------------
       v5 wraps results in { data: { objects: [...] } }
       ------------------------------------------------------------ */
    const data = await response.json();
    const objects = data.data.objects;
    if (!objects || objects.length === 0) {
      throw new Error("Country not found");
    }
    const country = objects[0];
    /* ------------------------------------------------------------
       STEP 6: Display ONE property. Start simple.
       Display only: Country Name.
       ------------------------------------------------------------ */
    countryNameEl.textContent = country.names.common;
    /* ============================================================
       TEAM BUILD STARTS HERE
       ============================================================ */
    /* ------------------------------------------------------------
       STEP 7: Display the Flag
       ------------------------------------------------------------
       v5 field is flag.url_png (not flags.png), and flag.description
       is already alt-text-ready copy from the API.
       ------------------------------------------------------------ */
    flagImg.src = country.flag.url_png;
    flagImg.alt = country.flag.description || `Flag of ${country.names.common}`;
    /* ------------------------------------------------------------
       STEP 8: Display Capital, Region, Population
       ------------------------------------------------------------
       v5's capitals is an array of OBJECTS (each with a .name),
       not an array of plain strings like the old API.
       ------------------------------------------------------------ */
    capitalEl.textContent = country.capitals[0].name;
    regionEl.textContent = country.region;
    populationEl.textContent = country.population.toLocaleString();
    /* ------------------------------------------------------------
       STEP 9: Display Languages
       ------------------------------------------------------------
       v5's languages is an ARRAY of objects (each with a name
       field), not an object keyed by language code like the old API.
       ------------------------------------------------------------ */
    languagesEl.textContent = country.languages
      .map((lang) => lang.name)
      .join(", ");
    /* ------------------------------------------------------------
       STEP 10a: Improve the experience — clean up on SUCCESS
       ------------------------------------------------------------ */
    hideLoading();
    resultCard.classList.remove("hidden");
    errorEl.classList.add("hidden");
  } catch (error) {
    /* ------------------------------------------------------------
       STEP 10b: Improve the experience — error handling
       ------------------------------------------------------------ */
    hideLoading();
    resultCard.classList.add("hidden");
    errorEl.textContent = `We couldn't find "${countryName}". Check the spelling and try again.`;
    errorEl.classList.remove("hidden");
    console.error(error);
  }
}
/* ------------------------------------------------------------
   Helper functions — already built for you.
   ------------------------------------------------------------ */
function showLoading() {
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  resultCard.classList.add("hidden");
}
function hideLoading() {
  loadingEl.classList.add("hidden");
}

