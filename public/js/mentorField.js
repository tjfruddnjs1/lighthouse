
          checkbox('job', 'item-list');
          checkbox('lang', 'lang-list');
                
          function checkbox(name, className){
            const radio = document.getElementsByClassName(`${name}`);
          const radiobox = document.getElementsByClassName(`${className}`);
          for (let i = 0; i < radiobox.length; i++) {
            radiobox[i].addEventListener('click', function () {
              if (radio[i].checked) {
                radio[i].checked = false;
              } else {
                radio[i].checked = true;
              }
            })
          }
          }      
   const field = document.getElementsByName('job'); // 배열   
   const lang = document.getElementsByName('lang');   
   const mentorForm = document.getElementById('mentorForm');


function submit(){
  document.getElementById('mentor_submit').addEventListener('click',  function(e){        
        let flag = false;       
        for(var i =0; i<field.length; i++){
          if(field[i].checked){
            flag = true;
          }
        }
        if(!flag){
          alert('멘토링 분야 선택 요망');
          field[0].focus();
          e.preventDefault();          
          return false;
        }
        
        flag = false;
        
        for(var i =0; i<lang.length; i++){
          if(lang[i].checked){
            flag = true;
          }
        }
        if(!flag){
          alert('언어 분야 선택 요망');
          e.preventDefault();
          lang[0].focus();          
          return false;
        }
        mentorForm.submit();
   });
}

submit();