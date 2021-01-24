const radio = document.getElementsByClassName('job');
const radiobox = document.getElementsByClassName('item-list');
for(let i =0; i < radiobox.length; i++){
  radiobox[i].addEventListener('click', function(){
    if(radio[i].checked){
      radio[i].checked = false;
    }else{
      radio[i].checked = true;
    }
  })
}