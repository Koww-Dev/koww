function senhaValida(p) {
  let retorno = false;
  const letrasMaiusculas = /[A-Z]/;
  const letrasMinusculas = /[a-z]/;
  const numeros = /[0-9]/;
  const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
  if (p.length <= 7) {
    return retorno;
  }
  let auxMaiuscula = 0;
  let auxMinuscula = 0;
  let auxNumero = 0;
  let auxEspecial = 0;
  for (let i = 0; i < p.length; i += 1) {
    if (letrasMaiusculas.test(p[i])) {
      auxMaiuscula += 1;
    } else if (letrasMinusculas.test(p[i])) {
      auxMinuscula += 1;
    } else if (numeros.test(p[i])) {
      auxNumero += 1;
    } else if (caracteresEspeciais.test(p[i])) {
      auxEspecial += 1;
    }
  }
  if (auxMaiuscula > 0) {
    if (auxMinuscula > 0) {
      if (auxNumero > 0) {
        if (auxEspecial) {
          retorno = true;
        }
      }
    }
  }

  return retorno;
}
console.log(senhaValida('test1234'));
console.log(senhaValida('Test123@'));
console.log(senhaValida('TOMATEEABACATEssd@'));
