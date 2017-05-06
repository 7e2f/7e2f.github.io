function lesspassSubmit() {
  var passwordForm = $('#lesspass').serializeArray();
  const site = passwordForm[0].value;
  const login = passwordForm[1].value;
  const masterPassword = passwordForm[2].value;
  var chars = (passwordForm[3].value > 0) ? passwordForm[3].value : 16;
  var count = (passwordForm[4].value > 0) ? passwordForm[4].value : 1;
  const passwordProfile = {
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    length: chars,
    counter: count,
    version: 2
  };
  LessPass.generatePassword(site, login, masterPassword, passwordProfile).then(function(generatedPassword) {
    $('#generated').val(generatedPassword);
    // alert(generatedPassword);
  });

};

function copy() {
  var inp = document.querySelector('#generated');
  inp.select()
  document.execCommand('copy');
  inp.blur();

}
