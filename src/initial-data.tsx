const initialData = {
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
    
    columns: {
      'column-1': {
        id: 'column-1',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        title: 'To do'
      },
      'column-2': {
        id: 'column-2',
        taskIds: [],
        title: 'In progress'
      },
      'column-3': {
        id: 'column-3',
        taskIds: [],
        title: 'Done'
      }
    },

    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' }
      },
  }
  
  export default initialData
  