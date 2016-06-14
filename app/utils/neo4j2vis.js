import { DataSet } from 'vis';

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

function invertColor(hexTripletColor) {
  let color = hexTripletColor;
  color = parseInt(color, 16);          // convert to integer
  color = 0xFFFFFF ^ color;             // invert three bytes
  color = color.toString(16);           // convert to hex
  color = (`000000${color}`).slice(-6); // pad with leading zeros
  return color;
}

export default function (response) {
  const meta = new DataSet();
  const nodes = new DataSet();
  const edges = new DataSet();

  const cache = {};

  for (let i = 0; i < response.nodes.length; i++) {
    const collection = response.nodes[i];
    const keys = Object.keys(collection);
    for (let j = 0; j < keys.length; j++) {
      const element = collection[keys[j]];
      const properties = element.properties;
      const labels = element.labels;

      if (nodes.get(element.id)) {
        continue;
      }

      const color = intToRGB(hashCode(labels.join() + keys[j]));

      nodes.add({
        id: element.id,
        label: properties.name_de,
        color: `#${color}`,
        font: {
          color: `#${invertColor(color)}`,
        },
      });
      meta.add({
        id: element.id,
        data: properties,
      });
    }

    const relations = response.relations[i];
    for (let j = 0; j < relations.length; j++) {
      const relation = relations[j];

      if (!cache.hasOwnProperty(relation.startNodeIdentity)) {
        cache[relation.startNodeIdentity] = [];
      }

      if (cache[relation.startNodeIdentity].indexOf(relation.endNodeIdentity) >= 0 ||
        relation.startNodeIdentity === relation.endNodeIdentity) {
        continue;
      }

      cache[relation.startNodeIdentity].push(relation.endNodeIdentity);

      edges.add({
        from: relation.startNodeIdentity,
        to: relation.endNodeIdentity,
        label: relation.type,
        arrows: 'to',
      });
    }
  }

  // create a network
  return {
    meta,
    nodes,
    edges,
  };
}
