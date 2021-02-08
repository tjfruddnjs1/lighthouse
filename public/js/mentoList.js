class Search{       
    constructor(className, array, value, fieldName){
      this.className  = className;
      this.array = array;
      this.value = value;
      this.fieldName = fieldName;        
    }
          
    insertValue(){        
      for(let i =0; i<this.className.length; i++){
        let value = this.className[i].id;               
        this.array[i] = value;          
      }          
    }

    inspection(url){
      if(url.indexOf('?') == -1){ // ?이 없으면          
        return url.replace('&','?');        
      }
      return url;
    }

    updateQueryStringParameter(key, value) {         
      let uri = location.href;
      let str = location.protocol +'//'+ location.host;                               
      let modifyUrl = uri.replace(str, '');                        
      let separator = uri.indexOf('?') !== -1 ? "&" : "?";        
      if (modifyUrl.indexOf(value) !== -1 && modifyUrl.indexOf(key) !== -1) {                                 
          console.log('오류 발생');
          console.log(key + value);
          let length = value.length;
          let keyLength = key.length;          
          let index = modifyUrl.indexOf(value);                     
          let startUrl = modifyUrl.substr(0,index-keyLength-2);          
          let endUrl = modifyUrl.substr(index+length, uri.length);            
          let newUrl = str + startUrl  + endUrl;             
          if(newUrl.indexOf('?') == -1){              
            newUrl = newUrl.replace('&', '?');              
          }                          
          return newUrl;            
              
      }         
      return uri + separator + key + "=" + value;
    }
    
    clickEvent(){        
      let currentUrl;        
      for(let i =0; i<this.className.length; i++){                               
        this.className[i].addEventListener('click', (e) => {                                          
          e.preventDefault();                               
          console.log(this.array[i]);            
          currentUrl = this.updateQueryStringParameter(this.fieldName , this.array[i]);  
          
          currentUrl = this.inspection(currentUrl);
          location.href = currentUrl;                             
        })                    
      }
    }     

    modifyUI(){
      for(let i =0; i<this.className.length; i++){          
        for(let j = 0; j<this.value.length; j++){
          if(this.array[i] == this.value[j]){
            this.className[i].style.backgroundColor = "rgb(0, 150, 136)";  
            this.className[i].style.color = "white";    
          }
        }                
      }
    }
    run(){
      this.insertValue();
      this.clickEvent();
      this.modifyUI();
    }
  }
  var job = document.getElementsByClassName('job'); //className
  var lang = document.getElementsByClassName('lang');//className
  var arr = new Array(job.length); // array
  var langArr = new Array(lang.length); // array    
  let urlSearch = new URLSearchParams(location.search);
  let jobValue = urlSearch.getAll('job'); //value        
  let langValue = urlSearch.getAll('lang'); // value
  
  console.log(langValue);
  let jobField = 'job'; // fieldName
  let langField = 'lang'; // fieldName
  
  
  const Lang = new Search(lang, langArr, langValue, langField);    
  const Job = new Search(job, arr, jobValue, jobField);
      
  Lang.run();
  Job.run();