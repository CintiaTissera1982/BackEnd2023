const contractProducts = {
    title:       'title',
    description: 'description',
    code:        0,
    price:       0,
    status:      true,
    stock:       0,
    category:    'categoria',
    thumbnail:   []   
    
}

const checkContractObject = (contract, contractToCheck) => {
    
    // Verificar si tienen la misma cantidad de claves
    const keys1 = Object.keys(contract);
    const keys2 = Object.keys(contractToCheck);
    
    if (keys1.length !== keys2.length) {
        console.log('sale por1')
        return false;
        
    }    
    // Verificar si todas las claves de un objeto existen en el otro objeto
    for (let key of keys1) {
        if (!keys2.includes(key)) {
            console.log('sale por2')
        return false;
        }
    }    
    // Verificar si los tipos de datos asociados a cada clave son iguales
    for (let key of keys1) {
        if (typeof contract[key] !== typeof contractToCheck[key]) {
            console.log('sale por3')
        return false;
        }
    }
    // Verificar Datos
    const valores = Object.values(contractToCheck);
    const todosTienenValor = valores.every(valor => valor !== null && valor !== undefined && valor !== '');    
    if (!todosTienenValor) {
        console.log('sale por4')
          return false;
    }
    
    return true;
      
}

export  {contractProducts,checkContractObject}