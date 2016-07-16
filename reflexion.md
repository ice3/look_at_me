# look at me

## archi

```
prog1 => --> gateway (node) -> front web
prog2 => /
```
### Bibliothèque pour les programmes :
 * simple


### Gateway

* garde l'état des graphiques
* 

## Protocole Programme -> gateway

* Utilise ZMQ
* Autodétection des ports de la gateway
* protocole en JSON (?)

### 2 types de messages : 
 * init (source, type de graphique)
 * update : données (possiblement plusieurs données...)

## Protocole GW -> front end

 * JSON
  * 