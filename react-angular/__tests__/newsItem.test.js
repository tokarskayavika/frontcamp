import React from 'react';
import Enzyme from 'enzyme';
import NewsItem from '../scripts/ui/posts/NewsItem';
import Adapter from 'enzyme-adapter-react-16';
import expectFrom from 'expect';
import enzymify from 'expect-enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({
    adapter: new Adapter()
});

expectFrom.extend(enzymify());

describe('News Item Component', () => {
    let item;
    let props;

    beforeEach(() => {
        props = {
            author: '',
            description: '',
            title: ''
        };
        item = Enzyme.shallow(<NewsItem data={props} id={'0'} />);
    });

    it('component should contain title, description and author fields', () => {
        expectFrom(item).toContain('.title');
        expectFrom(item).toContain('.description');
        expectFrom(item).toContain('.author');
    });

    it('newsItem renders properly', () => {
        const item = renderer
            .create(<NewsItem data={props} id={'0'} />)
            .toJSON();
        expect(item).toMatchSnapshot();
    });
});