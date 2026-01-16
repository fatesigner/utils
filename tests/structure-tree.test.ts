import { expect } from 'chai';

import { StructureTree } from '../dist/structure-tree';

describe('# test structure-tree.', function () {
  it('## find/move with idKey', function () {
    const tree = new StructureTree({
      idKey: 'key',
      labelKey: 'name',
      childrenKey: 'children'
    });
    const nodes = [
      { key: 'a', name: 'A', children: [{ key: 'a1', name: 'A1' }] },
      { key: 'b', name: 'B' },
      { key: 'c', name: 'C' }
    ];

    const found = tree.find(nodes, (node) => node.key === 'b');
    expect(found.node.key).to.equal('b');

    tree.moveForward(nodes, 'b');
    expect(nodes[0].key).to.equal('b');

    tree.moveBack(nodes, 'b');
    expect(nodes[1].key).to.equal('b');
  });

  it('## move on missing id should not throw', function () {
    const tree = new StructureTree({ idKey: 'id' });
    const nodes = [{ id: 'a' }, { id: 'b' }];
    tree.moveForward(nodes, 'missing');
    tree.moveBack(nodes, 'missing');
    expect(nodes.length).to.equal(2);
  });

  it('## parse/add/forEach/filter/map/reduce/every/some', function () {
    const tree = new StructureTree();
    const nodes = [
      { id: 'a', label: 'A', children: [{ id: 'a1', label: 'A1' }] },
      { id: 'b', label: 'B' }
    ];

    const parsed = tree.parseNode(nodes);
    expect(parsed[0].label).to.equal('A');

    const added = tree.addNode({ label: 'X' });
    expect(added.label).to.equal('X');
    expect(added.children).to.be.an('array');
    expect(added.id).to.be.a('string');

    let visited = 0;
    tree.forEach(nodes, () => {
      visited += 1;
    });
    expect(visited).to.equal(3);

    const filtered = tree.filter(nodes, (node) => node.label !== 'A1');
    expect(filtered.length).to.equal(2);
    expect(filtered[0].children).to.equal(undefined);

    const mapped = tree.map(nodes, (node) => ({ ...node, label: `${node.label}!` }));
    expect(mapped[0].label).to.equal('A!');
    expect(mapped[0].children).to.be.an('array');

    const reduced = tree.reduce(nodes, (prev, cur) => prev + cur.label, '');
    expect(reduced).to.contain('A');
    expect(reduced).to.contain('B');

    let stopped = false;
    const everyRes = tree.every(nodes, (node) => {
      if (node.id === 'a1') {
        stopped = true;
        return false;
      }
      return true;
    });
    expect(everyRes).to.equal(false);
    expect(stopped).to.equal(true);

    let found = false;
    const someRes = tree.some(nodes, (node) => {
      if (node.id === 'b') {
        found = true;
        return true;
      }
      return false;
    });
    expect(someRes).to.equal(false);
    expect(found).to.equal(false);
  });

  it('## move within children', function () {
    const tree = new StructureTree();
    const nodes = [
      {
        id: 'a',
        label: 'A',
        children: [
          { id: 'a1', label: 'A1' },
          { id: 'a2', label: 'A2' }
        ]
      }
    ];

    tree.moveBack(nodes, 'a1');
    expect(nodes[0].children[1].id).to.equal('a1');

    tree.moveForward(nodes, 'a1');
    expect(nodes[0].children[0].id).to.equal('a1');
  });

  it('## move boundaries and some true', function () {
    const tree = new StructureTree();
    const nodes = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' }
    ];

    tree.moveForward(nodes, 'a');
    expect(nodes[0].id).to.equal('a');

    tree.moveBack(nodes, 'b');
    expect(nodes[1].id).to.equal('b');

    const someRes = tree.some(nodes, (node) => node.id === 'a');
    expect(someRes).to.equal(true);
  });
});
