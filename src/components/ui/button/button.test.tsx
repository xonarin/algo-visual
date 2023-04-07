import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

const textProps = 'Я текст';

describe('Тестим состояние кнопки', () => {
    it('Тест кнопки с текстом', () => {
        const tree = renderer.create(<Button text={textProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест кнопки без текста', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест кнопки в состояние disabled', () => {
        const tree = renderer.create(<Button disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест кнопки с индикацией загрузки true', () => {
        const tree = renderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест кнопки с индикацией загрузки false', () => {
        const tree = renderer.create(<Button isLoader={false} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Тест эмуляции клика по кнопке', () => {
        const testClick = jest.fn();
    
        // Рендерим компонент
        render(<Button text={textProps} onClick={testClick} />)
    
        // Находим элемент ссылки
        const button = screen.getByText(textProps);
    
        // Имитируем нажатие на ссылку
        fireEvent.click(button);
            
        // Проверяем, что alert сработал с правильным текстом предупреждения
        expect(testClick).toHaveBeenCalled();
    }); 
})