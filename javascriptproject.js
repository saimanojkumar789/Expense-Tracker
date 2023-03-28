var form = document.getElementById('form');
var expense = document.getElementById('expenseamount');
var description = document.getElementById('description');
var category = document.getElementById('category');
var itemList = document.getElementById('items');
var totalExpense = document.getElementById('total');
var count = 0;

itemList.addEventListener('click',clicked);

form.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();
    if(category.value ==="" || expense.value ==="" || description.value === "")
        alert('fill all fields');
    else{
        const myobj = {
            category : category.value,
            expense : expense.value,
            description : description.value
        }
        
        localStorage.setItem(description.value,JSON.stringify(myobj));

        var li = document.createElement('li');
        li.className = "list-group-item mb-2"
        li.textContent = myobj.description+" "+myobj.category+" "+myobj.expense;

        var del = document.createElement('button');
        del.className = " btn btn-danger btn-sm float-right delete";
        del.textContent = ' Delete ';
        li.appendChild(del);

        var edit = document.createElement('button');
        edit.className = "float-right edit mr-2";
        edit.textContent = ' Edit ';
        li.appendChild(edit);

        itemList.appendChild(li);
        count += parseInt(myobj.expense);
        totalExpense.innerHTML = `<h4> Total Expenses : ${count}</h4>`;
        totalExpense.style.display = "block";

        description.value = "";
        category.value = "";
        expense.value = "";
    }
}

function clicked(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement; 
            var arr = li.textContent.split(/[ ]+/);
            count -= parseInt(arr[2]);
            totalExpense.innerHTML = `<h4> Total Expenses : ${count}</h4>`;
            if(count === 0)
            totalExpense.style.display = "none";
            localStorage.removeItem(arr[0]);
            itemList.removeChild(li);
        }
    }

    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        var arr = li.textContent.split(/[ ]+/);
        description.value = arr[0];
        category.value = arr[1];
        expense.value = arr[2];
        count -= parseInt(arr[2]);
        totalExpense.innerHTML = `<h4> Total Expenses : ${count}</h4>`;
        if(count === 0)
        totalExpense.style.display = "none";
        localStorage.removeItem(arr[0]);
        itemList.removeChild(li);
    }
}
