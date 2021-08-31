function template(link, id) {
  return `<div id="ok_${id}" style="border: 0; padding: 0; margin: 0 auto; max-width: 100%;"></div>
<script>
!function (id, link, state) {
  if (window.OK) {
    window.OK.CONNECT.insertContentWidget(id, link, state);
  } else {
    var js = document.createElement("script");
    js.src = "https://connect.ok.ru/connect.js";
    js.async = true
    js.onload = js.onreadystatechange = function () {
      if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
        if (!this.executed) {
          this.executed = true;
          setTimeout(function () {
            window.OK.CONNECT.insertContentWidget(id, link, state);
          }, 0);
        }
      }
    };
    document.body.appendChild(js);
  }
}("ok_${id}","${link}",'{"topicTextIsFull":1}');
</script>`
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

var start = document.getElementById('start')
var input = document.getElementById('ok-input')
var code = document.getElementById('code')
var content = document.getElementById('content')

start.onclick = function () {
  if (input.value) {
    var link = input.value
    var id = makeid(10)
    var html = template(link, id);
    code.textContent = html;
    content.innerHTML = `<div id="ok_${id}" style="border: 0; padding: 0; margin: 0 auto; max-width: 100%;"></div>`

    if (window.OK) {
      window.OK.CONNECT.insertContentWidget(`ok_${id}`, link, '{"topicTextIsFull":1}');
    } else {
      var js = document.createElement("script");
      js.src = "https://connect.ok.ru/connect.js";
      js.async = true
      js.onload = js.onreadystatechange = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
          if (!this.executed) {
            this.executed = true;
            setTimeout(function () {
              window.OK.CONNECT.insertContentWidget(`ok_${id}`, link, '{"topicTextIsFull":1}');
            }, 0);
          }
        }
      };
      document.body.appendChild(js);
    }
  }
}
