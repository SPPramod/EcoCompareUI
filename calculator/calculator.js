document.getElementById("emissionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Input values
    const weight = parseFloat(document.getElementById("weight").value);
    const distance = parseFloat(document.getElementById("distance").value);
    const temperature = parseFloat(document.getElementById("temperature").value); // Currently unused
    const altitude = parseFloat(document.getElementById("altitude").value); // Currently unused
    const fuel = document.getElementById("fuel").value;
    const energySource = document.getElementById("energySource").value;

    // Constants for emission factors (example values in kg CO2/km)
    const fuelEmissionFactors = {
        petrol: 2.31,
        diesel: 2.68
    };

    const evEmissionFactors = {
        hard_coal: 894,
        lignite: 1008,
        natural_gas: 410,
        nuclear: 55,
        hydro: 3,
        wind: 9,
        solar: 109,
        biomass: 194,
        others: 587
    };

    // Calculations
    const fuelEmissionFactor = fuelEmissionFactors[fuel];
    const evEmissionFactor = evEmissionFactors[energySource];

    const emissionsForPetrolDiesel = fuelEmissionFactor * distance;
    const emissionsForEV = evEmissionFactor * distance;

    const totalGainPossible = emissionsForPetrolDiesel - emissionsForEV;

    // Display results
    document.getElementById("emission-ev").textContent = `Emissions for EV (kg CO2): ${emissionsForEV.toFixed(2)}`;
    document.getElementById("emission-petrol-diesel").textContent = `Emissions for Petrol/Diesel (kg CO2): ${emissionsForPetrolDiesel.toFixed(2)}`;
    document.getElementById("total-gain").textContent = `Total Gain Possible (kg CO2): ${totalGainPossible.toFixed(2)}`;
});