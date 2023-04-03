import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { StringComponent } from './string';

describe('Тест разворота строки', () => {
    //Функция, которая получает строку и строку на разворот для сравнения.
    const reversTest = (str: string, reversedStr: string) => {
        return async () => {
            render(<StringComponent />); //Рендерим компонент

            const input = screen.getByTestId('input'); //находим инпут в отрендеринном компоненте
            const button = screen.getByText('Развернуть'); //находим кнопку по тексту в отрендеринном компоненте
            const result = screen.getAllByTestId('circle').forEach(el => result + (el.textContent || '')); // в результат запишем данные из circle
            fireEvent.change(input, { target: { str } });
            fireEvent.click(button);

            await waitFor(() => {
                expect(result).toBe(reversedStr);
            }, { timeout: SHORT_DELAY_IN_MS })
        }
    }

    it('Тест с чётным количеством символов', () => {
        reversTest("12345678", "87654321");
    })

    it('Тест с нечетным количеством символов', () => {
        reversTest("1234567", "6754321");
    })

    it('Тест с одним символом', () => {
        reversTest('1', '1');
    })

    it('Тест на пустую строку', () => {
        reversTest('', '');
    })
})