Ranger.define("ajaxtest", ["ajax", "console"], function(ajax, console){
    ajax.getJSON("http://localhost:3000/form-defaults.json?current_age=22&current_annual_salary=300&plan_type_id=1").then(function(data){
        console.log(data);
    });
});