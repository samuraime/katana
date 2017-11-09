/**
 * convert mongodb `_id` to `id`
 */
export default function normalizeId(json) {
  if (Array.isArray(json)) {
    return json.map(normalizeId);
  }
  if (typeof json === 'object') {
    const normalizedJson = {};
    Object.keys(json).forEach((key) => {
      if (key === '_id') {
        normalizedJson.id = json[key];
      } else {
        normalizedJson[key] = normalizeId(json[key]);
      }
    });
    return normalizedJson;
  }
  return json;
}

