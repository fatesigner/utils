/**
 * StructureTree
 * 树形结构数据处理
 */

import { getGUID } from './random';

export interface IStructureTreeConfig {
  idKey?: string;
  labelKey?: string;
  childrenKey?: string;
}

export class StructureTree<
  T extends {
    [key in string]?: any;
  }
> {
  config: IStructureTreeConfig;

  constructor(config?: IStructureTreeConfig) {
    this.config = Object.assign(
      {
        idKey: 'id',
        labelKey: 'label',
        childrenKey: 'children'
      },
      config
    );
  }

  // 解析数据
  parseNode(nodes: T[] = []): T[] {
    return this.map(nodes, (node: T) => {
      return {
        ...node
      };
    });
  }

  addNode(node: T): T {
    return {
      [this.config.idKey]: getGUID(12).toLowerCase(),
      [this.config.labelKey]: '',
      [this.config.childrenKey]: [],
      ...node
    };
  }

  /**
   * 遍历节点
   * @param nodes
   * @param callback
   */
  forEach(nodes: T[] = [], callback: (node: T, index: number, parentNodes: T[]) => void): void {
    // 采用递归深度遍历
    const forEach = (nodes: T[], parentNodes: T[]) => {
      for (const [index, childNode] of nodes.entries()) {
        // console.log('_______'.repeat(parentNodes.length) + childNode[this.config.labelKey]);
        callback(childNode, index, parentNodes);
        const childrenNodes = childNode[this.config.childrenKey] as T[];
        if (childrenNodes && childrenNodes.length) {
          forEach(childrenNodes, [...parentNodes, childNode]);
        }
      }
    };

    forEach(nodes, []);
  }

  filter(nodes: T[] = [], callback: (node: T, index: number, parentNodes: T[]) => boolean): T[] {
    const newNodes: T[] = [];

    // 采用递归深度遍历
    const forEach = (nodes: T[], newNodes: T[], parentNodes: T[]) => {
      for (const [index, childNode] of nodes.entries()) {
        const matched = callback(childNode, index, parentNodes);
        if (matched) {
          // console.log('_______'.repeat(parentNodes.length) + childNode[this.config.labelKey]);
          const childNodeNew: T = { ...childNode, [this.config.childrenKey]: [] };
          newNodes.push(childNodeNew);
          const childrenNodes = childNode[this.config.childrenKey] as T[];
          if (childrenNodes && childrenNodes.length) {
            forEach(childrenNodes, childNodeNew[this.config.childrenKey], [...parentNodes, childNode]);
          }
          if (!childNodeNew[this.config.childrenKey].length) {
            delete childNodeNew[this.config.childrenKey];
          }
        }
      }
    };

    forEach(nodes, newNodes, []);

    return newNodes;
  }

  /**
   * 遍历节点，与原生数组的 every 函数一致
   * @param nodes
   * @param callback return false，中止遍历
   */
  every(nodes: T[] = [], callback: (node: T, index: number, parentNodes: T[]) => boolean): boolean {
    // 采用递归深度遍历
    const every = (nodes: T[], parentNodes: T[]): boolean => {
      let continued = true;
      for (const [index, childNode] of nodes.entries()) {
        // console.log('_______'.repeat(parentNodes.length) + childNode[this.config.labelKey]);
        continued = callback(childNode, index, parentNodes);
        if (continued) {
          const childrenNodes = childNode[this.config.childrenKey] as T[];
          if (childrenNodes) {
            continued = every(childrenNodes, [...parentNodes, childNode]);
            if (!continued) {
              break;
            }
          }
        } else {
          break;
        }
      }
      return continued;
    };

    return every(nodes, []);
  }

  /**
   * 遍历节点，与原生数组的 some 函数一致
   * @param nodes
   * @param callback return true，中止遍历
   */
  some(nodes: T[] = [], callback: (node: T, index: number, parentNodes: T[]) => boolean): boolean {
    // 采用递归深度遍历
    const some = (nodes: T[], parentNodes: T[]): boolean => {
      let aborted = true;
      for (const [index, childNode] of nodes.entries()) {
        // console.log('_______'.repeat(parentNodes.length) + childNode[this.config.labelKey]);
        aborted = callback(childNode, index, parentNodes);
        if (!aborted) {
          const childrenNodes = childNode[this.config.childrenKey] as T[];
          if (childrenNodes) {
            aborted = some(childrenNodes, [...parentNodes, childNode]);
            if (!aborted) {
              break;
            }
          }
        } else {
          break;
        }
      }
      return aborted;
    };

    return some(nodes, []);
  }

  reduce<TPrev = any>(nodes: T[], callback: (prev: TPrev, cur: T, index: number, parentNodes: T[]) => TPrev, prev: TPrev): TPrev {
    this.forEach(nodes, (node, index, parentNodes) => {
      prev = callback(prev, node, index, parentNodes);
    });
    return prev;
  }

  map(nodes: T[] = [], callback: (node: T, index: number, parentNodes: T[]) => T): T[] {
    const newNodes: T[] = [];

    // 采用递归深度遍历
    const forEach = (nodes: T[], newNodes: T[], parentNodes: T[]) => {
      for (const [index, childNode] of nodes.entries()) {
        const newNode = callback(childNode, index, parentNodes);
        // console.log('_______'.repeat(parentNodes.length) + childNode[this.config.labelKey]);
        const childNodeNew: T = { ...newNode, [this.config.childrenKey]: [] };
        newNodes.push(childNodeNew);
        const childrenNodes = childNode[this.config.childrenKey] as T[];
        if (childrenNodes && childrenNodes.length) {
          forEach(childrenNodes, childNodeNew[this.config.childrenKey], [...parentNodes, childNode]);
        }
        if (!childNodeNew[this.config.childrenKey].length) {
          delete childNodeNew[this.config.childrenKey];
        }
      }
    };

    forEach(nodes, newNodes, []);

    return newNodes;
  }

  // 查找指定节点
  find(
    nodes: T[] = [],
    callback: (node: T, index: number, parentNodes: T[]) => boolean
  ): {
    node: T;
    index: number;
    parentNodes: T[];
  } {
    let res: {
      node: T;
      index: number;
      parentNodes: T[];
    } = null;

    this.forEach(nodes, (node, index, parentNodes) => {
      const idx = callback(node, index, parentNodes);
      if (idx) {
        res = {
          node,
          index,
          parentNodes
        };
      }
      return !idx;
    });

    return res;
  }

  // 指定节点向前移动
  moveForward(nodes: T[], id: string): void {
    const cur = this.find(nodes, (x) => x[this.config.idKey] === id);
    if (!cur) {
      return;
    }
    let arr;
    if (cur.parentNodes.length) {
      arr = cur.parentNodes[cur.parentNodes.length - 1].children;
    } else {
      arr = nodes;
    }
    if (cur.index > 0) {
      arr.splice(cur.index - 1, 0, cur.node);
      arr.splice(cur.index + 1, 1);
    }
  }

  // 向后移动
  moveBack(nodes: T[], id: string): void {
    const cur = this.find(nodes, (x) => x[this.config.idKey] === id);
    if (!cur) {
      return;
    }
    let arr;
    if (cur.parentNodes.length) {
      arr = cur.parentNodes[cur.parentNodes.length - 1].children;
    } else {
      arr = nodes;
    }
    if (cur.index < arr.length - 1) {
      arr.splice(cur.index + 2, 0, cur.node);
      arr.splice(cur.index, 1);
    }
  }
}
