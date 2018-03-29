import React from 'react';
import Enzyme from 'enzyme';
import Filter from '../scripts/ui/posts/Filter';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import enzymify from 'expect-enzyme';

Enzyme.configure({
    adapter: new Adapter()
});

expect.extend(enzymify());

describe('Filter Component', () => {
    let filter;

    beforeEach(() => {
        filter = Enzyme
            .shallow(<Filter changeFilterValue={() => {}} />);
    });

    it('component should be a div', () => {
        expect(filter).toBeA('div');
    });

    it('filter should contain an input', () => {
        expect(filter).toContain('input');
    });

    it('filter should not contain a section element', () => {
        expect(filter).toNotContain('section');
    });

    it('should be a label inside', () => {
        expect(filter.find('label')).toHaveRendered();
    });
});