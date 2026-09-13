import fs from 'fs';

function parseCSV(content, cpse, filename) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const cols = [];
    let cur = '';
    let inQuotes = false;

    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '"') {
        if (inQuotes && line[c + 1] === '"') {
          cur += '"';
          c++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        cols.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    cols.push(cur.trim());

    const code = cols[0] || '';
    const desc = cols[1] || '';
    const uom = cols[2] || '';
    const type = cols[3] || '';
    const size = cols[4] || '';
    const grade = cols[5] || '';
    const pressure = cols[6] || '';
    const standard = cols[7] || '';
    const spec = cols[8] || '';

    let category = 'Industrial Equipment';
    if (type.includes('Valve')) category = 'Valves & Flow Control';
    else if (
      type.includes('Pipe') ||
      type.includes('Flange') ||
      type.includes('Tee') ||
      type.includes('Elbow') ||
      type.includes('Reducer') ||
      type.includes('Union') ||
      type.includes('Coupling') ||
      type.includes('Cap') ||
      type.includes('Nipple')
    )
      category = 'Pipes & Fittings';
    else if (type.includes('Pump')) category = 'Pumps & Rotating Equipment';
    else if (type.includes('Bearing')) category = 'Bearings & Power Transmission';
    else if (type.includes('Motor')) category = 'Electrical Motors & Drives';
    else if (type.includes('Transmitter') || type.includes('Gauge')) category = 'Instrumentation & Sensors';
    else if (type.includes('Bolt') || type.includes('Nut') || type.includes('Washer')) category = 'Fasteners & Hardware';
    else if (type.includes('Gasket')) category = 'Gaskets & Sealing';

    records.push({
      id: `rec-${cpse.toLowerCase()}-${i.toString().padStart(4, '0')}`,
      cpse,
      sourceMaterialCode: code,
      originalDescription: desc,
      materialCategory: category,
      materialSubcategory: type,
      uom,
      materialGrade: grade === 'N/A' ? '' : grade,
      size: size === 'N/A' ? '' : size,
      pressureRating: pressure === 'N/A' ? '' : pressure,
      standard: standard === 'N/A' ? '' : standard,
      specification: spec === 'N/A' ? '' : spec,
      criticalAttributes: {
        'Material Type': type,
        ...(size !== 'N/A' && size !== '' ? { 'Size': size } : {}),
        ...(grade !== 'N/A' && grade !== '' ? { 'Grade': grade } : {}),
        ...(pressure !== 'N/A' && pressure !== '' ? { 'Pressure Rating': pressure } : {}),
        ...(standard !== 'N/A' && standard !== '' ? { 'Standard': standard } : {}),
        ...(spec !== 'N/A' && spec !== '' ? { 'Technical Spec': spec } : {}),
      },
      createdAt: '2026-09-17',
      sourceFile: filename,
      sourceRow: i + 1,
    });
  }
  return records;
}

const ongc = parseCSV(fs.readFileSync('data/ONGC.csv', 'utf8'), 'ONGC', 'ONGC.csv');
const iocl = parseCSV(fs.readFileSync('data/IOCL.csv', 'utf8'), 'IOCL', 'IOCL.csv');
const bhel = parseCSV(fs.readFileSync('data/BHEL.csv', 'utf8'), 'BHEL', 'BHEL.csv');
const sail = parseCSV(fs.readFileSync('data/SAIL.csv', 'utf8'), 'SAIL', 'SAIL.csv');

console.log('Parsed rows:', { ongc: ongc.length, iocl: iocl.length, bhel: bhel.length, sail: sail.length });

const out = `import { MaterialRecord } from '../types/MaterialMasterTypes';

export const ACTUAL_ONGC_RECORDS: MaterialRecord[] = ${JSON.stringify(ongc, null, 2)};

export const ACTUAL_IOCL_RECORDS: MaterialRecord[] = ${JSON.stringify(iocl, null, 2)};

export const ACTUAL_BHEL_RECORDS: MaterialRecord[] = ${JSON.stringify(bhel, null, 2)};

export const ACTUAL_SAIL_RECORDS: MaterialRecord[] = ${JSON.stringify(sail, null, 2)};

export const ALL_ACTUAL_RECORDS: MaterialRecord[] = [
  ...ACTUAL_ONGC_RECORDS,
  ...ACTUAL_IOCL_RECORDS,
  ...ACTUAL_BHEL_RECORDS,
  ...ACTUAL_SAIL_RECORDS,
];
`;

fs.writeFileSync('src/data/actualCSVDataset.ts', out);
console.log('Wrote src/data/actualCSVDataset.ts successfully! Total records:', ongc.length + iocl.length + bhel.length + sail.length);
