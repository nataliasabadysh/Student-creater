// Selectors

// Selectors has acces to ALL state
// and  when we call fun return port of state which we needed
// and give it back to fun getNewStudent just peace of state

const getNewStudent = (state) => state.students.students;

export default { getNewStudent };

// xport const isAbleToEdit  = () => isFetching || modalMode !== 'create' && role === 'admin';