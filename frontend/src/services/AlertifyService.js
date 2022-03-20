import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
 
class AlertifyService {


    alert(message) {
        alertify.alert("Uyarı",message, function () { }); 
    }
    closableAlert(message){
        alertify.alert("Uyarı",message, function () { }).set('closable', true); 
    }
    successMessage(message){
        alertify.success(message);
        return true;
    }
    delaySuccessMessage(second,message){
        if(parseInt(second) >= 2)   alertify.set('notifier','delay', second);
        else                        alertify.set('notifier','delay', 10);
        alertify.success(message);
        //alertify.success('Current delay : ' + alertify.get('notifier','delay') + ' seconds');
    }
    errorMessage(message){
        alertify.error(message); 
        return true;
    }
    delayErrorMessage(second,message){
        if(parseInt(second) >= 2)   alertify.set('notifier','delay', second);
        else                        alertify.set('notifier','delay', 10);
        alertify.error(message);
        //alertify.success('Current delay : ' + alertify.get('notifier','delay') + ' seconds');
    }
    warningMessage(message){
        alertify.warning(message); 
        return true;
    }
    delayWarningMessage(second,message){
        if(parseInt(second) >= 2)   alertify.set('notifier','delay', second);
        else                        alertify.set('notifier','delay', 10);
        alertify.warning(message);
        //alertify.success('Current delay : ' + alertify.get('notifier','delay') + ' seconds');
    }
}

export default new AlertifyService();