function lesspassSubmit() {
  var passwordForm = $('#lesspass').serializeArray();
  const site = document.getElementById("site").value;
  const login = document.getElementById("user").value;
  const masterPassword = document.getElementById("pass").value;
  var chars = (document.getElementById("chars").value > 0) ? document.getElementById("chars").value : 16;
  var count = (document.getElementById("count").value > 0) ? document.getElementById("count").value : 1;
  const passwordProfile = {
    lowercase: document.getElementById("low").checked,
    uppercase: document.getElementById("upp").checked,
    numbers: document.getElementById("num").checked,
    symbols: document.getElementById("sym").checked,
    length: chars,
    counter: count,
    version: 2
  };
  LessPass.generatePassword(
    site,
    login,
    masterPassword,
    passwordProfile
  ).then(function(generatedPassword) {
    $('#generated').val(generatedPassword);
  });

};

function copy() {
  var inp = document.querySelector('#generated');
  inp.select()
  document.execCommand('copy');
  inp.blur();

}
