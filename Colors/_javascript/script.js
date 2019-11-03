// Variáveis criadas a partir de Tags HTML

var tagEscolheCor = document.querySelector("#tagEscolheCor"); // Recebe a Tag que contém a cor escolhida;
var tagTxtEscolheCor = document.querySelector("#tagTxtEscolheCor"); // Recebe a Tag que contém o texto que indica para o usuário selecionar a cor desejada; 
var tagsCoresGeradas = document.querySelectorAll(".tagCorGerada"); // Recebe as tags das cores que serão geradas;  
var tagsTestaCor = document.querySelectorAll(".tagsTestaCor"); // Recebe as Tags que serão utilizadas para testar as cores;
var tagMudaOpc = document.querySelectorAll(".tagMudaOpc"); //  Recebe as Tags que serão utilizadas para mudar a opacidade das cores; 
var tagsTxtCores = document.querySelectorAll(".tagsTxtCores"); // recebe as Tags que vão exibir o valor rgba das cores; 



// ===================================================

// Variáveis auxiliares 

var numsExaDecimais = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]; // Variável utilizada para preencher o vetor coresHexadecimais;  
var coresExadecimais = []; 
var coresGeradas = [];
var indiceEintervalos = [];
var maiorIndicePermitido; 


var rgb = [];



indiceEintervalos["r"] = [];
indiceEintervalos["g"] = [];
indiceEintervalos["b"] = [];


var indices = [];

indices["r"] = [];
indices["g"] = [];
indices["b"] = [];


var totIndices;


// ======================================================

// Função Padrão de início de código

inicio();

function inicio(){

preencheVetorCoresHexadecimais();    


tagEscolheCor.addEventListener("change",motorGeraCor);

for (var x = 0;x < tagsCoresGeradas.length; x++){

mudaBackgroundPai(tagsCoresGeradas[x]);    
tagsCoresGeradas[x].addEventListener("change",mudaBackgroundPai); 

}

for(var x = 0; x < tagsTestaCor.length; x++){

    mudaTxtSpan(tagsTestaCor[x]);

    tagsTestaCor[x].addEventListener("input",mudaTxtSpan); 
    tagMudaOpc[x].addEventListener("input",mudaTxtSpan); 
    
}




}

// ==================================

// Função que preenche o vetor cores hexadecimais   

function preencheVetorCoresHexadecimais(){

for(var x = 0; x < numsExaDecimais.length; x++){

    for(i = 0; i < numsExaDecimais.length; i++){

        coresExadecimais.push(numsExaDecimais[x] + numsExaDecimais[i]);    
    }    
}

}

// =======================================================


// Fução que gerencia as outras funções que vão gerar as cores;  

function motorGeraCor(){

    coresGeradas = [];
    
 
    rgb["r"] = coresExadecimais.indexOf(tagEscolheCor.value.substr(1,2));   
    rgb["g"] = coresExadecimais.indexOf(tagEscolheCor.value.substr(3,2));
    rgb["b"] = coresExadecimais.indexOf(tagEscolheCor.value.substr(5,2));
 


   maiorIndicePermitido = Math.max(rgb["r"],rgb["g"],rgb["b"]);
 
 
   indiceEintervalos["r"] = defineIntervaloNums(rgb["r"]);
   indiceEintervalos["g"] = defineIntervaloNums(rgb["g"]);
   indiceEintervalos["b"] = defineIntervaloNums(rgb["b"]);
   



   geraIndices(["r"]);
   geraIndices(["g"]);
   geraIndices(["b"]);
   geraIndices(["r","g"]);
   geraIndices(["r","b"]);
   geraIndices(["b","g"]);
   geraIndices(["r","g","b"]);


   
   coresGeradas.sort();
 
}

// =====================================================


// 

function  defineIntervaloNums(v){

var indice = v;             
var limiInferior;
var limiSuperior;


if(indice == maiorIndicePermitido){
    maiorIndicePermitido = 255;

}


        
if((maiorIndicePermitido - indice) >= indice){

  
   if(indice - 30 > 0){

    limiInferior = indice - 30;
    limiSuperior = indice + 30;
     
    }else{
    
        limiInferior = 0;
        limiSuperior = indice + 30;
    }

}else{

    if(indice + 30 < maiorIndicePermitido){

       

        limiSuperior = indice + 30;
        limiInferior = indice - 30;
           
    }else{

          limiSuperior = maiorIndicePermitido;
          limiInferior = indice - 30;
    }   

     
} 


var dados = [indice,limiInferior,limiSuperior];

return dados;

}

// Função que gera os indices das cores

function geraIndices(c){


if(c.length == 3) 
    totIndices = 30;
else
    totIndices = 20;    



var cToString = c.toString();
var cont;


cToString = retiraVirgulas(cToString);

var li;
var ls;


for(var i = 0; i < c.length; i++){

li =  indiceEintervalos[c[i]][1];
ls =  indiceEintervalos[c[i]][2];  




if(c.length == 2){

    li+= 2;
    ls-= 2;
   

}else if(c.length == 3){

    li+= 6;
    ls-= 6;

}




cont = 0;
while(cont < totIndices){

var indiceCor = li + Math.round(Math.random() * (ls - li));     


if(
  
        ((indiceCor != indiceEintervalos[c[i]][0]) || (c.length > 1))
    && 
        ((indices[c[i]].indexOf(indiceCor) == -1) || (c.length > 1))
    
  ){

indices[c[i]].push(indiceCor);

cont++;    

}

}

}


cont = 0;
while(cont < totIndices){


switch(cToString){

    case "r":
        indices["g"].push(rgb["g"]); 
        indices["b"].push(rgb["b"]);
    break;

    case "g":
        indices["b"].push(rgb["b"]); 
        indices["r"].push(rgb["r"]);
    break;

    case "b":
        indices["g"].push(rgb["g"]); 
        indices["r"].push(rgb["r"]);
    break;

    case "rg":
        indices["b"].push(rgb["b"]);
    break;

    case "rb":
        indices["g"].push(rgb["g"]);
    break;

    case "bg":
        indices["r"].push(rgb["r"]);
    break;
}




cont++;

}






geraCores();



}

// =================================================



// Função que gera as cores 

function geraCores(){

var cor;



for(var x = 0; x < totIndices; x++){

    cor = "#" + coresExadecimais[indices["r"][x]] + coresExadecimais[indices["g"][x]] + coresExadecimais[indices["b"][x]];
       

    coresGeradas.push(cor);

    addCoresTag(coresGeradas.length - 1);
}

indices["r"] = [];
indices["g"] = [];
indices["b"] = [];

}

// ==================================================

// Função que preenche as TAGS com as cores geradas

function addCoresTag(i){

  tagsCoresGeradas[i].value = coresGeradas[i];
  tagsCoresGeradas[i].parentElement.style.background = tagsCoresGeradas[i].value;

}


// ==================================================


// Função que retiras as vígulas da string passada como parâmetro

function retiraVirgulas(str){

  
while(str.indexOf(",") != -1){

str = str.replace(",","");

}    

return str;

}

// ===============================================================

// Função que muda o texto das TAGS que exibem o valor rgba das Tags que testam as cores 

function mudaTxtSpan(tag = undefined){



if(tag.classList == undefined)
   tag = this;
 



var tagCor = tag.parentElement.children[0];
var tagOpacidade = tag.parentElement.children[1];
var tagSpan = tag.parentElement.children[2];
var elementoAlterado = tag.parentElement.dataset.idele;



var valoresRgb = pegaRgb(tagCor.value);
var valorOpacidade =  tagOpacidade.value;




tagSpan.innerHTML = "rgba(" + valoresRgb["r"] + "," +
                              valoresRgb["g"] + "," +                                
                              valoresRgb["b"] + "," +
                              valorOpacidade +
                    ")";           


mudaElemento(elementoAlterado,tagSpan.innerHTML);



}

// =====================================================================================


// Função que converte valores hexadecimais pega RGB

function pegaRgb(hx){


var rgb = [];

rgb["r"] = coresExadecimais.indexOf(hx.substr(1,2)); 
rgb["g"] = coresExadecimais.indexOf(hx.substr(3,2));
rgb["b"] = coresExadecimais.indexOf(hx.substr(5,2));


return rgb;

}

// ============================================================


// funcão que muda a cor e a opacidade do elemento passado como parâmetro  

function mudaElemento(ele,val){


var teste = val;     



document.querySelector("#" + ele).style.backgroundColor = val;    

}

// =======================================================================

// Função que muda o background do elemento pai das Tags input do tipo cor; 

function mudaBackgroundPai(tag = undefined){

if(tag.classList == undefined)
    tag = this;




tag.parentElement.style.background = tag.value;



}

// =============================================================================