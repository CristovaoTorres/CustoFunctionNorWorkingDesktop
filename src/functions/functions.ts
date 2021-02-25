import fetch from 'cross-fetch';
//  console;

 //var baseURL:string = "http://10.1.0.5:5002/api/"; 

var baseURL:string = "https://localhost:44383/api/"; 

export async function http(
  request: RequestInfo
): Promise<any[]> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export async function httpPost(
  request: RequestInfo,
  data: any
): Promise<any[]> {

const response = await fetch(request, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})

  const body = await response.json();
  return body;
}

/**
 * Retorna lista de Projetos.
 * @customfunction Projetos
 * @param {string} [posicao] V = Vertical, H = Horizontal.
 * @returns Lista de Projetos.
 */
export async function Projetos(posicao: string): Promise<string[][]> {

  const url = baseURL+"Projeto?posicao="+posicao;
  console.log(url);

  const data = await http(url);
    return data;
}
/**
 *  Lista das topologias relacionadas ao projeto.
  * @customfunction 
  * @param {string} nomeProjeto Nome do Projeto
  * @param {string}[posicao] V = Vertical, H = Horizontal
  * @return Lista das topologias relacionadas ao projeto.
*/
export async function Topologias(nomeProjeto:string, posicao: string): Promise<string[][]> {
  //You can change this URL to any web request you want to work with.
  const url = baseURL+"Topologia/"+nomeProjeto+"?posicao="+posicao;
  
  const data = await http(url);
  return data;
}


/**
* Lista dos Cenarios relacionadas a Topologia.
* @customfunction 
* @param {string} projeto Nome do Projeto
* @param {string} topologia  Nome da Topologia
* @param {string} [posicao] V = Vertical, H = Horizontal
* @return  Lista dos Cenarios relacionadas a Topologia.
*/
export async function Cenarios(projeto:string, topologia:string, posicao: string): Promise<string[][]> {
  
  const url = baseURL+"Cenario?nomeProjeto="+encodeURIComponent(projeto)+"&nomeTopologia="+
  encodeURIComponent(topologia)+"&posicao="+posicao;

  const data = await http(url);
  return data;
}

/**
  * Lista dos Simbolos de entrada
  * @customfunction 
  * @returns Lista dos Cenarios relacionadas a Topologia.
  */
 export async function SimbolosEntrada(): Promise<string[][]> {
  //You can change this URL to any web request you want to work with.
  const url = baseURL+"Simbolo/SpillDown/true";
  const data = await http(url);
return data;
}


/**
* Lista dos Simbolos de Resultados
* @customfunction 
* @return  Simbolos
*/
export async function SimbolosResultado():Promise<string[][]> {
  //You can change this URL to any web request you want to work with.
  const url = baseURL+"Simbolo/SpillDown/false";
  const data = await http(url);
return data;
}

/**
 * Resultados Filtro
 * @customfunction
 * @param {string} Projeto Nome do Projeto
 * @param {string} Topologia  Nome da Topologia
 * @param {string} Cenario  Nome do Cenario
 * @param {string} Simbolo simbolo
 * @param {any} [Matriz] Matriz
 * @param {any} [ValorUnico] ValorUnico
 * @param {string[][]} [entidade1] 
 * @param {string[][]} [entidade2] 
 * @param {string[][]} [entidade3] 
 * @param {string[][]} [entidade4] 
 * @param {string[][]} [entidade5] 
 * @param {string[][]} [entidade6] 
 * @param {string} [Posicao] 
 * @returns Lista de Resultados
 */
export async function Resultado(Projeto: string, Topologia: string, Cenario: string, Simbolo: string,
  Matriz: any, ValorUnico: any, entidade1: string[][],
  entidade2: string[][], entidade3: string[][], entidade4: string[][],
  entidade5: string[][], entidade6: string[][], Posicao: string): Promise < string[][] > {

  var entidade1Array = [];
  var entidade2Array = [];
  var entidade3Array = [];
  var entidade4Array = [];
  var entidade5Array = [];
  var entidade6Array = [];

  if (entidade1 != null) {
      for (let index = 0; index < entidade1.length; index++) {
          const element = entidade1[index];
          entidade1Array.push(element[0]);
      }
  }

  if (entidade2 != null) {
      for (let index = 0; index < entidade2.length; index++) {
          const element2 = entidade2[index];
          entidade2Array.push(element2[0]);
      }
  }


  if (entidade3 != null) {
      for (let index = 0; index < entidade3.length; index++) {
          const element3 = entidade3[index];
          entidade3Array.push(element3[0]);
      }
  }


  if (entidade4 != null) {
      for (let index = 0; index < entidade4.length; index++) {
          const element4 = entidade4[index];
          entidade4Array.push(element4[0]);
      }
  }

  if (entidade5 != null) {
      for (let index = 0; index < entidade5.length; index++) {
          const element5 = entidade5[index];
          entidade5Array.push(element5[0]);
      }
  }

  if (entidade6 != null) {
      for (let index = 0; index < entidade6.length; index++) {
          const element6 = entidade6[index];
          entidade6Array.push(element6[0]);
      }
  }

  var model = {
      projeto: Projeto,
      topologia: Topologia,
      cenario: Cenario,
      simbolo: Simbolo,
      matriz: Matriz == 1 ? true : false,
      valorUnico: ValorUnico == 1 ? true : false,
      entidade1: entidade1Array,
      entidade2: entidade2Array,
      entidade3: entidade3Array,
      entidade4: entidade4Array,
      entidade5: entidade5Array,
      entidade6: entidade6Array,
      posicao: Posicao == null ? "V": Posicao
  }

  const data = await httpPost(baseURL + "Resultado", model)
  return data;
}

/**
 * Entrada
 * @customfunction
 * @param {string} Projeto Nome do Projeto
 * @param {string} Topologia  Nome da Topologia
 * @param {string} Cenario  Nome do Cenario
 * @param {string} Simbolo simbolo
 * @param {any} [ValorUnico] ValorUnico
 * @param {string[][]} [entidade1] 
 * @param {string[][]} [entidade2] 
 * @param {string[][]} [entidade3] 
 * @param {string[][]} [entidade4] 
 * @param {string[][]} [entidade5] 
 * @param {string[][]} [entidade6] 
 * @param {string} [Posicao] 
 * @returns Lista de entradas
 */
export async function Entrada(Projeto: string, Topologia: string, Cenario: string, Simbolo: string,
  ValorUnico: any, entidade1: string[][],
  entidade2: string[][], entidade3: string[][], entidade4: string[][],
  entidade5: string[][], entidade6: string[][], Posicao: string): Promise < string[][] > {

  var entidade1Array = [];
  var entidade2Array = [];
  var entidade3Array = [];
  var entidade4Array = [];
  var entidade5Array = [];
  var entidade6Array = [];

  if (entidade1 != null) {
      for (let index = 0; index < entidade1.length; index++) {
          const element = entidade1[index];
          entidade1Array.push(element[0]);
      }
  }

  if (entidade2 != null) {
      for (let index = 0; index < entidade2.length; index++) {
          const element2 = entidade2[index];
          entidade2Array.push(element2[0]);
      }
  }


  if (entidade3 != null) {
      for (let index = 0; index < entidade3.length; index++) {
          const element3 = entidade3[index];
          entidade3Array.push(element3[0]);
      }
  }


  if (entidade4 != null) {
      for (let index = 0; index < entidade4.length; index++) {
          const element4 = entidade4[index];
          entidade4Array.push(element4[0]);
      }
  }

  if (entidade5 != null) {
      for (let index = 0; index < entidade5.length; index++) {
          const element5 = entidade5[index];
          entidade5Array.push(element5[0]);
      }
  }

  if (entidade6 != null) {
      for (let index = 0; index < entidade6.length; index++) {
          const element6 = entidade6[index];
          entidade6Array.push(element6[0]);
      }
  }

  var model = {
      projeto: Projeto,
      topologia: Topologia,
      cenario: Cenario,
      simbolo: Simbolo,
      matriz: false,
      valorUnico: ValorUnico == 1 ? true : false,
      entidade1: entidade1Array,
      entidade2: entidade2Array,
      entidade3: entidade3Array,
      entidade4: entidade4Array,
      entidade5: entidade5Array,
      entidade6: entidade6Array,
      posicao: Posicao == null ? "V": Posicao
  }

  const data = await httpPost(baseURL + "Entrada", model)
  return data;
}

/**
 * Versao
 * @customfunction Versao
 * @returns Retorna Versao Atual
 */
export async function Versao(): Promise<string[][]> {
 //You can change this URL to any web request you want to work with.
 const url = baseURL+"Projeto/Version";
 const data = await http(url);
return data;
}
