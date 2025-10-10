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

- **Prodotti paginati (pagina 2, 12 per pagina):**

  `GET /products?page=2&limit=12`

- **Ricerca prodotti per nome/descrizione (termine: "mouse", pagina 1, 10 per pagina):**

  `GET /products/search/page?term=mouse&page=1&limit=10`

- **Ricerca prodotti e ordinamento per prezzo crescente:**

  `GET /products/search/page?term=laptop&page=1&limit=8&sort=price_asc`

- **Solo ordinamento per categoria decrescente:**

  `GET /products?page=1&limit=10&sort=category_desc`

---

### Funzionalità e parametri supportati

- Tutte le chiamate restituiscono i prodotti paginati (parametri `page` e `limit`).
- Ordinamento di default: alfabetico per nome.
- Ordinamento opzionale tramite parametro `sort`:
  - `sort=price_asc` → prezzo crescente
  - `sort=price_desc` → prezzo decrescente
  - `sort=category_asc` → categoria crescente (poi nome)
  - `sort=category_desc` → categoria decrescente (poi nome)
- Ricerca per nome/descrizione con paginazione:
  - `/products/search/page?term=mouse&page=1&limit=10&sort=price_desc`
- Solo paginazione (senza ricerca):
  - `/products?page=1&limit=10&sort=category_asc`

#### Risposta delle API

Tutte le risposte includono:

- `data`: array prodotti
- `total`: numero totale risultati
- `page`: pagina corrente
- `totalPages`: numero totale pagine
- `message`: riepilogo query

## Recap funzionalità prodotti (API)

- Tutte le chiamate restituiscono i prodotti paginati (parametri `page` e `limit`).
- Ordinamento di default: alfabetico per nome.
- Ordinamento opzionale tramite parametro `sort`:
  - `sort=price_asc` → prezzo crescente
  - `sort=price_desc` → prezzo decrescente
  - `sort=category_asc` → categoria crescente (poi nome)
  - `sort=category_desc` → categoria decrescente (poi nome)
- Ricerca per nome/descrizione con paginazione:
  - `/products/search/page?term=mouse&page=1&limit=10&sort=price_desc`
- Solo paginazione (senza ricerca):
  - `/products?page=1&limit=10&sort=category_asc`

Tutte le risposte includono:

- `data`: array prodotti
- `total`: numero totale risultati
- `page`: pagina corrente
- `totalPages`: numero totale pagine
- `message`: riepilogo query
