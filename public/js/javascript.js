var xmlHttp = new XMLHttpRequest;
const lista = document.getElementById('results')
window.onload=requestData();
function requestData(){
    lista.innerHTML=""
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 & xmlHttp.status==200){
            dados = xmlHttp.responseText
            dados = JSON.parse(dados)
            dados.forEach(element=>{
                let div = document.createElement('div')
                div.classList.add('result-item')
                let nome = document.createElement('span')
                nome.classList.add('result-name')
                nome.innerText=element.name
                let javascript = document.createElement('span')
                javascript.classList.add('result-javascript')
                javascript.innerText=element.javascript
                let java = document.createElement('span')
                java.classList.add('result-java')
                java.innerText=element.java
                let python = document.createElement('span')
                python.classList.add('result-python')
                python.innerText=element.python

                div.appendChild(nome)
                div.appendChild(javascript)
                div.appendChild(java)
                div.appendChild(python)
                
                lista.appendChild(div)
                return div
            
            })
           
            
            console.log(xmlHttp.responseText)
        }
    }
    xmlHttp.open('GET','http://localhost:5000/retrieveProgrammer')
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send()
}
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
        if(xmlHttp.status >= 400 & xmlHttp.status <500){
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
    requestData()
}