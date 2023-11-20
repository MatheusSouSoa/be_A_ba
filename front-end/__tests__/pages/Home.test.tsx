import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Correção na importação
import Home from '@/pages/index';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Descrever página de login', () => {
  it('Deve efetuar o login corretamente', () => {
    mockRouter.push("/");
    const push = jest.fn();

    render(<Home />);

    const emailInput = screen.getByPlaceholderText('email');
    const senhaInput = screen.getByPlaceholderText('Sua senha');

    // Defina as variáveis de email e senha
    const email = 'matheus@email.com';
    const senha = 'senha123';

    // Preencha os campos com os valores das variáveis
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(senhaInput, { target: { value: senha } });

    // Localize o botão de login
    const loginButton = screen.getByText('Login');

    // Dispare um evento de clique no botão de login
    fireEvent.click(loginButton);

    // Faça as verificações apropriadas para determinar o sucesso do login
    // Por exemplo, verifique se um elemento específico é renderizado após o login
    expect(push).toHaveBeenCalledWith('/admin/dashboard');
    expect(push).toHaveBeenCalledWith('/templates');
  });
});
