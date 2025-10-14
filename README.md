# PW_TEAM3

## e-commerce selezionato:

🧑‍💻 7. Gadget tech e accessori digitali
Target: nerd, gamer, professionisti tech
Design: moderno, scuro, con focus sulle specifiche
Spunti tecnici: confronto prodotti, doppia visualizzazione, gestione quantità

## NOME : dotNerdNest

### Slogan: Il tuo rifugio per ogni innovazione.

### Caldo e accogliente, ma sempre high-tech. Ottimo se vuoi un tono più umano e community-driven.

---

## 📦 API Prodotti

### Esempi pratici di chiamate

l'endpoint products restiituisce dei risultati in base a vari filtri:

#### sort:

1. se sort non è definita, restituisce la lista completa
2. sort=latest => restituisce i prodotti inseriti nell'anno corrente (2025)
3. sort = popular => restituisce i prodotti più venduti in ordine di quantità venduta
4. sort = discounted => restituisce la lista dei prodotti in offerta partendo dalla percentuale di sconto più alta

#### order: (se presente bypassa gli ordinamenti specifici del sort di discounted e popular)

1. order =price_ASC => restituisce i risultati per prezzo in ordine ascendente
1. order =price_DESC => restituisce i risultati per prezzo in ordine ascendente

#### rpp : (results per page) default al caricamento di /products rpp=4

c'è la possibilità di avere 4, 8, 12, 16, o 20 risultati per pagina dividendo in tempo reale il numero di risultati in pagine

#### page : default al caricamento di products/ page=1

la query string di products/ viene popolata all'avvio con ?rpp=4&page=1 in modo da avere una query standard iniziale con la paginazione già calcolata

---

#### Risposta delle API

ogni qual volta che viene richiamata la lista dei prodotti, riceviamo in risposta un'oggetto

obg = {
results =[] => array dei risultati
resultCount = int => numero di risultati
rpp = int => results per page ()
page = int => definisce l'offset dei risultati
pages = int => numero di pagine calcolate in base ai risultati ottenuti e i risultati per pagina
}

## esempio:

### http://localhost:3000/products?sort=latest&order=price_ASC&rpp=4&page=1

### risultato:

{
"results": [
{
"product_id": 25,
"name": "EcoSound Lite",
"brand": "GreenByte",
"description": "Cuffie sostenibili con materiali riciclati e packaging eco.",
"specs": "Jack 3.5mm, driver 40mm, compatibili con tutti i dispositivi",
"price": 39,
"stock_quantity": 40,
"category_name": "Headsets",
"slug": "greenbyte-ecosound-lite",
"image_url": "http://localhost:3000/imgs/headCuff-5.jpg",
"category_id": 3,
"created_at": "2025-06-30T22:00:00.000Z"
},
{
"product_id": 23,
"name": "StealthCom S1",
"brand": "StealthTech",
"description": "Cuffie leggere e silenziose per ambienti professionali.",
"specs": "Jack 3.5mm, microfono direzionale, design minimal",
"price": 69,
"stock_quantity": 30,
"category_name": "Headsets",
"slug": "stealthtech-stealthcom-s1",
"image_url": "http://localhost:3000/imgs/headCuff-3.jpg",
"category_id": 3,
"created_at": "2025-06-30T22:00:00.000Z"
},
{
"product_id": 26,
"name": "BlitzTalk Z1",
"brand": "BlitzGear",
"description": "Headsets compatto per gamer in mobilità.",
"specs": "Bluetooth, microfono integrato, autonomia 20h",
"price": 89,
"stock_quantity": 25,
"category_name": "Headsets",
"slug": "blitzgear-blitztalk-z1",
"image_url": "http://localhost:3000/imgs/headCuff-6.jpg",
"category_id": 3,
"created_at": "2025-06-30T22:00:00.000Z"
},
{
"product_id": 29,
"name": "CityVoice Urban",
"brand": "CityTech",
"description": "Cuffie wireless per lavoro remoto e videoconferenze.",
"specs": "Bluetooth, microfono ambientale, autonomia 25h",
"price": 99,
"stock_quantity": 28,
"category_name": "Headsets",
"slug": "citytech-cityvoice-urban",
"image_url": "http://localhost:3000/imgs/headCuff-9.jpg",
"category_id": 3,
"created_at": "2025-06-30T22:00:00.000Z",
"discount_percent": 10
}
],
"resultCount": 20,
"pages": 5,
"rpp": 4,
"page": 1
}

per ogni prodotto vengono modificati alcuni campi, per esempio image_url dove viene inserito l'indirizzo completo per mano di un middleware
inoltre per ogni prodotto viene fatta una join per verificare se il prodotto è in offerta, e se lo è viene aggiunto il campo "discount_percent"
