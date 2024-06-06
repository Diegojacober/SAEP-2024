import * as React from "react";
import { useState } from 'react';
import { useAuth } from "./AuthStatus";

const ModalCadastrar = ({ isOpen, onClose, onCadastrar, userId, setTurmas }: any) => {
    const [nome, setNome] = useState('');
    let auth = useAuth();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCadastrar(nome);
        setNome('');
        const post = {
            name: nome,
            professor_id: userId
        }
        await fetch('http://localhost:8000/turmas', {
            headers: {
                'Authorization': 'Bearer ' + auth.user.access_token
            },
            method: "POST",
            body: JSON.stringify(post)
        }).then(async (resp) => {
            console.log(resp);
            // Após o cadastro, atualiza a lista de turmas
            const urlTurmas = `http://localhost:8000/turmas/professor/${userId}`;
            const response = await fetch(urlTurmas, {
                headers: {
                    'Authorization': 'Bearer ' + auth.user.access_token
                }
            });
            const data = await response.json();
            setTurmas(data);
            onClose(); // Fecha o modal após o cadastro
        }).catch(e => console.log(e));
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto flex justify-center items-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white rounded-lg p-8">
                        <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900">
                            Fechar
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Novo Registro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                                <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 w-full" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200">
                                    Cancelar
                                </button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalCadastrar;
