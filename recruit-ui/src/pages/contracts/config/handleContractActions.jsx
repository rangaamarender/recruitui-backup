// const handleContractActions = (action, rowData) => {
//     switch (action) {
//         case 'view':
//             // Implement view action logic
//             console.log('Viewing:', );
//             break;
//         case 'edit':
//             // Implement edit action logic
//             console.log('Editing:');
//             break;
//         case 'delete':
//             // Implement delete action logic
//             // console.log('Deleting:', rowData.companyName);
//             break;
//         default:
//             break;
//     }
// };

// export default handleContractActions;



const handleContractActions = (event, item, action, activeRowMenu) => {
    const { id } = item;

    if (id === 'view') {
        action.onViewClick(activeRowMenu);
    } else if (id === 'edit') {
        action.onEditClick(activeRowMenu);
    } else if (id === 'delete') {
        action.onDeleteClick(activeRowMenu);
    }

};

export default handleContractActions;