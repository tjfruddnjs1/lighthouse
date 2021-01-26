
          const radio = document.getElementsByClassName('job');
          const radiobox = document.getElementsByClassName('item-list');
          for (let i = 0; i < radiobox.length; i++) {
            radiobox[i].addEventListener('click', function () {
              if (radio[i].checked) {
                radio[i].checked = false;
              } else {
                radio[i].checked = true;
              }
            })
          }          
          const username = document.getElementById('username');
   const gender = document.getElementsByName('gender'); // 배열
   const firm = document.getElementById('firm');
   const department = document.getElementById('department');
   const career = document.getElementById('career');
   const field = document.getElementsByName('field'); // 배열
   const phone = document.getElementById('phone');
   const email = document.getElementById('email');
   const intro = document.getElementById('intro');
   const image = document.getElementById('image');


function submit(){
  document.getElementById('submit').addEventListener('click',  function(e){
        e.preventDefault();
        var flag = false;
        if(!username.value){
          alert('이름 입력하세요');
          username.focus();
          username.style.borderColor = "red";
          return false;
        }
        if(!firm.value){
          alert('회사를 입력하세요');          
          firm.focus();
          firm.style.borderColor = "red";
          return false;
        }
        if(!department.value){
          alert('부서 입력하세요');
          department.focus();
          department.style.borderColor = "red";
          return false;
        }
        if(!career.value){
          alert('경력 입력하세요');
          career.focus();
          career.style.borderColor = "red";
          return false;
        }
        if(!phone.value){
          alert('핸드폰 번호를 입력하세요');
          phone.focus();
          phone.style.borderColor = "red";
          return false;
        }
        if(!email.value){
          alert('이메일 입력하세요');
          email.focus();
          email.style.borderColor = "red";
          return false;
        }        
        for(var i =0; i<field.length; i++){
          if(field[i].checked){
            flag = true;
          }
        }
        if(!flag)
        alert('멘토링 분야 선택 요망');
        field[0].focus();
        return false;
   });
}

submit();