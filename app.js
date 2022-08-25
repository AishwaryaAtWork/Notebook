//Display the notes when open the browser
showNotes();

// If the user add a note, add it to the local storage and display it
var notesObj = [];
let addbtn=document.getElementById('addbtn');
addbtn.addEventListener('click',(e)=>{
    let addtxt=document.getElementById('addtxt');
    let addtitle=document.getElementById('addtitle');
    let notes=localStorage.getItem('notes');
    if(notes==null){
         notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title:addtitle.value,
        text:addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addtxt.value="";
    addtitle.value="";
    showNotes();
})

// Function to display the notes
function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
   }
   else{
       notesObj=JSON.parse(notes);
   }
   let html="";
   notesObj.forEach((element,index) => {
        html+=`<div class="card my-2 mx-3 notecard" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <hr>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-dark">Delete Note</button>
                    </div>
                </div>`;
   });
   let notesElm=document.getElementById('notes');
   if(notesObj.length!=0){
    notesElm.innerHTML=html;
   }
   else{
    notesElm.innerHTML=`Nothing to show! Use "Add Note" section above to add notes.`;
   }
}

// Function to delete notes
function deleteNotes(index){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
   }
   else{
       notesObj=JSON.parse(notes);
   }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//Function to search the notes
let search=document.getElementById('searchtxt');
search.addEventListener('input',()=>{
    let inputval=search.value.toLowerCase();
    let notecard=document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(element=>{
        let cardtxt=element.getElementsByTagName('p')[0].innerText;
        if(cardtxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})