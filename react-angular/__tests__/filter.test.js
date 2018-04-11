import React from 'react';
import Enzyme from 'enzyme';
import Filter from '../scripts/ui/posts/Filter';
import Adapter from 'enzyme-adapter-react-16';
import expectFrom from 'expect';
import enzymify from 'expect-enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({
    adapter: new Adapter()
});

expectFrom.extend(enzymify());

describe('Filter Component', () => {
    let filter;

    beforeEach(() => {
        filter = Enzyme.shallow(<Filter changeFilterValue={() => {}} />);
    });

    it('component should be a div', () => {
        expectFrom(filter).toBeA('div');
    });

    it('filter should contain an input', () => {
        expectFrom(filter).toContain('input');
    });

    it('filter should not contain a section element', () => {
        expectFrom(filter).toNotContain('section');
    });

    it('should be a label inside', () => {
        expectFrom(filter.find('label')).toHaveRendered();
    });

    it('filter renders properly', () => {
        const filter = renderer
            .create(<Filter changeFilterValue={() => {}} />)
            .toJSON();
        expect(filter).toMatchSnapshot();
    });
});