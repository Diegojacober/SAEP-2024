import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthStatus';
import { useNavigate } from 'react-router-dom';
import TurmaTable from './TurmaTable';
import ModalCadastrar from './ModalCadastrar';

function Turmas() {
    let auth = useAuth();
    let navigate = useNavigate();
    const [userId, setUserId] = useState("")
    const [turmas, setTurmas] = useState([])

    useEffect(() => {
        async function getAll() {
            console.log(auth)
            const url = `http://localhost:8000/users/logged`;
            await fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + auth.user.access_token
                }
            }).then(async (resp) => {
                const data = await resp.json()
                setUserId(data?.id)
                const user_id = data?.id

                const urlTurmas = `http://localhost:8000/turmas/professor/${user_id}`;
                await fetch(urlTurmas, {
                    headers: {
                        'Authorization': 'Bearer ' + auth.user.access_token
                    }
                }).then(async (resp) => {
                    const data = await resp.json();
                    setTurmas(data)
                })
            }).catch(err => console.log(err))
        }

        getAll()
    }, [])

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleCadastrar = (nome: any) => {
      // Aqui você pode adicionar lógica para lidar com o cadastro do nome
      console.log('Nome cadastrado:', nome);
      handleCloseModal();
    };

    return (
        <div>
            <button  onClick={handleOpenModal} className='w-auto bg-blue-400 p-4 rounded mb-4 text-white'>Cadastrar Turma</button>
            <TurmaTable turmas={turmas}/>
            <ModalCadastrar setTurmas={setTurmas} userId={userId} isOpen={isModalOpen} onClose={handleCloseModal} onCadastrar={handleCadastrar} />
        </div>
    )
}

export default Turmas
