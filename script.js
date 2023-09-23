const form=document.getElementById("form");
const empArr=[];
const rootTD= document.getElementById("curTab").children[1];

form.addEventListener("submit",(event) => {

    event.preventDefault();

    let emp={
        name: event.target.name.value,
        email: event.target.email.value,
        compId: event.target.compId.value,
        compName: event.target.compName.value,
        role: event.target.role.value,
        exp: event.target.exp.value
    }

    let isExisting=false;
    for(let i=0;i<empArr.length;i++){
        if(empArr[i].email==emp.email||(empArr[i].compId===emp.compId&&empArr[i].compName===emp.compName)){
          alert("Email Already Exist");  
          return;
        }
    }
    addEmployee(emp);
    empArr.push(emp);
    form.reset();
})

function addEmployee(emp){
   let newEmp=document.createElement("tr");
   newEmp.innerHTML=   `<td>${emp.name}</td>
                        <td>${emp.email}</td>
                        <td>${emp.compId}</td>
                        <td>${emp.compName}</td>
                        <td>${emp.role}</td>
                        <td>${emp.exp}</td>
                        <td>
                        <button onclick="deleteEmp(this)" data-empId="${emp.compId}">Delete</button>
                        </td>
                        <td>
                        <button onclick="editEmp(this)" data-empId="${emp.compId}">Edit</button>
                        </td>`

   
   rootTD.appendChild(newEmp);                    
}

function deleteEmp(element){
    let empid=element.getAttribute("data-empId");
    for(let i=0;i<empArr.length;i++){
        if(empArr[i].compId===empid){
            empArr.splice(i,1);
            break;
        }
    }
    let parent=element.parentNode;
    let grandParent=parent.parentNode;

    grandParent.remove();

}

function editEmp(element){
    let empid=element.getAttribute("data-empId");
    let editEmp={};
    for(let i=0;i<empArr.length;i++){
        if(empArr[i].compId===empid){
            editEmp=empArr.splice(i,1)[0];
            break;
        }
    }
    form.name.value=editEmp.name;
    form.email.value=editEmp.email;
    form.compId.value=editEmp.compId;
    form.compName.value=editEmp.compName;
    form.role.value=editEmp.role;
    form.exp.value=editEmp.exp;

    const button=document.getElementById("submit");
    button.textContent="Edit Employee"

    deleteEmp(element);
    button.addEventListener("click",() =>{
        button.textContent="Add Employee";
    })
}