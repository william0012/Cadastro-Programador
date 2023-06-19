var xmlHttp = new XMLHttpRequest;
function enviar(){
    const name= document.getElementById('name').value
    const javascript = document.getElementById('javascript').checked
    const java = document.getElementById('java').checked
    const python = document.getElementById('python').checked
    var dados = {
        name: name,
        python: python,
        java: java,
        javascript: javascript 
    }
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.status >= 400 & xmlHttp.status <-500){
            console.log(`Houve um erro com a sua requisição.(${xmlHttp.status}) ${xmlHttp.statusText} `)
        }
        if(xmlHttp.status >= 500){
            console.log(`Não foi possível estabelecer uma conexão com a base de dados.(${xmlHttp.status}) ${xmlHttp.statusText} `)
        }
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            console.log(xmlHttp.responseText)
        }
    }
    xmlHttp.open('POST', 'http://localhost:5000/createProgrammer',true)
    dados = JSON.stringify(dados)
    console.log(dados + ' TIPO = '+typeof(dados))
    

    console.log(dados + ' TIPO = '+typeof(dados))
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(dados)
    console.log(`${name} , Javascript:${javascript}, Java:${java}, Python:${python}`)
}