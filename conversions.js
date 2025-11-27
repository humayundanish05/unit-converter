export const categories = {
  length: {
    units: {
      m: { name: 'Meters', factor: 1 },
      km: { name: 'Kilometers', factor: 1000 },
      cm: { name: 'Centimeters', factor: 0.01 },
      mm: { name: 'Millimeters', factor: 0.001 },
      in: { name: 'Inches', factor: 0.0254 },
      ft: { name: 'Feet', factor: 0.3048 },
      yd: { name: 'Yards', factor: 0.9144 },
      mi: { name: 'Miles', factor: 1609.344 }
    }
  },
  area: {
    units: {
      sqm: { name: 'Square Meters', factor: 1 },
      sqkm: { name: 'Square Kilometers', factor: 1000000 },
      sqft: { name: 'Square Feet', factor: 0.092903 },
      acre: { name: 'Acres', factor: 4046.86 },
      ha: { name: 'Hectares', factor: 10000 }
    }
  },
  weight: {
    units: {
      kg: { name: 'Kilograms', factor: 1 },
      g: { name: 'Grams', factor: 0.001 },
      mg: { name: 'Milligrams', factor: 0.000001 },
      lb: { name: 'Pounds', factor: 0.453592 },
      oz: { name: 'Ounces', factor: 0.0283495 }
    }
  },
  temperature: {
    units: {
      c: { name: 'Celsius' },
      f: { name: 'Fahrenheit' },
      k: { name: 'Kelvin' }
    },
    isComplex: true
  }
};

export function convert(value, fromUnit, toUnit, category) {
  const val = parseFloat(value);
  if (isNaN(val)) return '';

  if (category === 'temperature') {
    return convertTemperature(val, fromUnit, toUnit);
  }

  const catData = categories[category];
  const fromFactor = catData.units[fromUnit].factor;
  const toFactor = catData.units[toUnit].factor;

  // Convert to base unit then to target unit
  const baseValue = val * fromFactor;
  const result = baseValue / toFactor;
  
  return formatResult(result);
}

function convertTemperature(val, from, to) {
  let celsius;
  
  // To Celsius
  if (from === 'c') celsius = val;
  else if (from === 'f') celsius = (val - 32) * 5/9;
  else if (from === 'k') celsius = val - 273.15;

  // From Celsius
  let result;
  if (to === 'c') result = celsius;
  else if (to === 'f') result = (celsius * 9/5) + 32;
  else if (to === 'k') result = celsius + 273.15;

  return formatResult(result);
}

function formatResult(num) {
  // Avoid long decimals but keep precision
  if (Number.isInteger(num)) return num;
  return parseFloat(num.toFixed(6));
}
