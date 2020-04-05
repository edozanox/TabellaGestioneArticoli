

        var num = 0;
        var quantita_tot = 0;
        var quantity = 0;
        var prezzo_un = 0;
        var prezzo_totale = 0;
        var rowCount = 0;

        /*
        var table;
        var row;
        var canc;
        var id;
        var desc;
        var qta;
        var prz_unit;
        var prz_tot;
        */

        function calcolaPrezzoTotale() {
            
            let prezzi = $("[name='prezzo_totale']");
            //var prezzi = document.querySelectorAll("[name=prezzo_totale]");
            let costo;
            let tot = 0;

            for (costo of prezzi) {
                tot += parseFloat(costo.innerText);
            }

            return tot;

        }

        function calcolaNumeroArticoli() {
            var totale_elem = document.querySelectorAll("[name=quantita]")
            var elem;
            var sum = 0;
            for (elem of totale_elem) {
                sum += parseInt(elem.innerText);
            }

            return sum;
        }


        function aggiungiArticolo() {            

            aggiungiRiga();           

            //calculating the values to print in the footer...
            var totale_elem = document.querySelectorAll("[name=quantita]")
            var elem;
            var sum = 0;
            for (elem of totale_elem) {
                sum += parseInt(elem.innerText);
            }

            quantita_tot = calcolaNumeroArticoli();
            prezzo_totale = calcolaPrezzoTotale();


            //printing elements in the footer...
            document.querySelector("#tot_art").innerHTML = quantita_tot;
            document.querySelector("#tot_eur").innerHTML = prezzo_totale + "�";

            aggiornaLista(desc, prz_unit);

        }

        function aggiungiRiga(des, costo) {

            var table = document.querySelector("#elencoProdotti tbody");
            var row = table.insertRow(0);
            //cells definition
            var chck = row.insertCell(0);
            var canc = row.insertCell(1);
            var id = row.insertCell(2);
            var desc = row.insertCell(3);
            var qta = row.insertCell(4);
            var prz_unit = row.insertCell(5);
            var prz_tot = row.insertCell(6);

            row.setAttribute("scope", "row");
            chck.setAttribute("name", "sel");
            canc.setAttribute("name", "canc");
            canc.setAttribute("onclick", "eliminaArticolo(this)");
            id.setAttribute("name", "id");
            desc.setAttribute("name", "descrizione");
            qta.setAttribute("name", "quantita");
            prz_unit.setAttribute("name", "prezzo_unita");
            prz_tot.setAttribute("name", "prezzo_totale");

            num++;
            quantity = document.querySelector("#quantita").value;
            prezzo_un = document.querySelector("#prezzo").value;

            chck.innerHTML = "<input type='checkbox' />";
            canc.innerHTML = "<button>ELIMINA <button/>";
            id.innerHTML = "0" + num;
            desc.innerHTML = document.querySelector("#descrizione").value;
            qta.innerHTML = parseInt(quantity);

            prz_unit.innerHTML = prezzo_un + " �";
            prz_tot.innerHTML = parseFloat(prezzo_un * quantity) + " �";


        }

        function eliminaArticolo(rows) {
            var _row = rows.parentElement;
            document.getElementById('elencoProdotti').deleteRow(_row.rowIndex);
            prezzo_totale = calcolaPrezzoTotale();
            quantita_tot = calcolaNumeroArticoli();
            document.querySelector("#tot_eur").innerHTML = prezzo_totale + "�";
            document.querySelector("#tot_art").innerHTML = quantita_tot;

        }


        function eliminaElemSelez(rows) {
            var i, k;
            //document.getElementById("delete").addEventListener("click", function () {
            var tableRef = document.getElementById('elencoProdotti');
            var tableRows = tableRef.rows;
            var checkedIndexes = [];
            for (i = 1; i < tableRows.length; i++) {
                var checkboxSelected = tableRows[i] && tableRows[i].cells[0].firstElementChild.checked;
                if (checkboxSelected) {
                    checkedIndexes.push(i);
                }
            }

            for (k = 0; k < checkedIndexes.length; k++) {
                tableRef.deleteRow(checkedIndexes[k] - k);
            }

            prezzo_totale = calcolaPrezzoTotale();
            quantita_tot = calcolaNumeroArticoli();
            document.querySelector("#tot_eur").innerHTML = prezzo_totale + "�";
            document.querySelector("#tot_art").innerHTML = quantita_tot;


            if (k != 0) {
                alert("ELIMINATI " + k + " ARTICOLI");
            }
            else
                alert("IMPOSSIBILE ELIMINARE: NESSUN ELEMENTO SELEZIONATO");

        }

        function chiudiScontrino() {
            alert("FUNZIONE NON ANCORA DISPONIBILE");
        }

        function inizializzazione() {
            if (window.localStorage.getItem("lista") == null) {

                let lista = { "articoli": [] };
                window.localStorage.setItem("lista", JSON.stringify(lista));
            }
            else {

                let lista = JSON.parse(window.localStorage.getItem("lista"));
                for (articolo of lista.articoli) {
                    aggiungiRiga(articolo.descrizione, articolo.costo);
                }

            }
        }

        function aggiornaLista(descriz, prezzo) {
                lista = JSON.parse(window.localStorage.getItem("lista"));
                let articolo = { "descrizione": descriz, "costo": prezzo };
                lista.articoli.push(articolo);

                //Sovrascrivo valore elemento memorizzato con chiave "lista"
                window.localStorage.setItem("lista", JSON.stringify(lista));
                        
            }
            
           
        

        $(document).ready(function () {
            inizializzazione();

            /*
             //In JS puro

            var b = document.querySelector("#add_article");
            b.addEventListener("click", aggiungiArticolo);  
            */

            //In jQuery //

            $("#add_article").click(aggiungiArticolo);
        }


        )