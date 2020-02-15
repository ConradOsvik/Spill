  const meldingInput = document.querySelector("#meldingInput");

  const db = firebase.firestore();

  const chatColl = db.collection("chat");

  var d = new Date();
  function timer(){
    if (d.getHours() < 10) 
      d.getHours() = '0'+d.getHours();
  }
  function minutter(){
    if (d.getMinutes() < 10)
      d.getMinutes() = '0'+d.getMinutes();
  }

  function sendData(event) {
    event.preventDefault();
    const nyChat = {
      Tid:  d.getTime(),
      Time: "" + d.getHours()  + ":" + d.getMinutes() + "",
      Melding: meldingInput.value,
      Brukernavn: brukernavn,

    }
    chatColl.add(nyChat).then(meldingInput.value = "");
  }

  const chatelement = document.querySelector(".chatmeldinggrid");

  chatColl.get().then(snapshot => sorterNumerisk(snapshot));

  function sorterNumerisk(){
    chatColl.orderBy("Tid").get().then(snapshot => skrivResultat(snapshot));
  }

  function skrivResultat(snapshot) {
    snapshot.forEach(snap => lagwordHTML(snap.data()));
  }

  function lagwordHTML(chat) {

    chatelement.innerHTML += `
      <section class="chatDisplay">
        <p id="tid">
        [${chat["Time"]}]
        </p>
        <p id="brukernavn">
        (${chat["Brukernavn"]})
        </p>
        <p id="melding">
        ${chat["Melding"]}
        </p>
      </section>
`
  }
/*
  setInterval(function refresh(){
    wordelement.innerHTML = "";
    sorterNumerisk();
    skrivResultat();
    lagwordHTML();
  }, 1000);
*/