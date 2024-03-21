import { addNewContact, getContacts, getContactWithID, updateContact, deleteContact } from "../controllers/crmController.js";
import { login,register,loginRequired } from "../controllers/crmController.js";
const routes = (app) => {

    app.route('/contact')
    .get((req,res, next) =>{
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request from: ${req.method}`)
        next(); 
    },loginRequired,getContacts)

    .post(loginRequired,addNewContact);

    app.route('/contact/:contactId')
    .get(loginRequired,getContactWithID)
    .put(loginRequired,updateContact)

    .delete(loginRequired,deleteContact);

    app.route('/auth/register')
    .post(register);

    app.route('/login')
    .post(login);
}
export default routes