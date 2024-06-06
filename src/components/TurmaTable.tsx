const TurmaTable = ({ turmas }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Número
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {turmas.map(turma => (
            <tr key={turma.id}>
              <td className="px-6 py-4 whitespace-nowrap">{turma.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{turma.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => console.log(turma)} className="text-indigo-600 hover:text-indigo-900 mr-2">Visualizar</button>
                <button onClick={() => console.log(turma)} className="text-red-600 hover:text-red-900">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TurmaTable;