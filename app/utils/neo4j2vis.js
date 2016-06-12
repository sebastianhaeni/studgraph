import { DataSet } from 'vis';

export default function (response) {
  const graph = response.results.length > 0 && response.results[0].data.length > 0
    ? response.results[0].data
    : [];

  const nodes = new DataSet();
  const edges = new DataSet();

  const cache = {};

  for (const collection of graph) {
    for (let i = 0; i < collection.row.length; i++) {
      const node = collection.row[i];
      if (nodes.get(node.uid)) {
        continue;
      }
      nodes.add({
        id: node.uid,
        label: node.name_de,
        level: i,
      });
    }
    for (let i = 0; i < collection.meta.length - 1; i++) {
      if (i === 1) {
        nodes.update({ id: collection.row[i].uid, label: collection.row[i].name_de, color: '#ffff00' });
      }
      if (!cache.hasOwnProperty(collection.row[i].uid)) {
        cache[collection.row[i].uid] = [];
      }
      if (cache[collection.row[i].uid].indexOf(collection.row[i + 1].uid) >= 0 ||
        collection.row[i].uid === collection.row[i + 1].uid) {
        continue;
      }
      cache[collection.row[i].uid].push(collection.row[i + 1].uid);
      edges.add({
        from: collection.row[i].uid,
        to: collection.row[i + 1].uid,
        arrows: 'to',
      });
    }
  }

  // create a network
  return {
    nodes,
    edges,
  };
}
