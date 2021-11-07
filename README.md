<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-translate-package">About Translate Package</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About Translate-Package

If you are planning to build an application which can support multiple languages, translate-package will help you automate the process of translation of words.
With most popular packages that internationalize your application, several resources files should be generated for each language. However, it is most likely that you as a developer do not know all the words you need at all languages, and you might use Google Translate. Translating each word with Google Translate can be very time consuming as well as boring for most, if not all, of developers.
Here is where Translate-Package comes into play. Translate-package will get an initial file from the source language you know and generate a source file for all your other desired languages.

### Pros

- Type-Safe
- Light-weight package
- Auto-generation of files
- Supporting dozens of languages

## Installation

- npm

  ```sh
  npm install translate-package
  ```

- yarn
  ```sh
  yarn add translate-package
  ```

## Usage

First, you need to create a config file named "localize.config.json" in your project's root directory.
This config file must contain the following:

- Address to your source file
- Address in which files are generated
- Desired output languages (array of strings)

For Example:

```json
{
  "source": "./test/fa.js",
  "out": "./test",
  "languages": ["en", "fr", "es"]
}
```

## Second, you have to provide your source file, in the directory mentioned in config file.

**NOTE!**

Your source file must have following features:

- Be an object
- A JavaScript File
- Have an acceptable name, for example: (en.js, fr.js, es.js, ...)

---

## Examples

Source File (in English):

```js
const en = {
  aboutUse: 'about us',
  actions: 'actions',
  address: 'Address',
  air: 'Air',
  all: 'Total',
  amount: 'Amount',
  buy: 'Buy',
  changePassword: 'change Password',
  classic: 'Classic',
  confirm: 'confirm',
  delete: 'Delete',
  edit: 'Edit',
  fee: 'fee',
  method: 'Method',
  price: 'Price',
  search: 'Search',
  type: 'Type',
  yesterday: 'Yesterday',
};
```

Output File (in French):

```js
const fr = {
  aboutUse: 'à propos de nous',
  actions: "l'opération",
  address: 'Adresse',
  air: 'Air',
  all: 'Le total',
  amount: 'Montant',
  buy: 'Acheter',
  changePassword: 'changer le mot de passe',
  classic: 'Classique',
  confirm: 'Confirmé',
  delete: 'Effacer',
  edit: 'Éditer',
  fee: 'Salaire',
  method: 'Méthode',
  price: 'Prix',
  search: 'Chercher',
  type: 'Taper',
  yesterday: 'Hier',
};
```

<!-- CONTACT -->

## Contact

Amin Jafarlou: jafarlou.amin@gmail.com
Project Link: [https://github.com/aminjafarlou/translate-package](https://github.com/aminjafarlou/translate-package)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements
