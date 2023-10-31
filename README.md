# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## CODE EXPLANATION

## NAVBAR COMPONENT

```typescript
  @HostListener('window:scroll')
```

@HostListener('window:scroll') è un decoratore in Angular utilizzato per ascoltare gli eventi scroll sulla finestra del browser. Questo decoratore viene utilizzato per dichiarare un gestore di eventi per l'evento di scroll.

Nel contesto di un componente Angular, il decoratore @HostListener può essere applicato a un metodo di classe all'interno di un componente per definire il comportamento da eseguire quando si verifica un evento specifico.

```typescript
this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    this.updateNavbarClass(event.url);
  }
});
```

si occupa di aggiornare la classe o lo stato del componente della barra di navigazione
in base all'URL della pagina attualmente visualizzata.
callBack function, eseguita ogni volta che si verifica un evento di navigazione

## HOME COMPONENT

1. **typingText**:

```typescript
  @ViewChild('typingText') typingText!: ElementRef;
```

decorator, consente di ottenere un riferimento a un elemento del DOM o a un componente figlio all'interno del tuo componente
'typingText' è la stringa passata come argomento a @ViewChild.
In questo caso, sta cercando un elemento con l'identificatore 'typingText' all'interno del template HTML associato al componente.
typingText!: ElementRef dichiara una variabile typingText che sarà di tipo ElementRef. ElementRef è una classe in Angular che rappresenta
un elemento del DOM. Il punto esclamativo (!) alla fine della dichiarazione indica a TypeScript che garantirai che
typingText sarà definito prima di usarlo (puoi farlo perché @ViewChild lo inizializzerà una volta che l'elemento corrispondente sarà disponibile nel DOM).

2. **ngAfterViewInit**:

```typescript
ngAfterViewInit() {
    this.startTyping();
  }
```

lifecycle hook, chiamato dopo che la vista è stata completamente inizializzata.

2. **startTyping**:

```typescript
 //controllo se l'indice corrente (currentPhraseIndex) è minore del numero di frasi (phrases) da mostrare.
  //verifica se ci sono ulteriori frasi da digitare.
  startTyping() {
    if (this.currentPhraseIndex < this.phrases.length) {
    //se la condizione è vera, viene ottenuta la frase corrente dall'array phrases utilizzando l'indice corrente currentPhraseIndex
      const phrase = this.phrases[this.currentPhraseIndex];
    //la frase corrente viene passata al metodo typePhrase(phrase)
      this.typePhrase(phrase);
    }
```

## PAYMENT-CARDS

1. **ngOnInit**

Nel metodo ngOnInit(), il componente chiama il servizio paymentService.getData() per ottenere i dati relativi alle carte di pagamento.
Quando i dati vengono restituiti dal servizio tramite l'observable, vengono gestiti da una funzione di callback.
Il codice verifica se i dati restituiti sono un array e, se sì, memorizza i dati nell'array cards. In caso contrario,
viene stampato un messaggio di errore nella console.

```typescript
ngOnInit() {
  this.paymentService.getData().subscribe(
    (card: any) => {
      if (Array.isArray(card.data)) {
        this.cards = card.data;
        this.sortByNumber();
      } else {
        console.error('Data is not an array:', card);
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
```

2. **ngModel**

   <!-- [(ngModel)]="sortBy": è un binding bidirezionale in Angular.
     Collega il valore selezionato nell'elemento <select> alla variabile sortBy nel componente.
     Questo significa che quando un utente seleziona un'opzione, il valore verrà memorizzato nella variabile sortBy e viceversa,
     se cambia il valore di sortBy nel componente, influenzerà la selezione nell'elemento <select>.
     (change)="sortByNumber()":  è un evento (change) che ascolta quando l'utente cambia la selezione nel selettore. Quando ciò accade, chiama il metodo sortByNumber()-->

   <select
   class="form-select-sm ms-2"
   id="orderSelect"
   [(ngModel)]="sortBy"
   (change)="sortByNumber()">
     <option value="ASC">Ascending Number</option>
     <option value="DESC">Descending Number</option>
   </select>

3. **subscribe**:
   La funzione `subscribe` e le arrow function sono concetti fondamentali in Angular (e in JavaScript/TypeScript in generale) che vengono utilizzati per gestire osservabili (observables) e callback delle chiamate asincrone. Ecco una breve spiegazione di entrambi:

   - `subscribe` è un metodo di un oggetto osservabile (observable) in Angular. Un observable rappresenta una sequenza di eventi asincroni, come risultati di chiamate HTTP, eventi di input dell'utente, ecc.
   - Quando chiami `subscribe` su un observable, stai dicendo a Angular di "ascoltare" l'observable per gli eventi che emette.
   - Puoi passare una o due funzioni di callback a `subscribe`: una per gestire i dati emessi dall'observable e un'altra per gestire eventuali errori.

Esempio:

```typescript
observable.subscribe(
  (data) => {
    // Questa funzione verrà chiamata quando l'observable emette nuovi dati.
    console.log(data);
  },
  (error) => {
    // Questa funzione verrà chiamata se si verifica un errore.
    console.error(error);
  }
);
```

4. **Arrow Function**:
   - Le arrow function sono una sintassi concisa per dichiarare funzioni in JavaScript/TypeScript. Sono spesso utilizzate per definire funzioni anonime o per creare funzioni inline.
   - Le arrow function hanno una sintassi compatta con `=>`.
   - Sono particolarmente utili quando si desidera definire funzioni brevi e semplici.

Esempio:

```typescript
const add = (a, b) => a + b;
// Questa è una arrow function che accetta due argomenti, li somma e restituisce il risultato.

const greet = (name) => {
  console.log(`Hello, ${name}!`);
};
// Questa è una arrow function con corpo di blocco che saluta il nome passato come argomento.
```

5. **SORT FUNCTION**:

```typescript
  sortByNumber() {
    this.cards.sort((ascN, descN) => {
      if (this.sortBy === 'ASC') {
        return ascN.number.localeCompare(descN.number);
      } else {
        return descN.number.localeCompare(ascN.number);
      }
    });
  }
```

La funzione sort è una funzione integrata in JavaScript che consente di ordinare gli elementi di un array in base a una funzione di confronto personalizzata.
La funzione di confronto personalizzata è una funzione che accetta due elementi e restituisce un valore negativo se il primo elemento dovrebbe essere ordinato prima del secondo, un valore positivo se il secondo elemento dovrebbe essere ordinato prima del primo, e zero se sono equivalenti.

## SERVICES COMPONENT

1. **INPUT**:

<input type="text" [(ngModel)]="name" #name="ngModel" name="name" required>

[(ngModel)]="name" lega il valore del campo di input a una variabile name nel componente.
#name="ngModel" assegna una variabile locale chiamata name che rappresenta il controllo associato a questo campo di input.
name="name" assegna il nome "name" al campo di input

2. **NAME PATTERN**:

```typescript
namePattern: RegExp = /^[a-zA-Z]+$/;
```

^ - Questo simbolo indica l'inizio del testo. Quindi il testo deve iniziare con quanto specificato successivamente.
[a-zA-Z] - Questa parte della regex specifica che è consentito solo un carattere da "a" a "z" (minuscolo) o da "A" a "Z" (maiuscolo). Quindi il nome deve essere costituito solo da lettere dell'alfabeto.

- - Questo simbolo indica che il carattere specificato precedente può apparire una o più volte. Quindi il nome deve consistere in una o più lettere.

2. **FORMAT DATE FUNCTION**:

```typescript
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;
    return formattedDate;
  }
```

La funzione `formatDate` è una funzione TypeScript che accetta un oggetto `Date` come argomento e restituisce una stringa formattata nel formato "dd-mm-yyyy". Ecco come funziona:

1. Estrae il giorno dalla data utilizzando il metodo `getDate()`.
2. Estrae il mese dalla data utilizzando il metodo `getMonth()`. Si aggiunge 1 al risultato poiché il mese restituito da `getMonth()` è zero-based (0 per gennaio, 1 per febbraio, ecc.), ma vogliamo un formato basato su uno (1 per gennaio, 2 per febbraio, ecc.).
3. Estrae l'anno dalla data utilizzando il metodo `getFullYear()`.
4. Crea una stringa `formattedDate` concatenando il giorno, il mese e l'anno, separati da trattini ("-"). Per assicurarsi che ciascuna parte abbia sempre due cifre, vengono utilizzati i metodi `toString().padStart(2, '0')`.

Ad esempio, se `date` rappresenta la data "2023-10-27", la funzione restituirà la stringa "27-10-2023".

Questa funzione è utile per formattare le date in un formato leggibile dall'utente o per l'output nei tuoi template Angular.

3. **VALIDATE DOMAIN FUNCTION**:

```typescript
 validateDomain(domainName: string): boolean {
    if (this.model.necessDomain) {
      const noSpaceDomain = domainName.replace(/\s/g, ' ');
      if (noSpaceDomain.length < 4) {
        this.isDisabled = true;
        return false;
      }
      if (!noSpaceDomain.includes('.') || noSpaceDomain.split('-').length > 1) {
        this.isDisabled = true;
        return false;
      }

      const afterDot = noSpaceDomain.split('.');
      if (afterDot.length < 2 || afterDot[1].length < 2) {
        this.isDisabled = true;
        return false;
      }
      const validCharacters = /^[a-z0-9-.]+$/;

      if (!validCharacters.test(noSpaceDomain)) {
        this.isDisabled = true;
        return false;
      }
      if (
        noSpaceDomain.includes('..') ||
        noSpaceDomain.includes('.-') ||
        noSpaceDomain.includes('-.')
      ) {
        this.isDisabled = true;
        return false;
      }
    } else {
      this.isDisabled = false;
    }

    return true;
  }
```

La funzione `validateDomain(domainName: string): boolean` viene utilizzata per convalidare un nome di dominio. Ecco come funziona:

1. Verifica se `this.model.necessDomain` è vero, il che significa che l'utente ha richiesto un dominio.
2. Rimuove eventuali spazi vuoti dal nome del dominio sostituendoli con spazi singoli.
3. Controlla se la lunghezza del nome del dominio (dopo la rimozione degli spazi vuoti) è inferiore a 4 caratteri. Se è così, imposta `this.isDisabled` su `true` (presumibilmente per disabilitare il fatto che l'input sia verificato nell'html) e restituisce `false` per indicare che il dominio non è valido.
4. Verifica se il nome del dominio contiene almeno un punto (".") e se il numero di trattini ("-") nel nome del dominio è maggiore di 1. Se una di queste condizioni è verificata, imposta `this.isDisabled` su `true` e restituisce `false`.
5. Separa il nome del dominio utilizzando il punto (".") come delimitatore e verifica che ci siano almeno due parti separate dal punto (ovvero, il dominio deve avere una parte di dominio e un suffisso).
6. Verifica se il nome del dominio contiene solo caratteri consentiti, ovvero lettere minuscole, numeri, trattini ("-") e punti (".") utilizzando l'espressione regolare `^[a-z0-9-.]+$`. Se il nome del dominio contiene caratteri non consentiti, imposta `this.isDisabled` su `true` e restituisce `false`.
7. Infine, controlla se il nome del dominio contiene sequenze come "..", ".-", o "-.". Se trova una di queste sequenze, imposta `this.isDisabled` su `true` e restituisce `false`.
   Se non si verifica nessuna delle condizioni di cui sopra, la funzione imposta `this.isDisabled` su `false` e restituisce `true`, indicando che il nome del dominio è valido.

## PDF SERVICE

```typescript
 getServiceTypeLabel(servType: string): string {
    const serviceTypeLabels: Record<string, string> = {
      static: 'Static',
      cms: 'CMS',
      'e-shop': 'E-Shop',
      gestionale: 'Gestionale',
      'i-o-t': 'I-O-T',
    };
```

Si può notare che non tutte le etichette hanno gli apici perché, e-shop e i-o-t hanno i trattini e quindi senza l'utilizzo degli apici l'etichetta letta sarebbe'shop'
