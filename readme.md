# 💍💎 Tienda de Joyas "Serena's Radiance"💍💎 

## INSTALAR LAS DEPENDENCIAS
```
npm express nodemon
```

## INICIAR EL SERVIDOR
```
node server.js
nodemon server.js
```

## ACCESO A RUTAS 
```
GET /joyas: Devuelve todas las joyas con estructura HATEOAS.
URL: http://localhost:3000/joyas

GET /joyas/categoria/:categoria: Filtra las joyas por categoría.
Por ejemplo, para obtener todas las joyas de la categoría "aros":
URL: http://localhost:3000/joyas/categoria/aros

GET /joyas/filtrar?campos=metal,category: Filtra las joyas por campos específicos.
Ejemplo para obtener los valores de los campos "metal" y "category":
URL: http://localhost:3000/joyas/filtrar?campos=metal,category

GET /joya/:id: Busca una joya por su ID.
Por ejemplo, para obtener la joya con ID 3:
URL: http://localhost:3000/joya/3

GET /joyas_paginadas: Obtiene las joyas con paginación y ordenamiento opcional.
Ejemplo para obtener la segunda página ordenada de manera descendente por valor:
URL: http://localhost:3000/joyas_paginadas?pagina=2&orden=desc
```