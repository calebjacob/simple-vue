// subject:

import filterObjects from '@/helpers/filter-objects';


// tests:

describe('helpers - filterObjects', function() {
  let objectOne = {
    name: 'Von Miller',
    state: 'Colorado',
    appearance: {
      hairColor: 'Brown'
    }
  };

  let objectTwo = {
    name: 'Donald Trump',
    state: 'Colorado',
    appearance: {
      hairColor: 'Yellow'
    }
  };

  let objectThree = {
    name: 'B.o-b\'s Mike',
    state: 'Virginia',
    appearance: {
      hairColor: 'Brown'
    }
  };

  let objects = [objectOne, objectTwo, objectThree];
  let searchKeys = ['name', 'state', 'appearance.hairColor'];

  describe('when searchTerm is null', function() {
    it('no objects are filtered out', function() {
      let results = filterObjects(null, searchKeys, objects);
      expect(results).toEqual(objects);
    });
  });

  describe('when searchTerm is defined', function() {
    it('filters based on exact match', function() {
      let results = filterObjects('Colorado', searchKeys, objects);
      expect(results).toEqual([objectOne, objectTwo]);
    });

    it('filters based on partial match', function() {
      let results = filterObjects('Colo', searchKeys, objects);
      expect(results).toEqual([objectOne, objectTwo]);
    });

    it('filters based on exact match of multiple words', function() {
      let results = filterObjects('Von Colorado', searchKeys, objects);
      expect(results).toEqual([objectOne]);
    });

    it('filters based on partial match of multiple words', function() {
      let results = filterObjects('Do Tru Co', searchKeys, objects);
      expect(results).toEqual([objectTwo]);
    });

    it('filters based on nested params', function() {
      let results = filterObjects('Brown', searchKeys, objects);
      expect(results).toEqual([objectOne, objectThree]);
    });

    it('matches even when words are in reverse order', function() {
      let results = filterObjects('Trump Donald', searchKeys, objects);
      expect(results).toEqual([objectTwo]);
    });

    it('ignores character case', function() {
      let results = filterObjects('vOn MiLlEr', searchKeys, objects);
      expect(results).toEqual([objectOne]);
    });

    it('ignores basic grammar in content being searched', function() {
      let results = filterObjects('bobs', searchKeys, objects);
      expect(results).toEqual([objectThree]);
    });

    it('ignores basic grammar in searchTerm', function() {
      let results = filterObjects('V-o.\'n', searchKeys, objects);
      expect(results).toEqual([objectOne]);
    });
  });
});
