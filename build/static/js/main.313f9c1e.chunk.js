(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),c=t(13),r=t.n(c),l=(t(19),t(2)),u=function(e){console.log("Filter",e);var n=e.field,t=e.setField;return a.a.createElement("div",null,"search:",a.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}}))},i=t(3),s=t.n(i),m="/api/persons",f=function(){return s.a.get(m).then((function(e){return e.data}))},d=function(e){return s.a.post(m,e).then((function(e){return e.data}))},b=function(e,n){return s.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return console.log("will delete id ".concat(e)),s.a.delete("".concat(m,"/").concat(e)).then((function(e){return e}))},p=function(e){console.log("PersonForm",e);var n=e.newName,t=e.setNewName,o=e.newNumber,c=e.setNewNumber,r=e.persons,l=e.setPersons,u=void 0!==e.timedNotification?e.timedNotification:function(e,n){return alert(e)};return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={name:n,number:o};if(r.find((function(e){return e.name===n}))){var i=r.find((function(e){return e.name===n}));window.confirm("".concat(i.name," is already added, update the number?"))&&(i.number=o,b(i.id,i).then((function(e){l(r.map((function(n){return n.id===e.id?e:n}))),c(""),t(""),u("".concat(e.name," updated"),"success")})).catch((function(e){u("Information on ".concat(i.name," has already been removed from the server"),"error"),console.log(e)})))}else d(a).then((function(e){l(r.concat(e)),t(""),c(""),u("".concat(e.name," added"),"success")})).catch((function(e){u(e.response.data.error,"error"),console.log(e)}))}},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:o,onChange:function(e){c(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add"))))},v=function(e){console.log("Persons",e);var n=e.persons,t=void 0!==e.deleteCallback?e.deleteCallback:function(){return alert("no callback set")},o=void 0!==e.filter?e.filter:function(){return!0},c=n.filter(o);return a.a.createElement("div",null,a.a.createElement("ul",null,c.map((function(e){return a.a.createElement("li",{key:e.name},e.name,e.number,a.a.createElement("button",{onClick:function(){return t(e)}},"delete"))}))))},E=function(e){var n=e.message;return console.log("Notification",n),null===n.text?(console.log("returning null"),null):a.a.createElement("div",{className:n.type},n.text)},g=function(){var e=Object(o.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),i=Object(l.a)(r,2),s=i[0],m=i[1],d=Object(o.useState)(""),b=Object(l.a)(d,2),g=b[0],w=b[1],N=Object(o.useState)(""),k=Object(l.a)(N,2),j=k[0],O=k[1],C=Object(o.useState)({text:null,type:"success"}),y=Object(l.a)(C,2),S=y[0],x=y[1],P=function(e,n){x({text:e,type:n}),setTimeout((function(){x({text:null,type:"success"})}),5e3)};Object(o.useEffect)((function(){console.log("effect"),f().then((function(e){c(e),P("DB loaded","success")})).catch((function(e){P("Error while loading db, check console.","error"),console.log(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Search"),a.a.createElement(u,{field:j,setField:O}),a.a.createElement("h2",null,"Phonebook"),a.a.createElement(E,{message:S}),a.a.createElement(p,{persons:t,setPersons:c,newName:s,setNewName:m,newNumber:g,setNewNumber:w,timedNotification:P}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(v,{persons:t,filter:function(e){return e.name.toLowerCase().includes(j.toLowerCase())},deleteCallback:function(e){return function(e){console.log("personDeleteCallback",e),window.confirm("Delete ".concat(e.name,"?"))&&h(e.id).then((function(n){console.log(n),c(t.filter((function(n){return n.id!==e.id}))),P("".concat(e.name," deleted"),"success")})).catch((function(e){P("Erro while deleting. check console.","error"),console.log(e)}))}(e)}}))};r.a.render(a.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.313f9c1e.chunk.js.map