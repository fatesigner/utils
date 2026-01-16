import { expect } from 'chai';

import { ODataHelper } from '../dist/odata';

describe('# test odata.', function () {
  it('## filter format', function () {
    expect(ODataHelper.filter('age', 'gt', 3)).to.equal('age gt 3');
    expect(ODataHelper.filter('name', 'eq', 'tom')).to.equal("name eq 'tom'");
    expect(ODataHelper.filter('name', 'eq', null as any)).to.equal('name eq null');
    expect(ODataHelper.filter('name', 'contains', 'Tom')).to.equal("contains(tolower(name), tolower('Tom'))");
    expect(ODataHelper.filter('name', 'contains', 3 as any)).to.equal('contains(name, 3)');
    expect(ODataHelper.filter('name', 'not contains', 'Tom')).to.equal("not contains(name, 'Tom')");
    expect(ODataHelper.filter('name', 'startswith', 'Tom')).to.equal("startswith(name, 'Tom')");
    expect(ODataHelper.filter('name', 'endswith', 'Tom')).to.equal("endswith(name, 'Tom')");
    expect(ODataHelper.filter('date', 'eq', '2020-01-01', true)).to.equal('date eq 2020-01-01');
    expect(ODataHelper.filter(undefined as any, 'eq', 'x')).to.equal('');
    expect(ODataHelper.filter('name', 'eq', undefined as any)).to.equal('');
  });

  it('## func/length_/indexof_', function () {
    expect(ODataHelper.func('name', 'length', 2)).to.equal('length(name) eq 2');
    expect(ODataHelper.func('name', 'tolower', 'Mu')).to.equal("tolower(name, 'Mu')");
    expect(ODataHelper.func(undefined as any, 'length', 2)).to.equal('');
    expect(ODataHelper.length_('name', 4)).to.equal('length(name) eq 4');
    expect(ODataHelper.length_(undefined as any, 4)).to.equal('');
    expect(ODataHelper.indexof_('name', 'mu', 7)).to.equal("indexof(name, 'mu') eq 7");
    expect(ODataHelper.indexof_(undefined as any, 'mu', 7)).to.equal('');
  });

  it('## replace/orderby/and/or/params', function () {
    expect(ODataHelper.replace('name', 'a', 'b', 'c')).to.equal("replace(name, 'a', 'b') eq 'c'");
    expect(ODataHelper.replace(undefined as any, 'a', 'b', 'c')).to.equal('');

    expect(
      ODataHelper.orderby([
        { name: 'age', operator: 'ascend' as any },
        { name: 'name', operator: 'descend' as any },
        { name: 'score', operator: 'asc' as any }
      ])
    ).to.equal('age asc, name desc, score asc');

    expect(ODataHelper.and('a eq 1', '', 'b eq 2')).to.equal('(a eq 1 and b eq 2)');
    expect(ODataHelper.and('', '')).to.equal(undefined);
    expect(ODataHelper.or('a eq 1', '', 'b eq 2')).to.equal('(a eq 1 or b eq 2)');
    expect(ODataHelper.or('', '')).to.equal(undefined);

    const params = ODataHelper.getParams({ filter: '', orderby: 'age asc', pageNo: 2, pageSize: 10 });
    expect(params.filter).to.equal(undefined);
    expect(params.orderby).to.equal('age asc');
    expect(params.skip).to.equal('10');
    expect(params.top).to.equal('10');
  });
});
