
function TodoTable(props) {

    return (
        <table>
            <tbody>
                <tr>
                    <th>Task</th>
                    <th>Date</th>
                </tr>
                {
                    props.todos.map((todo, index) =>  // todo eri muuttuja kuin aikaisemmin, enemmän kuin 1 muuttuja -> sulkuihin
                        <tr key={index}>
                            <td>{todo.description}</td>
                            <td>{todo.date}</td>
                            <td><button onClick={() => props.handleDelete(index)}>Delete</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default TodoTable;