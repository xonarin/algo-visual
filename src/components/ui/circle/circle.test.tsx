import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

const text = 'Ю'; //буква Ю, по...
const number = 0;

describe('Тестирование компонента Circle', () => {
    it('Тест без буквы', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с буквами', () => {
        const tree = renderer.create(<Circle letter={text} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с head', () => {
        const tree = renderer.create(<Circle head={text} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с react-элементом в head', () => {
        const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с tail', () => {
        const tree = renderer.create(<Circle tail={text} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с react-элементом в tail', () => {
        const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с index', () => {
        const tree = renderer.create(<Circle index={number} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест с пропом isSmall ===  true', () => {
        const tree = renderer.create(<Circle isSmall={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест в состоянии default', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест в состоянии changing', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест в состоянии modified', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

})