import { extendObservable} from 'mobx';

 
 class Users {
 constructor(){
  extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      username: ''
        }) 
    } 
}

export default new Users();
