import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
    productsList: []
}

const productsList = {
/*this function loads the last cart that the user filles and did not finish the purchase*/
    loadProductToList(state, action) {
        
       state.productsList=[action.payload]
 
    },


    addProductToList(state, action) {
        let x = state.productsList.findIndex(t => t.name == action.payload.name);
        
        if (x==-1) {
            let tempnum = Number(action.payload.quantity) + 1;
            action.payload.quantity = tempnum;
            state.productsList = [...state.productsList, action.payload];
        }
        else {
            state.productsList[x].quantity++
          
        }
        let updateData={
            email:localStorage.email,
            password:localStorage.password,
            myCart:state.productsList
        }

/*writes on every added product updates the current chopping cart*/
            fetch ('http://localhost:27017/users/updateCart',{
            method:'PUT',
            headers:{'content-type':'application/json',
            },
            body:JSON.stringify(updateData),
            
        });
            
      
    },
   
deleteProductFromList(state, action) {
    let x = state.productsList.find(t => t.name == action.payload.name);

    if (x.quantity == 1) {
        state.productsList = state.productsList.filter(t => t !== x);
    
    }
    else {
       
if( Number(x.quantity!=0)){
        x.quantity--
        let arr = state.productsList;
        state.productsList = arr;
        
    }
}


let updateData={
    email:localStorage.email,
    password:localStorage.password,
    myCart:state.productsList
}

/*writes on every deleted product updates the current chopping cart*/
    fetch ('http://localhost:27017/users/updateCart',{
    method:'PUT',
    headers:{'content-type':'application/json',
    },
    body:JSON.stringify(updateData),
    
});

}
};

export default produce((state, action) => createReducer(state, action, productsList), initialState);

