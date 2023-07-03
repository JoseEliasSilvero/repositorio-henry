let traverseDomAndCollectElements = function (matchFunc, startEl) { // con el defaul seria asi startEl = document.body
  let resultSet = [];

  if (typeof startEl === "undefined") {   //con el default borrariamos estas lineas
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
    if(matchFunc(startEl)) resultSet.push(startEl);

    for(let i = 0; i < startEl.children.length; i++){
      let aux = traverseDomAndCollectElements (matchFunc, startEl.children[i]); // esta es la recurcion
      resultSet = [...resultSet,...aux];   //aplico split operator
    }

     return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

// # ---> id
// . ---> class
//div.class ---> tag.class
// tag

let selectorTypeMatcher = function (selector) {
  // tu código aquí

  if(selector.includes('#')){   //en el caso que tenga el hash
    return 'id';
  }
  else if(selector[0] === '.'){    //en la posicion 0 verifica si hay un punto
    return 'class';
  }
  else if(selector.includes('.')){    //verifica que haya algun punto
    return 'tag.class';
  }
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

let matchFunctionMaker = function (selector) {
  let selectorType = selectorTypeMatcher(selector);
  let matchFunction;
  if (selectorType === "id") {
    matchFunction = (elemento) => `#${elemento.id}` === selector;   //matchear es si coinciden
     // return '#' + elemento.id === selector;  // compara si es verdad da true

  } else if (selectorType === "class") {
    matchFunction = (elemento) => {
      let classes = elemento.classList;   //trae todas las classes que guarda en un array []
      
      for(let i =0; i < classes.length; i++){
        if(`.${classes[i]}` === selector) return true;
      }
      return false;
    }

  } else if (selectorType === "tag.class") { //['header.pepito']
      matchFunction = (elemento) =>{
        let [t, c] = selector.split('.');   //aca se aplico destructuring , ['header', 'pepito']
        // t= 'header'
        // c= 'pepito'  
        
        return matchFunctionMaker(t)(elemento) && matchFunctionMaker(`.${c}`)(elemento);  //aca llama 2 veces a la funcion una a la f matchFunctionMaker y la segunda a matchFunction

      }
  } else if (selectorType === "tag") {
    matchFunction = (elemento) => elemento.tagName.toLowerCase() === selector;
  }
  return matchFunction;
};

let $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
